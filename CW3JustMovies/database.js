//Import the mysql module and create a connection pool with user details
const mysql = require('mysql');
const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "root",
    password: "1234",
    database: "justmovies",
    debug: false
});

//Gets all customers, here its referring to movies
exports.getAllCustomers = (response) => {
    //Build query
    let sql = "SELECT * FROM movies";

    //Execute query 
    connectionPool.query(sql, (err, result) => {
        if (err){//Check for errors
            let errMsg = "{Error: " + err + "}";
            // console.error(errMsg);
            response.status(400).json(errMsg);
        }
        else{//Return results in JSON format 
            //console.log(JSON.stringify(result));
            response.send(JSON.stringify(result))
            // console.log(result)
        }
    });
};


//Adds a new movie to database 
exports.addMovie = (movie_image, movie_name, movie_review, movie_rating, response) => {
    //Build query
    let sql = "INSERT INTO movies (movie_image, movie_name, movie_review, movie_rating) " +
    "       VALUES ('" + movie_image + "','" + movie_name + "','" + movie_review +"','"+movie_rating+"')";
    console.log(sql);
    
    //Execute query
    connectionPool.query(sql, (err, result) => {
        if (err){//Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).json(errMsg);
        }
        else{//Send back result
            response.send("{result: 'Movie added successfully'}");
        }
    });
}



//add new comment





// Import the mysql module and create a connection pool with user details


//Gets all comments
exports.getAllComments = (response) => {
    //Build query
    let sql = "SELECT * FROM comments";

    //Execute query 
    connectionPool.query(sql, (err, result) => {
        if (err){//Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).json(errMsg);
        }
        else{//Return results in JSON format 
            //console.log(JSON.stringify(result));
            response.send(JSON.stringify(result))
            console.log(result)
        }
    });
};

//assigning each comment to the specific movie_id of which the user commented on
exports.getMovieComments = (movie_id, response) => {
    //Build query
    let sql = "SELECT * FROM comments where movie_id= '"+movie_id+"'";

    //Execute query 
    connectionPool.query(sql, (err, result) => {
        if (err){//Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).json(errMsg);
        }
        else{//Return results in JSON format 
            //console.log(JSON.stringify(result));
            response.send(JSON.stringify(result))
            console.log(result)
        }
    });
};

//Adds a new comment to database 
exports.addComment = (comment_date, comment_details, movie_id, user_id, response) => {
    //Build query
    let sql = "INSERT INTO comments (comment_date, comment_details, movie_id, user_id) " +
    "       VALUES ('" + comment_date + "','" + comment_details + "','" + movie_id +"','"+user_id+"')";
    console.log(sql);
    
    //Execute query
    connectionPool.query(sql, (err, result) => {
        if (err){//Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).json(errMsg);
        }
        else{//Send back result
            response.send("{result: 'Comment added successfully'}");
        }
    });
}




//add users//

//Import the mysql module and create a connection pool with user details


//Gets all users
exports.getAllUsers = (response) => {
    //Build query
    let sql = "SELECT * FROM users";

    //Execute query 
    connectionPool.query(sql, (err, result) => {
        if (err){//Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).json(errMsg);
        }
        else{//Return results in JSON format 
            //console.log(JSON.stringify(result));
            response.send(JSON.stringify(result))
            console.log(result)
        }
    });
};


//Adds a new user to database 
exports.register = (name, email, username, password,confirmPassword, response) => {
    //Build query
    let sql = "INSERT INTO users (name, email, username, password, confirmPassword) " +
    "       VALUES ('" + name + "','" + email + "','" + username +"','"+password+"','"+confirmPassword+"')";
    console.log(sql);
    
    //Execute query
    connectionPool.query(sql, (err, result) => {
        if (err){//Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).json(errMsg);
        }
        else{//Send back result
            response.send("{result: 'User added successfully'}");
        }
    });
}

//checkks user table and then logs in the entered login details
exports.login = (loginName, loginPassword, response) => {
    //Build query
    let sql = "SELECT * FROM users " +
    "       WHERE username='" + loginName +"' and password= '" +loginPassword+"'";
    console.log(sql);
    
    //Execute query
    connectionPool.query(sql, (err, result) => {
        if (err){//Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).json(errMsg);
        }
        else{//Send back result
            if(result.length>0){
            response.send("{result: 'Correct credentials'}");
            console.log(result);
            }else{
                response.status(400).json("{result: 'Wrong credentials'}")
                console.log(result);
            }
        }
    });
}



