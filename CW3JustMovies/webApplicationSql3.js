// Import the express and body-parser modules
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


//Import database functions
const db = require('./database');

//Create express app and configure it with body-parser
const app = express();
app.use(bodyParser.json());
app.use(fileUpload());

//Set up express to serve static files from the directory called 'public'
app.use(express.static('public'));

//Set up application to handle GET requests sent to the customers path
app.get('/comments/*', handleGetRequest);//Returns all customers
app.get('/movies', handleGetRequest);//Returns all customers
app.get('/users', handleGetRequest);




//Set up application to handle POST requests sent to the customers path
app.post('/comments', handlePostRequest);//Adds a new customer
app.post('/movies', handlePostRequest);//Adds a new customer
app.post('/users', handlePostRequest);
app.post('/login', handlePostRequest);

////
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
    myFile.mv('../public/images' + myFile.name, function(err) {
        if (err)
            return response.status(500).send('{"filename": "' +
                myFile.name + '", "upload": false, "error": "' +
                JSON.stringify(err) + '"}');

        //Send back confirmation of the upload to the client.
        response.send('{"filename": "' + myFile.name +
            '", "upload": true}');
  });
});





//Start the app listening on port 8080
app.listen(8080);

//Handles GET requests to our web service
function handleGetRequest(request, response) {
    //Split the path of the request into its components
    var pathArray = request.url.split("/");

    //Get the last part of the path
    let pathBeforeEnd=pathArray[pathArray.length - 2]
    var pathEnd = pathArray[pathArray.length - 1];
    console.log(pathBeforeEnd);
    console.log(pathEnd);

    //If path ends with 'comments' we return all comments
    if (pathBeforeEnd === 'comments') {
        //Call function to return all comments
        db.getMovieComments(pathEnd, response);
    } else if (pathEnd === 'movies') {
        //Call function to return all movies
        db.getAllCustomers(response);
    } else if (pathEnd === 'users') {
        //Call function to return all users
        db.getAllUsers(response);
    }
    
    else {//The path is not recognized. Return an error message
        response.send("{error: 'Path not recognized'}")
    }

}

//Handles POST requests to our web service
function handlePostRequest(request, response) {
    var pathArray = request.url.split("/");

    //Get the last part of the path
    var pathEnd = pathArray[pathArray.length - 1];

    //If path ends with 'customers' we return all customers
    if (pathEnd === 'comments') {
        //Call function to return all customers
        let newCust = request.body;
        console.log("Data received: " + JSON.stringify(newCust));
        let current = new Date();
        let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
        let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        let dateTime = cDate + ' ' + cTime;
        //Call function to add new customer
        db.addComment(dateTime, newCust.userComment, newCust.movieID, 0, response);
    } else if (pathEnd === 'movies') {
        let newCust = request.body;
        console.log("Data received: " + JSON.stringify(newCust));

        //Call function to add new movie
        db.addMovie(newCust.movieImage, newCust.movieName, newCust.movieReview, newCust.movieRating, response);

        //Call function to return all customers

    } else if (pathEnd === 'users') {
        //Call function to return all users
        let newCust = request.body;
        console.log("Data received: " + JSON.stringify(newCust));

        //Call function to add new user
        db.register(newCust.usersName, newCust.usersEmail, newCust.usersUsername, newCust.usersPassword, newCust.usersConfirmedPassword, response);
    }else if (pathEnd=== 'login'){
        let newUser = request.body;
        // console.log("Data received: " + JSON.stringify(newUser));

        //Call function to log a new user in
        db.login(newUser.loginUsername, newUser.loginUserPassword,response);

    }
    else {//The path is not recognized. Return an error message
        response.send("{error: 'Path not recognized'}")
    }
    

}



//Export server for testing
module.exports = app;