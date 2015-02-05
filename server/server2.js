var express = require("express");
var formidable = require('formidable');
var path = require('path');
var bodyParser = require('body-parser');
var util = require('util');
var fs = require('fs');
var url = require('url');
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

app.use('/show_images', function (req, res) {
    var request = url.parse(req.url, true);
    var action = request.pathname;

    //console.log("Requested : " + util.inspect(req));
    console.log("Requested : " + action);
    var imagePath = "";
    if (action === "/autumn.jpg") {
        imagePath = "uploads" + action;
    } else {
        imagePath = "uploads/imagenotavailablegrid.jpg";
    }

    var img = fs.readFileSync(imagePath);
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
});

/*Run the server.*/
app.listen(3000, function () {
    console.log("Working on port 3000");
});