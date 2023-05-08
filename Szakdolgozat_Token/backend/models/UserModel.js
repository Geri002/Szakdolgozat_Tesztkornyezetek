import mongoose from 'mongoose'
//Tábla készítés a felhasználóknak


const usersSchema = new mongoose.Schema({

    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},

}, {
    timestamps: true


})


const User = mongoose.model('User', usersSchema);
export default User;