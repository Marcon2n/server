let express = require('express');
let app = express();
let port = process.env.PORT || 8000;
const cors = require('cors')
const {uid} = require('uid')

const data = [
    {
        id: uid(),
        name: 'Bộ lọc 2',
        filterValue: {
            bomBuckets: ["B0"],
            debtStatuses: ['OPEN', 'CLOSE']
        },
        order: [
            {key: 'bomBuckets', isDisable: false, isEdit: false, description: ''},
            {key: 'todBuckets', isDisable: false, isEdit: true, description: ''},
            {key: 'collectionStatus', isDisable: false, isEdit: true, description: ''},
            {key: 'debtStatuses', isDisable: false, isEdit: true, description: ''},
            {key: 'activityStatus', isDisable: false, isEdit: true, description: ''},
            {key: 'promiseStatus', isDisable: false, isEdit: true, description: ''},
            {key: 'assignees', isDisable: false, isEdit: true, description: ''},
            {key: 'todDpd', isDisable: false, isEdit: true, description: ''},
            {key: 'channel', isDisable: false, isEdit: true, description: ''},
            {key: 'products', isDisable: false, isEdit: true, description: ''},
            {key: 'assetTypeCode', isDisable: false, isEdit: true, description: ''},
            {key: 'productId', isDisable: false, isEdit: true, description: ''},
            {key: 'debtHasActivityStatus', isDisable: false, isEdit: true, description: ''},
            {key: 'cscoreLabels', isDisable: false, isEdit: true, description: ''},
            {key: 'groups', isDisable: false, isEdit: true, description: ''},
            {key: 'provinces', isDisable: false, isEdit: true, description: ''},
            {key: 'districts', isDisable: false, isEdit: true, description: ''},
            {key: 'subDistricts', isDisable: false, isEdit: true, description: ''}
        ],
        isDefault: true
    },
    {
        id: uid(),
        name: 'Bộ lọc 1',
        filterValue: {
            provinces: ["Thành phố Cần Thơ"],
        },
        order: [
            {key: 'provinces', isDisable: false, isEdit: true, description: ''},
            {key: 'districts', isDisable: false, isEdit: false, description: ''},
            {key: 'subDistricts', isDisable: false, isEdit: false, description: ''},
            {key: 'todBuckets', isDisable: false, isEdit: true, description: ''},
            {key: 'collectionStatus', isDisable: false, isEdit: true, description: ''},
            {key: 'debtStatuses', isDisable: false, isEdit: true, description: ''},
            {key: 'activityStatus', isDisable: false, isEdit: true, description: ''},
            {key: 'promiseStatus', isDisable: false, isEdit: true, description: ''},
            {key: 'assignees', isDisable: false, isEdit: true, description: ''},
            {key: 'todDpd', isDisable: false, isEdit: true, description: ''},
            {key: 'channel', isDisable: false, isEdit: true, description: ''},
            {key: 'products', isDisable: false, isEdit: true, description: ''},
            {key: 'assetTypeCode', isDisable: false, isEdit: true, description: ''},
            {key: 'productId', isDisable: false, isEdit: true, description: ''},
            {key: 'debtHasActivityStatus', isDisable: false, isEdit: true, description: ''},
            {key: 'cscoreLabels', isDisable: false, isEdit: true, description: ''},
            {key: 'groups', isDisable: false, isEdit: true, description: ''},
            {key: 'bomBuckets', isDisable: false, isEdit: false, description: ''},
        ],
        isDefault: false
    },
]

let orderTable = [
    {
        key: "code",
        isDisabled: false,
        isEdit: false
    },
    {
        key: "borrower.firstName",
        isDisabled: false,
        isEdit: false
    },
    {
        key: "temporaryAddr.province",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "temporaryAddr.district",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "temporaryAddr.subDistrict",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "temporaryAddr.detail",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "borrower.permanentAddr",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "companyAddress",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "borrower.phoneNumbers.0",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "product.name",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "funded",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "term",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "debtTracker.emi",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "debtTracker.dueDate",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "t24",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "debtTracker.bomDPD",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "debtTracker.bomBucket",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "debtTracker.bomTotalPrinciple",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "debtTracker.todDPD",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "debtTracker.todBucket",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "debtTracker.todTotalPrinciple",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "collectionInfor.bomCollectionMust",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "collectionInfor.todCollectionMust",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "collectionInfor.collectionStatus",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "activityInfo.lastActivityStatus",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "promiseInfo.lastPromiseStatus",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "promiseInfo.totalBPTP",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "preAssignee",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "assignee",
        isDisabled: false,
        isEdit: true
    },
    {
        key: "action",
        isDisabled: false,
        isEdit: false
    }
]

app.listen(port);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/filter', function (req, res) {
    res.send(data)
})

app.post('/delete', function (req, res) {
    const index = (data.findIndex(x=>x.id === req.query.id))
    data.splice(index,1)
    res.send('Delete successful')
})

app.post('/save', function (req, res) {
    const index = data.findIndex(x=>x.id === req.body.id)
    if(index == -1) {
        if(req.body.isDefault) {
            data.map(x=>x.isDefault = false)
            data.unshift({...req.body, id: uid()})
        } else {
            data.push({...req.body, id: uid()})
        }
    } else {
        const item = data[index]
        if(req.body.isDefault === item.isDefault) {
            data.splice(index,1,req.body)
        } else {
            data.map(x=>x.isDefault = false)
            data.splice(index,1)
            data.unshift({...req.body})
        }
    }
    res.send('Save successful')
})

app.post('/default', function (req, res) {
    const index = (data.findIndex(x=>x.id === req.query.id))
    const item = data.filter(x=>x.id === req.query.id)[0]
    if(item.isDefault) {
        data[index].isDefault = false
    } else {
        data.map(x=>x.isDefault = false)
        data.splice(index,1)
        data.unshift({...item, isDefault: true})
    }
    res.send('Save default successful')
})

app.get('/orderTable', function (req, res) {
    res.send(orderTable) 
})

app.post('/saveOrderTable', function(req,res) {
    if(req.body.length !== orderTable.length) {
        res.send('Data error')
    } else {
        orderTable = [...req.body]
        res.send(orderTable)
        res.send('Save successful')
    }
})

console.log('RESTful API server started on: ' + port);