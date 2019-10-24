const express = require('express');

const appControllerFactory = require('./controllers/appcontroller');

const app = express();
const appController = appControllerFactory();

app.post('/', function(req, res) {
    appController.getDmnXml(req, res);
});

app.listen(3000, function() {
   console.log('Listen to: http://localhost:3000');
});