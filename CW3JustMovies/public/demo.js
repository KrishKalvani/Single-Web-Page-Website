async function getEmployees() {
    //Build query
    let sql = "SELECT * FROM employees";

    //Wrap the execution of the query in a promise
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err) {//Check for errors
                reject("Error executing query: " + JSON.stringify(err));
            }
            else {//Resolve promise with results
                resolve(result);
            }
        });
    });
}
function loadComments2(movie_id = null) {
    if (movie_id) {

    } else {
        let xhttp_movieID = new XMLHttpRequest();
        let movieArr;
        // let movieIDArr = [];
        xhttp_movieID.onreadystatechange = () => {//Called when data returns from server
            if (xhttp_movieID.readyState == 4 && xhttp_movieID.status == 200) {
                //Convert JSON to a JavaScript object
                movieArr = JSON.parse(xhttp_movieID.responseText);

                //Return if no customers
                if (movieArr.length === 0)
                    return;

                for (let key in movieArr) {
                    let movie_id = movieArr[key].movie_id;
                    // console.log(movie_id);
                    let commentDiv = document.getElementById('commentDiv' + movie_id);
                    let xhttp_movieComment = new XMLHttpRequest();

                    xhttp_movieComment.onreadystatechange = () => {
                        if (xhttp_movieComment.readyState == 4 && xhttp_movieComment.status == 200) {
                            //Convert JSON to a JavaScript object
                            let commentArr = JSON.parse(xhttp_movieComment.responseText);

                            //Return if no customers
                            if (commentArr.length === 0) {
                                console.log('comment array is empty');

                            }



                            let htmlStr = "<table>";
                            htmlStr += "</table>";
                            for (let key in commentArr) {
                                htmlStr += "<table><br><br>";
                                htmlStr += ("<tr><th>commentDate</th><th>commentDetails</th><th>movieID</th><th>userID</th></tr>");
                                htmlStr += ("<tr><td>" + commentArr[key].comment_date + "</td>");
                                htmlStr += ("<td>" + commentArr[key].comment_details + "</td><td>" + commentArr[key].movie_id + "</td><td>" + commentArr[key].user_id + "</td></tr>");
                                htmlStr += "</table><br>";


                            }


                            commentDiv.innerHTML = htmlStr;





                        }

                    }
                    let path = "/comments/" + movie_id;
                    // console.log(path);
                    xhttp_movieComment.open("GET", path, true);
                    xhttp_movieComment.send();
                    // movieIDArr.push(movieArr[key].movie_id)
                }




            }

        }
        xhttp_movieID.open("GET", "/movies", true);
        xhttp_movieID.send();


  }
}