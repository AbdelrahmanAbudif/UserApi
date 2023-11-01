const mongoose = require('mongoose');

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