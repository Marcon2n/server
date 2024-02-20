let express = require('express');
const fetch = require("node-fetch");
const cors = require('cors')
const CryptoJS = require("crypto-js");
const crypto = require('crypto');
const { generateKeyPairSync } = require('crypto');
let app = express();
let port = process.env.PORT || 9000;

const secretKey = 'SecretKeyTest123'
const userController = []

async function checkTokenKeycloak (token) {
  const options = {
    method: 'POST',
    headers: {
      // add the token you received to the userinfo request, sent to keycloak
      Authorization: token,
    },
  };

  const response = await(fetch(`https://idm-dev.nexusti.pro/auth/realms/nexusti/protocol/openid-connect/userinfo`, options))
  return response.status
}

async function decryptKey (cipherText, key) {
  const decryptKey = await crypto.privateDecrypt(
    {
      key: key,
      passphrase: '',
      oaepHash: 'SHA256',
    },
    Buffer.from(cipherText, 'base64')
  )

  return decryptKey.toString()
}

app.listen(port);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({limit: '5mb'}));

app.get('/key', function (req, res) {
  // check giá trị user theo token trong userController và gán giá trị index
  const index = userController.findIndex(item => item.token === req.headers.authorization)
  if (req.headers.authorization) {
    checkTokenKeycloak(req.headers.authorization).then(response => {
      if(response === 200) {
        if(index !== -1) {
          res.send({Key: userController[index].publicKey})
        } else {
          const { publicKey, privateKey } = generateKeyPairSync('rsa', { 
            modulusLength: 2048, 
            publicKeyEncoding: {
              type: 'spki',
              format: 'der'
          },
          privateKeyEncoding: {
              type: 'pkcs8',
              format: 'pem',
              cipher: 'aes-256-cbc',
              passphrase: ''
          }
          });
          const userInfo = {
            token: req.headers.authorization,
            publicKey: publicKey,
            privateKey: privateKey
          }
          userController.push(userInfo)
          res.send({key: publicKey.toString('base64')})
        }
      } else {
        index !== -1?userController.splice(index,1):null
        res.status(401)
    }}).catch(
      error => res.status(401)
    )
  };
  
})

app.post('/key', function (req, res) {
  if (req.headers.authorization) {
    checkTokenKeycloak(req.headers.authorization).then(response => {
      if(response === 200) {
        const index = userController.findIndex(item => item.token === req.headers.authorization)
        decryptKey(req.body.data, userController[index].privateKey).then(decryptKey => {
          console.log(decryptKey)
          const index = userController.findIndex(item => item.token === req.headers.authorization)
          userController[index].secretKey = decryptKey
        })
        res.send('Success')
      } else {
        index !== -1?userController.splice(index,1):null
        res.status(401)
    }}).catch(
      error => res.status(401)
    )
  }
})

app.post('/message', function (req, res) {
    const index = userController.findIndex(item => item.token === req.headers.authorization)
    console.log(index)
    console.log(userController[index].secretKey)
    if(req) {
        // nhận thông tin tải lên và giải mã
        console.log(req.body.data)
        console.log(userController[index].secretKey)
        const response = CryptoJS.AES.decrypt(req.body.data, userController[index].secretKey).toString(CryptoJS.enc.Utf8)
        console.log(response)

        // check điều kiện phù hợp và tạo dữ liệu trả về
            // check điều kiện

            // tạo dữ liệu trả về
            const data = `This is server response test. Your message is "${response}"`

        // mã hóa dữ liệu trả về
        const result = JSON.stringify(CryptoJS.AES.encrypt(data, userController[index].secretKey).toString())
        res.send(result)
    }
})

app.get('/logout', function (req, res) {
  const index = userController.findIndex(item => item.token === req.headers.authorization)
  userController.splice(index, 1)
  res.send('Success')
})

console.log('RESTful API server started on: ' + port);