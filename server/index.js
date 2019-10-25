"use strict";

const express = require('express');
const diContainer = require('./models/diContainer')();

diContainer.factory('appController', require('./controllers/appController'));
diContainer.factory('excelParser', require('./models/excelParser'));
diContainer.factory('dmnGenerator', require('./models/dmnGenerator'));

diContainer.register('formidable', require('formidable'));
diContainer.register('fs', require('fs'));
diContainer.register('shortid', require('shortid'));
diContainer.register('exceljs', require('exceljs'));

const app = express();
const appController = diContainer.get('appController');

app.post('/', function(req, res) {
    appController.getDmnXml(req, res);
});

app.listen(3000, function() {
   console.log('Listen to: http://localhost:3000');
});