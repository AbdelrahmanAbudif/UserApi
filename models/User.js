const mongoose = require('mongoose');
//Mongo User schema
const UserSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    marketingConsent: {
        type: Boolean,
        default: false
    }
});
// This method is used to omit fields we don't want to send in our json response
UserSchema.methods.toJSON = function(){
    user = this.toObject();
    if(!user.marketingConsent){
        delete user.email;
    }
    delete user.__v;
    delete user._id;
    return user;
}

module.exports = User = mongoose.model('user' , UserSchema);