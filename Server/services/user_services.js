const jwt = require("jsonwebtoken");
const user = require('../models/user_model');
const colors = require("../color");





class userServices {

    static async registerUser(credentials) {

        try {
            const checkedUser = await this.checkUser(credentials.email);
            // at first we have checked if a user already exists  with the same email 
            if (!checkedUser) {

                // if user doesn't exists then we will create the new user and save it to the database 
                console.log(credentials);
                const newUser = new user({
                    name: credentials.name,
                    password: credentials.password,
                    email: credentials.email,
                    branch: credentials.branch,
                    batch: credentials.batch,
                    cv: credentials.cv,
                    resume: credentials.resume
                });
                // returning the newly created user 
                return await newUser.save();
            } else {
                // if user exists then we are throwing the error
                return;
            }
        }
        catch (error) {
            console.log(colors.FgRed, error);
            // here we can also throw the error 
        }
    }


    static async checkUser(email) {
        try {
            // this function will check if the user already exists in db or not 
            // if exists then it will return the user else it will return undefined
            return await user.findOne({
                email: email
            });
        }
        catch (error) {
            console.log(colors.FgRed, error);
        }
    }


    static async verifyJWT(token) {
        return jwt.verify(token, "Agrawal", (err, decoded) => {
            if (err) {
                console.error('Invalid token', err);
            } else {
                console.log('Decoded Token:', decoded);
                const userId = decoded.id;
                const userEmail = decoded.email;
                console.log('User ID:', userId);
                console.log('User Email:', userEmail);

                return {
                    id: decoded.id,
                    email: decoded.email
                }
            }
        });
    }

    static async listAllUsers() {
        // this method will be used when we want the list of all users(students) with their all details
        return await user.find();
    }



    static async generateToken(tokenData, secretKey, jwt_expire) {
        // this method will create and return the jwt token 
        return await jwt.sign(tokenData, secretKey, { expiresIn: jwt_expire });
    }

    static async updateCvAndResume(id, resume, cv) {

        await user.updateOne({ _id: id }, {
            resume: resume,
            cv: cv
        })
        return user.findOne({ _id: id })
    }

    static async fetchUserDetails(id) {
        return await user.findOne({ _id: id });
    }

    // TODO: have to add the functionality to delete a user and with it all of his interview , questions will be deleted
}


module.exports = userServices;