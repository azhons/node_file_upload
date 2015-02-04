var express = require("express");
var multer = require('multer');
var path = require('path');
var app = express();
var done = false;

/*Configure the multer.*/

app.use(multer({
    dest: './uploads/',
    rename: function (fieldname, filename) {
        return filename + Date.now();
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
        done = true;
    }
}));

/*Handling routes.*/

// app.get('/',function(req,res){
// res.sendFile("..\client\index.html");
// });
app.use('/', express.static(path.join(__dirname, '/../client')));

app.post('/api/upload_image', function (req, res) {
    if (done) {
        console.log(req.files);
        res.end("File uploaded.");
    }
});

/*Run the server.*/
app.listen(3000, function () {
    console.log("Working on port 3000");
});