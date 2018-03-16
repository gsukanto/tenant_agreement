const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');

const fs = require('fs');
const path = require('path');

const DAY = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const MONTH = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const TODAY = new Date();

//Load the docx file as a binary
const content = fs.readFileSync(path.resolve(__dirname, '../agreement.docx'), 'binary');

const zip = new JSZip(content);

function convert(inputData) {
    const doc = new Docxtemplater();
    doc.loadZip(zip);

    const data = Object.assign(inputData, {
        todayDay: DAY[TODAY.getDay()],
        todayDate: `${TODAY.getDate()} ${MONTH[TODAY.getMonth()]} ${TODAY.getFullYear()}`
    })

    //set the templateconstiables
    doc.setData(data);

    try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render()
    }
    catch (error) {
        const e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
        }
        console.log(JSON.stringify({error: e}));
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
        throw error;
    }

    return doc.getZip().generate({type: 'nodebuffer'});
}


module.exports = convert;