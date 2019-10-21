const express = require('express');
const excelParserFactory = require('./lib/excelparser');
const DMNGeneratorFactory = require('./lib/dmngenerator');

const app = express();
const excelParser = excelParserFactory();
const dmnGenerator = DMNGeneratorFactory();

app.get('/', function(req, res){
    let output = {
        result: false
    };

    let paramsMetadata = [
        {
            name: 'first',
            columnName: 'A',
            type: 'string',
            directionType: 'input'
        },
        {
            name: 'second',
            columnName: 'B',
            type: 'string',
            directionType: 'input'
        },
        {
            name: 'third',
            columnName: 'D',
            type: 'double',
            directionType: 'output'
        }
    ];

    excelParser.parseSimpleTable('data2.xlsx', paramsMetadata, (err, table) => {
        // if (err) {
        //     let msg = 'Error: ' + err.message;
        //     console.log(msg);
        //     output.error = msg;
        //
        //     return res.json(output);
        // }

        let xml = dmnGenerator.generateXML(table, paramsMetadata, 'Модели');

        output.result = true;
        output.xml = xml;
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.json(output);
    });
});

app.listen(3000, function() {
   console.log('Listen to: http://localhost:3000');
});