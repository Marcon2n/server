let express = require('express');
const fetch = require("node-fetch");
const cors = require('cors')
const CryptoJS = require("crypto-js");
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
          const { publicKey, privateKey } = generateKeyPairSync('dsa', { 
            modulusLength: 570, 
            publicKeyEncoding: { 
              type: 'spki', 
              format: 'der'
            }, 
            privateKeyEncoding: { 
              type: 'pkcs8', 
              format: 'der'
            } 
          });
          const userInfo = {
            token: req.headers.authorization,
            publicKey: publicKey.toString('base64'),
            privateKey: privateKey.toString('base64')
          }
          userController.push(userInfo)
          res.send({Key: publicKey.toString('base64')})
        }
      } else {
        index !== -1?userController.splice(index,1):null
        res.status(401)
    }}).catch(
      error => res.status(401)
    )
  };
})

app.post('/message', function (req, res) {
    if(req) {
        // nhận thông tin tải lên và giải mã
        const response = CryptoJS.AES.decrypt(req.body.data, secretKey).toString(CryptoJS.enc.Utf8)

        // check điều kiện phù hợp và tạo dữ liệu trả về
            // check điều kiện

            // tạo dữ liệu trả về
            const data = `This is server response test. Your message is "${response}"`

        // mã hóa dữ liệu trả về
        const result = JSON.stringify(CryptoJS.AES.encrypt(data, secretKey).toString())
        res.send(result)
    }
})

console.log('RESTful API server started on: ' + port);