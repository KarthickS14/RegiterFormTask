const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const RegDatas = require('/home/karthick/taskone/backend/models/register');
const app = express();

mongoose.connect("mongodb+srv://karthick:ky791nxdN0oyvr72@cluster0.htfks.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('success');
    }).catch(() => {
        console.log('connection faill');
    });

// ky791nxdN0oyvr72
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin,X-Reqested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    next();
});

app.post('/api/registerdata', (req, res, next) => {
    const regsData = new RegDatas({
        fname: req.body.fname,
        lname: req.body.lname,
        dob: req.body.dob,
        email: req.body.email,
        password: req.body.password
    });
    regsData.save().then(createData => {
        res.status(201).json({ message: 'success!!', dataId: createData._id });
    });
});
app.get('/api/registerdata/:id', (req, res, next) => {
    RegDatas.findById(req.params.id).then(dataDetails => {
        if (dataDetails) {
            res.status(200).json(dataDetails);
        } else {
            res.status(404).json({ message: 'data missing' });
        }
    });

    app.put('/api/registerdata/:id', (req, res, next) => {
        const newData = new RegDatas({
            _id: req.body.id,
            fname: req.body.fname,
            lname: req.body.lname,
            dob: req.body.dob,
            email: req.body.email,
            password: req.body.password
        });
        RegDatas.updateOne({ _id: req.params.id }, newData).then(result => {
            res.status(200).json({ message: 'updatesuccess' });
        });
    });
});



app.get('/api/registerdata', (req, res, next) => {
    RegDatas.find().then(data => {
        res.status(200).json({ message: 'success', registerDatas: data });
    });
});


app.delete("/api/registerdata/:id", (req, res, next) => {
    RegDatas.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: "deleted" });
    });

});

module.exports = app;