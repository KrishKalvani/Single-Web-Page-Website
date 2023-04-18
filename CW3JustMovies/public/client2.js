

function addMovie() { //this function adds the movies
    addCustomerResultDiv = document.getElementById("addMovieResult"); //showing message thats it successful or not

    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let movImage=document.getElementById("FileInput").value;
    let custName = document.getElementById("movieName").value;
    let custEmail = document.getElementById("movieReview").value;
    let custAge = document.getElementById("movieRating").value;

    //Create object with user data
    let custObj = {
        movieimage: movImage,
        movieName: custName,
        movieReview: custEmail,
        movieRating: custAge
    };
    
    //Set up function that is called when reply received from server
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            addCustomerResultDiv.innerHTML = "<span style='color: white'>Movie added successfully</span>";
        }
        else{

            addCustomerResultDiv.innerHTML = "<span style='color: red'>Error adding movie</span>.";
        }
        //Refresh list of customers
        loadCustomers();
    };

    //Send new user data to server
    xhttp.open("POST", "/movies", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send( JSON.stringify(custObj) );
}


function addComment(movie_id) { //this function adds the comments into the screen

    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let movsImage=document.getElementById("comments" + movie_id).value;
    
    //Create object with user data
    let commObj = {

        userComment: movsImage,
        movieID: movie_id
        
        
    };
    
    addCommentResultDiv=document.getElementById('commentDiv' + movie_id);
    //Set up function that is called when reply received from server
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            addCommentResultDiv.innerHTML = "Test-This movie was pretty good ngl";
        }
        else{
            addCommentResultDiv.innerHTML = "<span style='color: red'>Error adding customer</span>.";
        }
        //Refresh list of customers
        loadComments();
    };

    //Send new user data to server
    xhttp.open("POST", "/comments", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send( JSON.stringify(commObj) );
}

 

function register() { //this adds users into the db
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let name=document.getElementById("RegisterName").value;
    let email = document.getElementById("RegisterEmail").value;
    let username = document.getElementById("RegisterUsername").value;
    let password = document.getElementById("RegisteroriginalPwd").value;
    let confirmedPassword = document.getElementById("RegisterconfirmPwd").value;


    //Create object with user data
    let UsersObj = {
        usersName: name,
        usersEmail: email,
        usersUsername: username,
        usersPassword: password,
        usersConfirmedPassword: confirmedPassword

    };
    
    //Set up function that is called when reply received from server
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            addUserResultDiv.innerHTML = "<span style='color: white'>User added successfully. Please login</span>";
        }
        else{
            addUserResultDiv.innerHTML = "<span style='color: red'>Error adding customer</span>.";
        }
        //Refresh list of customers
        // loadUsers();
    };

    //Send new user data to server
    xhttp.open("POST", "/users", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send( JSON.stringify(UsersObj) );
}


//login function

function login(){ //checks the users table and logs in into the webiste
    let xhttp = new XMLHttpRequest();
    let loginName=document.getElementById("LoginName").value;
    let loginPassword=document.getElementById("LoginPassword").value;

    let loginUserObj={
        loginUsername: loginName,
        loginUserPassword: loginPassword

    }
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            loginUserDiv.innerHTML = "<span style='margin-left: 70%; margin-top:50%; color:white'>login is successful</span>";
        }
        else{
            loginUserDiv.innerHTML = "<span style='color: red'>Error logging in</span>.";
        }
        //Refresh list of customers
        // loadUsers();
    };

    //Send new user data to server
    xhttp.open("POST", "/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send( JSON.stringify(loginUserObj) );

    
}
