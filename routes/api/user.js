const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const {check , validationResult} = require('express-validator');



router.post('/' , 
[check('firstName' , 'First Name is required').notEmpty(),
 check('lastName' , 'Last Name is required').notEmpty(),
 check('email' , 'Email is required').isEmail()
]
,async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
       return res.status(400).json({errors:errors.array()});
    }
    const {firstName , lastName , email} = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json('This Email already exists. Try Signing in!!');
        }
        user = new User({
            firstName,
            lastName,
            email
        });
        let saltedEmail = email+config.get('salt');
        console.log(saltedEmail);
        user.id = crypto.createHash('sha1').update(saltedEmail).digest('hex');
        console.log(user.id);
        await user.save();
        const payload = {
            user: {
               id: user.id
            }
        };
        jwt.sign(payload , 
            config.get('jwtSecret'),
            {expiresIn: 3600000},
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

router.get('/:user_id', auth, 
async (req , res) => {
    try{
        const user = await User.findOne({id: req.params.user_id});
        if(!user) return res.status(400).json('No user with this ID...');
        return res.status(200).json(user);
    }catch(err){
        res.status(400).json('Server Error...')
    }
});

module.exports = router;