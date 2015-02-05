var express = require("express");
var formidable = require('formidable');
var path = require('path');
var bodyParser = require('body-parser');
var util = require('util');
var app = express();

app.use('/', express.static(path.join(__dirname, '/../client')));

app.post('/api/upload_image', function (req, res) {
    var incomingForm = new formidable.IncomingForm();
    incomingForm.uploadDir = "./uploads";
    incomingForm.keepExtensions = true;
    
    incomingForm.on('error', function (err) {        
        console.log(error);  //handle the error
    })
    
    incomingForm.on('fileBegin', function (name, file) {
         // do your things here when upload starts
    })
        
    incomingForm.on('end', function () {
         // do stuff after file upload
    });
    
    // Main entry for parsing the files
    // needed to start Formidables activity
    incomingForm.parse(req, function (err, fields, files) {
        console.log(util.inspect({ fields: fields, files: files }));
    });
});

/*Run the server.*/
app.listen(3000, function () {
    console.log("Working on port 3000");
});