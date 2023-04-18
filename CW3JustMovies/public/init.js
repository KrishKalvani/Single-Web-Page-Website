let customerDiv;
let addCustomerResultDiv;
let commentDiv;
let addCommentResultDiv;
let addUserResultDiv;
// let loginUserDiv;



window.onload = init;

//Get pointers to parts of the DOM after the page has loaded.
function init() {
    customerDiv = document.getElementById("movies");
    addCustomerResultDiv = document.getElementById("addMovieResult");


    addUserResultDiv = document.getElementById("addUserResult");


    commentDiv = document.getElementById("commentDiv");
    addCommentResultDiv = document.getElementById("addCommentResult");
    // loadComments();
    // loadCustomers().then(()=>{
    //     loadComments2();
    // })
    // loadComments2();
    loadCustomers();
}

function loadCustomers() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {//Called when data returns from server
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //Convert JSON to a JavaScript object
            let usrArr = JSON.parse(xhttp.responseText);

            //Return if no customers
            if (usrArr.length === 0)
                return;

            //Build string with customer data
            let htmlStr = "<table>";
            htmlStr += "</table>";
            for (let key in usrArr) {
                htmlStr += "<table style='background-color:#44146A; color:white; width:60%; border-spacing:50px;' ><br><br>";
                htmlStr += ("<tr><th>movieID</th><th>movieImage</th><th>movieName</th><th>movieReview</th><th>movieRating</th></tr>");
                // htmlStr += ("<tr style='background-color:#44146A; '><td>" + usrArr[key].movie_id + "</td><td>" + "<img id='movie_image_" + usrArr[key].movie_id + "' /></td>");
                htmlStr += ("<tr style='background-color:#44146A; '><td>" + usrArr[key].movie_id + "</td><td>" + "<img src='../public/images/usrArr[key].movie_image'/></td>");
                // htmlStr += ("<tr style='background-color:#44146A; '><td>" + usrArr[key].movie_id + "</td><td>" + "<img src=./images/${movies.movie_image}></td>");
                htmlStr += ("<td>" + usrArr[key].movie_name + "</td><td>" + usrArr[key].movie_review + "</td><td>" + usrArr[key].movie_rating + "</td></tr>");
                htmlStr += "</table><br>";
                htmlStr += "<div id='commentDiv" + usrArr[key].movie_id + "' ";
                htmlStr += "</div>";
                htmlStr += "<form onsubmit='return false' >";
                htmlStr += "<div>";
                htmlStr += "<input type='text' id='comments" + usrArr[key].movie_id + "' placeholder='Please comment...'>";
                htmlStr += "</input>";
                htmlStr += "</div>";
                htmlStr += "<button  type='submit' onclick='addComment(" + usrArr[key].movie_id + ");'>Submit";
                htmlStr += "</button>";
                htmlStr += "</form>";
                htmlStr += "<div>";
                htmlStr += "<p id='addCommentResult'>";
                htmlStr += "</p>";
                htmlStr += "</div>";



            }

            //Add customers to page.
            // htmlStr += "</table>";

            customerDiv.innerHTML = htmlStr;
            for(let key in usrArr){
                 // Assuming 'blobString' is the blob string in your JavaScript object
                // and 'imgElement' is the HTML img element you want to display the image in
                let imgElement= document.getElementById("movie_image_" + usrArr[key].movie_id );
                console.log(usrArr[key].movie_image);
                console.log(imgElement);
                // if (usrArr[key].movie_image.length > 0) {
                //     imgElement.src = "data:image/jpeg;base64," + usrArr[key].movie_image;
                // }

                var blob = new Blob([usrArr[key].movie_image], { type: 'image/jpeg' });
                var reader = new FileReader();
                reader.onload = function () {
                    imgElement.src = reader.result;
                }
                reader.readAsDataURL(blob);
            }
            // for (let key in usrArr) {
            //     let imgElement = document.getElementById("movie_image_" + usrArr[key].movie_id);
            //     let imageBuffer = usrArr[key].movie_image;
            //     console.log(imageBuffer);
            //     console.log(imageBuffer.length);
            //     console.log(Buffer.isBuffer(imageBuffer));
            //     if (imageBuffer && imageBuffer.length > 0) {
            //         let base64Image = btoa(new Uint8Array(imageBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
            //         imgElement.src = "data:image/jpeg;base64," + base64Image;
            //         //   let base64Image = Buffer.from(imageBuffer).toString('base64');
            //         //   imgElement.src = "data:image/jpeg;base64," + base64Image;
            //     }
            //     // let base64Image = Buffer.from(imageBuffer).toString('base64');
            //     // imgElement.src = "data:image/jpeg;base64," + base64Image;
            //     // let base64Image = btoa(new Uint8Array(imageBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
            //     // imgElement.src = "data:image/jpeg;base64," + base64Image;
            // }
            // for (let key in usrArr) {
            //     let imgElement = document.getElementById("movie_image_" + usrArr[key].movie_id);
            //     let imageBuffer = usrArr[key].movie_image;
            //     // if (imageBuffer && imageBuffer.length > 0) {
                 
            //     // }
            //     let decoder = new TextDecoder('utf-8');
            //     let decodedData = decoder.decode(imageBuffer);
            //     let base64Image = btoa(decodedData);
            //     imgElement.src = "data:image/jpeg;base64," + base64Image;
            //   }
        }
    };

    //Request data for all customers
    xhttp.open("GET", "/movies", true);
    xhttp.send();
    // loadComments2();
}



function loadComments() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {//Called when data returns from server
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //Convert JSON to a JavaScript object
            let usrArr = JSON.parse(xhttp.responseText);

            //Return if no customers
            if (usrArr.length === 0)
                return;

            //Build string with customer data
            let htmlStr = "<table>";
            htmlStr += "</table>";
            for (let key in usrArr) {
                htmlStr += "<table style='background-color:#44146A; color:white; width:60%; border-spacing:50px;' ><br><br>";
                htmlStr += ("<tr><th>commentDate</th><th>commentDetails</th><th>movieID</th><th>userID</th></tr>");
                htmlStr += ("<tr style='background-color:#44146A; '><td>" + usrArr[key].comment_date + "</td>");
                htmlStr += ("<td>" + usrArr[key].comment_details + "</td><td>" + usrArr[key].movie_id + "</td><td>" + usrArr[key].user_id + "</td></tr>");
                htmlStr += "</table><br>";
               

            }

            //Add customers to page.
            

            // let commentDiv=document.getElementById("commentDiv" ++);
            commentDiv.innerHTML = htmlStr;
            // loadComments();
        }
    };

    //Request data for all customers
    xhttp.open("GET", "/comments", true);
    xhttp.send();
}




