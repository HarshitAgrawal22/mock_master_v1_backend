const userServices = require("../services/user_services");
const colors = require("../color");




exports.register = async (req, res) => {
    try {
        const credentials = req.body;
        console.log(req.body); // Logging request body for debugging

        const newUser = await userServices.registerUser(credentials);

        if (newUser === undefined) {
            res.status(400).json({
                status: false,
                message: "Email is already taken"
            });
        } else {
            console.log(colors.FgYellow, newUser);
            res.status(201).json({
                status: true,
                message: "User created successfully"
            });
        }

    } catch (error) {
        console.error(colors.FgRed, error); // Changed to console.error for better error logging
        res.status(500).json({
            status: false,
            message: "An error occurred during registration. Please try again later."
        });
    }
};





exports.listAllUser = async (req, res) => {
    try {

        const allUsers = await userServices.listAllUsers();
        // fetched the list of all the users

        for (let a of allUsers) {
            console.log(colors.FgYellow, a);
        }


        // sent all the users in response 
        res.status(200).json({
            status: true,
            users: allUsers
        });
    }
    catch (error) {


        console.log(colors.FgRed, error);
    }
}

exports.login = async (req, res) => {


    try {
        const { email, password } = req.body;
        // fetched the email, password from the request

        console.log(colors.FgMagenta, email + "   " + password);

        const user = await userServices.checkUser(email);
        // checking if the user already in the database or not

        if (!user) {
            // if the user isn't found by email its either means the user doesn't exist or  its incorrect email

            res.status(400).json({
                status: false,
                message: "Incorrect Email"
            });
        }
        else {

            // if the user is found then we will check the entered password with password in database 
            const isMatch = await user.comparePassword(password);



            if (isMatch === false) {
                // if the password doesn't match then incorrect pasword response is sent
                res.status(400).json({
                    status: false,
                    message: "Incorrect Password"
                });
            }
            else {
                console.log(user);

                const tokenData = {
                    id: user._id,
                    email: user.email
                };
                // if everything is right on track then we will generate and send the jwt token in response 

                userServices.generateToken(tokenData, "Agrawal", "2h").then((token) => {
                    res.status(200).json({
                        status: true,
                        token: token,
                        message: "takes this fucking token and just leave me"
                    })
                }).catch((error) => {
                    res.status(400).json({
                        status: false,
                        message: "unable to genrate password"
                    });
                })
            }
        }

    } catch (error) {

        console.log(colors.FgRed, error);
    }
}


exports.userDetails = async (req, res) => {

    try {

        const token = req.params.token;

        const { id, email } = await userServices.verifyJWT(token);

        const user = await userServices.fetchUserDetails(id);
        // fetched user details from the database

        console.log("user is " + user);
        if (user === null) {
            // if user is null then that means user id was wrong and user doesn't exist 
            res.status(400).json({
                status: false,
                message: "user not found"
            })

        } else {
            console.log("done");
            // if user existed then we have sent the user object to 
            res.status(200).json({
                status: true,
                user: user
            })
        }
    } catch (error) {
        console.log(colors.FgRed, error);
    }
}


