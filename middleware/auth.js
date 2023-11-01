const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req , res , next){
    const accessToken = req.header('x-auth-accessToken');
    if(!accessToken) {
        res.status(401).json({msg: 'No accessToken Found....'});
    }
    try{
       const decoded = jwt.verify(accessToken , config.get('jwtSecret'));
       req.user = decoded.user;
       next();
    }
    catch(err){
        res.status(401).json({msg: 'Invalid accessToken, Authorization Denied.....'})
    }
}