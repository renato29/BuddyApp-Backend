const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Schema
const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNum: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    createdDate: {
        type: Number,
        default: Date.now()
    },
    googleId: { 
        type: String,
       
    },
    image: { 
        type: String,
    }

})

UserSchema.pre('save', async function (next) {
    // create a Salt to call ganSalt 10 num de rounds from docs
    const salt = await bcrypt.genSalt(10);
    //salt will be passed to bcrypt.hash to be a new token, also in DB
    this.password = await bcrypt.hash(this.password, salt);
    //call next to call next middleware UserSchema, this is async so it happens before the UserShema
    next();
})

//Validating password
//entered password come from login
//comparing the hashed password with the entered by the user
UserSchema.methods.isPasswordMatch = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', UserSchema);
module.exports = User;

