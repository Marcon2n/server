let express = require('express');
let app = express();
let port = process.env.PORT || 9000;
const cors = require('cors')
const {uid} = require('uid')

app.listen(port);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const data = []

let orderFilter = ['provinces','bomBuckets','todBuckets','todDpd','eomBucket','cscoreLabels','debtStatuses','collectionStatus','activityStatus','promiseStatus','debtHasActivityStatus','assignees','channel','productId','assetTypeCode','groups']

app.get('/get', function (req, res) {
    res.send(data)
})

app.get('/orderFilter', function (req, res) {
    res.send(orderFilter)
})

app.post('/saveFilterOrder', function (req, res) {
    orderFilter = req.body
    res.send('Save Order Successful')
})

app.post('/save', function (req, res) {
    const index = data.findIndex(x=>x.roleId === req.body.roleId)
    if(index === -1) {
        data.push(req.body)
    } else {
        data.splice(index,1,req.body)
    }
    res.send('Save successful')
})

console.log('RESTful API server started on: ' + port);