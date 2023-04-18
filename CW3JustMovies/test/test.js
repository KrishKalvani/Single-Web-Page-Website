//Database code that we are testing
let db = require('../database');

//Server code that we are testing
let server = require ('../webApplicationSql3')

//Set up Chai library 
let chai = require('chai');
let should = chai.should();
let assert = chai.assert;
let expect = chai.expect;

//Set up Chai for testing web service
let chaiHttp = require ('chai-http');
chai.use(chaiHttp);

//Import the mysql module and create a connection pool with the user details
const mysql = require('mysql');
const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "root",
    password: "1234",
    database: "justmovies",
    debug: false
});

//Wrapper for all database tests
describe('Database', () => {

    //Mocha test for getAllCustomers method in database module. Here, getAllCustomers is referring to movies.
    describe('#getAllCustomers', () => {
        it('should return all of the movies in the database', (done) => {
            //Mock response object for test
            let response= {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object
            response.send = (result) => {
                //Convert result to JavaScript object
                let resObj = JSON.parse(result);

                //Check that an array of customers is returned
                resObj.should.be.a('array');

                //Check that appropriate properties are returned
                if(resObj.length > 1){
                    resObj[0].should.have.property('movie_image');
                    resObj[0].should.have.property('movie_name');
                    resObj[0].should.have.property('movie_review');
                    resObj[0].should.have.property('movie_rating');
                }

                //End of test
                done();
            }

            //Call function that we are testing
            db.getAllCustomers(response);
        });
    });
    // describe getAllComment
    describe('#getAllComments', () => {
        it('should return all of the comments in the database', (done) => {
            //Mock response object for test
            let response= {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object
            response.send = (result) => {
                //Convert result to JavaScript object
                let resObj = JSON.parse(result);

                //Check that an array of comments is returned
                resObj.should.be.a('array');

                //Check that appropriate properties are returned
                if(resObj.length > 1){
                    resObj[0].should.have.property('comment_date');
                    resObj[0].should.have.property('comment_details');
                    resObj[0].should.have.property('movie_id');
                    resObj[0].should.have.property('user_id');
                }

                //End of test
                done();
            }

            //Call function that we are testing
            db.getAllComments(response);
        });
    });


    ///////
    //describe getAllusers
    describe('#getAllUsers', () => {
        it('should return all of the users in the database', (done) => {
            //Mock response object for test
            let response= {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object
            response.send = (result) => {
                //Convert result to JavaScript object
                let resObj = JSON.parse(result);

                //Check that an array of users is returned
                resObj.should.be.a('array');

                //Check that appropriate properties are returned
                if(resObj.length > 1){
                    resObj[0].should.have.property('name');
                    resObj[0].should.have.property('email');
                    resObj[0].should.have.property('username');
                    resObj[0].should.have.property('password');
                    resObj[0].should.have.property('confirmPassword');
                }

                //End of test
                done();
            }

            //Call function that we are testing
            db.getAllUsers(response);
        });
    });









    //Mocha test for getAllCustomers method in database module.
    describe('#addMovie', () => {
        it('should add a movie to the database', (done) => {
            //Mock response object for test
            let response= {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object. This checks whether function is behaving correctly
            response.send = () => {
                //Check that movie has been added to database
                let sql = "SELECT movie_name FROM movies WHERE movie_name='" + custName + "'";
                connectionPool.query(sql, (err, result) => {
                    if (err){//Check for errors
                        assert.fail(err);//Fail test if this does not work.
                        done();//End test
                    }
                    else{
                        //Check that movie has been added
                        expect(result.length).to.equal(1);

                        //Clean up database
                        sql = "DELETE FROM movies WHERE movie_name='" + custName + "'";
                        connectionPool.query(sql, (err, result) => {
                            if (err){//Check for errors
                                assert.fail(err);//Fail test if this does not work.
                                done();//End test
                            }
                            else{
                                done();//End test
                            }
                        });
                    }
                });
            };

            //Create random movie details
            let custImage = Math.random().toString(36).substring(2, 15);
            let custName='serverTesting'
            let custReview = 'niceee';
            let custRating = "2/10";

            //Call function to add customer to database
            db.addMovie(custImage,custName, custReview, custRating, response);
        });
    });
    //describe addComment

    describe('#addComment', () => {
        it('should add a comment to the database', (done) => {
            //Mock response object for test
            let response= {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object. This checks whether function is behaving correctly
            response.send = () => {
                //Check that comment has been added to database
                let sql = "SELECT comment_details FROM comments WHERE comment_details='" + commentDetails + "'";
                connectionPool.query(sql, (err, result) => {
                    if (err){//Check for errors
                        assert.fail(err);//Fail test if this does not work.
                        done();//End test
                    }
                    else{
                        //Check that comment has been added
                        expect(result.length).to.equal(1);

                        //Clean up database
                        sql = "DELETE FROM comments WHERE comment_details='" + commentDetails + "'";
                        connectionPool.query(sql, (err, result) => {
                            if (err){//Check for errors
                                assert.fail(err);//Fail test if this does not work.
                                done();//End test
                            }
                            else{
                                done();//End test
                            }
                        });
                    }
                });
            };

            //Create random movie details
            let commentDate = "2023-04-11";
            let commentDetails='serverTesting';
            let movieiD = 1;
            let useriD = 0;

            //Call function to add customer to database
            db.addComment(commentDate,commentDetails, movieiD, useriD, response);
        });
    });

    //describe addUsers
    describe('#register', () => {
        it('should add a user to the database', (done) => {
            //Mock response object for test
            let response= {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object. This checks whether function is behaving correctly
            response.send = () => {
                //Check that user has been added to database
                let sql = "SELECT username FROM users WHERE username='" + testUsername + "'";
                connectionPool.query(sql, (err, result) => {
                    if (err){//Check for errors
                        assert.fail(err);//Fail test if this does not work.
                        done();//End test
                    }
                    else{
                        //Check that user has been added
                        expect(result.length).to.equal(1);

                        //Clean up database
                        sql = "DELETE FROM users WHERE username='" + testUsername + "'";
                        connectionPool.query(sql, (err, result) => {
                            if (err){//Check for errors
                                assert.fail(err);//Fail test if this does not work.
                                done();//End test
                            }
                            else{
                                done();//End test
                            }
                        });
                    }
                });
            };

            //Create random user details
            let testName = "server";
            let testEmail = "servertest@hotmail.com"
            let testUsername="ST";
            let testPassword="ST1234" ;
            let testConfirmPassword = "ST1234";

            //Call function to add customer to database
            db.register(testName,testEmail, testUsername, testPassword, testConfirmPassword, response);
        });
    });

    //describe login
    describe('#login', () => {
        it('should check and login to the database', (done) => {
            //Mock response object for test
            let response= {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object. This checks whether function is behaving correctly
            response.send = () => {
                //Check that logged in user exists in the user table
                
                let sql = "SELECT * FROM users " +
    "       WHERE username='" + testLoginName +"' and password= '" +testLoginPassword+"'";
                connectionPool.query(sql, (err, result) => {
                    if (err){//Check for errors
                        assert.fail(err);//Fail test if this does not work.
                        done();//End test
                    }
                    else{
                        //Check that logged in user has been added
                        expect(result.length).to.equal(1);

                        
                        connectionPool.query(sql, (err, result) => {
                            if (err){//Check for errors
                                assert.fail(err);//Fail test if this does not work.
                                done();//End test
                            }
                            else{
                                done();//End test
                            }
                        });
                    }
                });
            };

            //Create random login details
            let testLoginName = "SG";
            let testLoginPassword="Simdhu1234" ;
           

            //Call function to add customer to database
            db.login(testLoginName, testLoginPassword,response);
        });
    });



});

