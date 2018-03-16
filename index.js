const express = require('express');
const fileUpload = require('express-fileupload');

const converter = require('./src/converter');

const app = express();

// Serve static assets
app.use(express.static('assets'));

app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/assets/form.html');
});

app.post('/upload', (req, res) => {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let agreementDocument = req.files.agreementDocument;

    // Use the mv() method to place the file somewhere on your server
    agreementDocument.mv(`./agreements/${agreementDocument.name}`, function(err) {
        if (err) return res.status(500).send(err);

        res.send('File uploaded!');
    });
});

app.post('/generate', (req, res) => {
    const inputData = req.body;
    const filename = `${inputData.tenantName}-${inputData.apartmentName}-${inputData.rentStartDate}.docx`
                        .replace(/ /g, "_")
                        .replace(/([A-Z])/g, function($1){return $1.toLowerCase();});

    res.setHeader('Content-disposition', `attachment; filename=${filename}`);
    res.contentType('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.end(converter(inputData));
});

app.listen(3000, () => console.log("Agreement app listening on port 3000"));