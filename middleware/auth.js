const jwt = require('jsonwebtoken');
const config = require('config');

// This is the auth middleware function which we will be using to authenticate the access token from the request headers when needed
// The token is obtained from the header and if not found status 401 is issued.
// the token is decoded using the jsonwebtoken library's verify method using the token secret we use for the app
module.exports = function(req , res , next){
    const accessToken = req.header('x-auth-accessToken');
    if(!accessToken) {
        res.status(401).json({msg: 'No accessToken Found....'});
    }
    try{
       const decoded = jwt.verify(accessToken , config.get('jwtSecret'));
       req.user = decoded.user;
       console.log(req.user);
       next();
    }
    catch(err){
        res.status(401).json({msg: 'Invalid accessToken, Authorization Denied.....'})
    }
}