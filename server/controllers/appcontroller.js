"use strict";

module.exports = (excelParser, dmnGenerator, formidable, fs) => {
    const appController = {};

    let output = {
        result: false
    };

    appController.getDmnXml = (req, res) => {
        let form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if (err) {
                output.error = err.message;
                return res.json(output);
            }

            let oldPath = files.file.path;
            let serverFileName = `${(new Date().getTime())}_${files.file.name}`;
            let newPath = `${__dirname}/../tmp/${serverFileName}`;

            uploadFile(oldPath, newPath, fields, res);
        });
    };

    const uploadFile = (oldPath, newPath, fields, res) => {
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                output.error = err.message;
                return res.json(output);
            }

            let paramsMetadata = JSON.parse(fields.paramsMetadata);
            let tableName = fields.dmnTableName;
            // let paramsMetadata = [
            //     {
            //         name: 'first',
            //         columnName: 'A',
            //         type: 'string',
            //         directionType: 'input'
            //     },
            //     {
            //         name: 'second',
            //         columnName: 'B',
            //         type: 'string',
            //         directionType: 'input'
            //     },
            //     {
            //         name: 'third',
            //         columnName: 'D',
            //         type: 'double',
            //         directionType: 'output'
            //     }
            // ];

            parseTable(newPath, paramsMetadata, tableName, res);
        });
    };

    const parseTable = (newPath, paramsMetadata, tableName, res) => {
        excelParser.parseSimpleTable(newPath, paramsMetadata, (err, table) => {
            fs.unlinkSync(newPath);

            if (err) {
                let msg = 'Error: ' + err.message;
                console.log(msg);
                output.error = msg;

                return res.json(output);
            }

            let xml = dmnGenerator.generateXML(table, paramsMetadata, tableName);

            output.result = true;
            output.xml = xml;

            res.json(output);
        });
    };

    return appController;
};