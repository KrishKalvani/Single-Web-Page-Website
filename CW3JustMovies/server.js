//Import libraries and configure express
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

//Configure Express to use the file upload module
app.use(fileUpload());

//Set up express to serve static files from the directory called 'public'
app.use(express.static('public'));

//Handle POST requests sent to /upload path
app.post('/upload', function(request, response) {
    //Check to see if a file has been submitted on this path
    if (!request.files || Object.keys(request.files).length === 0) {
        return response.status(400).send('{"upload": false, "error": "Files missing"}');
    }

    // The name of the input field (i.e. "myFile") is used to retrieve the uploaded file
    let myFile = request.files.myFile;

    //CHECK THAT IT IS AN IMAGE FILE, NOT AN .EXE ETC.

    /* Use the mv() method to place the file in the folder called 'uploads' on the server.
        This is in the current directory */
    myFile.mv('./images/' + myFile.name, function(err) {
        if (err)
            return response.status(500).send('{"filename": "' +
                myFile.name + '", "upload": false, "error": "' +
                JSON.stringify(err) + '"}');

        //Send back confirmation of the upload to the client.
        response.send('{"filename": "' + myFile.name +
            '", "upload": true}');
  });
});

//Start the server
app.listen("8080");
console.log("Listening on port 8080");
