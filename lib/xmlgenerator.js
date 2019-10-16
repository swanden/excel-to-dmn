"use strict";

const shortid = require('shortid');

module.exports = () => {
    const xmlGenerator = {};

    xmlGenerator.generate = (table) => {
        console.log(table);
    };

    return xmlGenerator;
};