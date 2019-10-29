"use strict";

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const diContainer = require('./lib/diContainer')();

diContainer.factory('appController', require('./controllers/appController'));
diContainer.factory('excelParser', require('./models/excelParser'));
diContainer.factory('dmnGenerator', require('./models/dmnGenerator'));

diContainer.register('formidable', require('formidable'));
diContainer.register('fs', require('fs'));
diContainer.register('shortid', require('shortid'));
diContainer.register('exceljs', require('exceljs'));

const app = express();
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(cors({
    origin:['http://localhost:8081'],
    // origin:['*'],
    // methods:['GET','POST'],
    credentials: true // enable set cookie
}));
const appController = diContainer.get('appController');

app.use(function (req, res, next) {
    if (!req.session.simpleTableXml) {
        req.session.simpleTableXml = '';
    }
    next()
});

let output = {
    result: false
};

app.post('/get_simple_table_xml', function(req, res) {
    appController.getDmnXml(req, res, (err, xml) => {
        if (err) {
            output.error = err.message;
            return res.json(output);
        }

        req.session.simpleTableXml = xml;
        console.log(req.session.simpleTableXml);

        output.result = true;
        output.xml = xml;

        res.json(output);
    });
});

app.get('/get_simple_table_file', function(req, res) {
    res.type('application/xml');
    res.set('Content-Disposition', 'attachment; filename="table.dmn"');
    res.send(req.session.simpleTableXml);
});

app.listen(3000, function() {
   console.log('Listen to: http://localhost:3000');
});