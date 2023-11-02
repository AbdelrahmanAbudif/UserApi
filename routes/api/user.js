// The list of modules needed for the user network calls
const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const {check , validationResult} = require('express-validator');


// Post method 
//URL: http://localhost:3000/user
// Public access point 
// the post method first goes through express validator middleware  that ensures json body from http request contains the fiels firstname , last name
// and a valid email.
router.post('/' , 
[check('firstName' , 'First Name is required').notEmpty(),
 check('lastName' , 'Last Name is required').notEmpty(),
 check('email' , 'Email is required').isEmail()
]
,async (req,res) => {
    const errors = validationResult(req);
    //if any of the check methods fails it is inside the errors array and a json is returned with the error and status code 400
    if(!errors.isEmpty()) {
       return res.status(400).json({errors:errors.array()});
    }

    const {firstName , lastName , email , marketingConsent} = req.body;

    // In case of no errors variables are initialized from the request

    try {
        // if a user is already existing in the databbase with the same email a status 400 is sent with error message json
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json('This Email already exists. Try Signing in!!');
        }
        //No user with email found means we can save the user. A User object is initialized with the request body
        user = new User({
            firstName,
            lastName,
            email,
            marketingConsent
        });
        // salting the email with the string 450d0b0db2bcf4adde5032eca1a7c416e560cf44 and using the crypto library to hash the saltedEmail using SHA1 alg which is the user id.
        let saltedEmail = email+config.get('salt');
        console.log(saltedEmail);
        user.id = crypto.createHash('sha1').update(saltedEmail).digest('hex');
        console.log(user.id);
        // saving user to the database
        await user.save();
        // creating a payload for the JWT to be created, the payload will be the user id  
        const payload = {
            user: {
               id: user.id
            }
        };
        // the jwt is signed with payload , the secret key TokenTokenToken
        jwt.sign(payload , 
            config.get('jwtSecret'),
            {expiresIn: 86400},
            (err , accessToken) => {
                if(err) throw err;
                res.json({id: user.id , accessToken: accessToken});
            });
    }
    catch(err) {
        console.log(err.message);
        res.send(err);
    }
});
// Get method with id 
//URL http://localhost:3000/user/userid userid is a request parameter.
//Private access point, needs access token header
// middleware function auth that verifies the accesstoken of the user.
router.get('/:user_id', auth, 
async (req , res) => {
    //after middleware function is done successfully. A query to the database is made to find a User with the id from the request.
    //Status 400 is sent as response if no user found and if user is found status 200 code with user info sent as json.
    try{
        console.log(req.user);
        if(req.user.id!=req.params.user_id) return res.status(401).json("This access token belongs to a different user");
        const user = await User.findOne({id: req.params.user_id});
        if(!user) return res.status(400).json('No user with this ID...');
        return res.status(200).json(user);
    }catch(err){
        res.status(400).json('Server Error...')
    }
});

module.exports = router;