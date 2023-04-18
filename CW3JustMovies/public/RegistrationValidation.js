let button;
let passwordInput;//input that the user puts
let strongRegEx = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{7,}$");//conditions for a strong password

function checkPassword() {// checks if the password is strong or not

    let password = document.getElementById("RegisteroriginalPwd").value;
    let result = strongRegEx.test(password);


    if (result) {
        passwordInput.style.color = "green";
        return true;

    } else {
        passwordInput.style.color = "red";
        alert("password not strong");
        return false;
    }

}
function checkConfirmPassword() {//checks if the password is the same as confirm password
    let password = document.getElementById("RegisteroriginalPwd").value;
    let confirmPassword = document.getElementById("RegsisterconfirmPwd").value;
    console.log(password);
    console.log(confirmPassword);

    if (password == confirmPassword) {
        alert("registration pending...please click ok.");
        return true;
    } else {
        alert("password not same");
        return false;
    }


}


function registerValidate() {//getting the values of all the user inputs 
    
    
    let name = document.getElementById("RegisterName").value;
    let email = document.getElementById("RegisterEmail").value;
    let username = document.getElementById("RegisterUsername").value;
    let password = document.getElementById("RegisteroriginalPwd").value;
    let confirmPassword = document.getElementById("RegisterconfirmPwd").value;
    
    
    
    
    if (name == "" || username == "" || password == "" || confirmPassword == "" || email == "" ) {//validating to make sure the user doesn't miss anything
        alert("fill in all the details");
        return false;
    }

    if (!(checkPassword() && checkConfirmPassword())) {
        return;
    }
}