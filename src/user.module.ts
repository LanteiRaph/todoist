import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
    email: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String
    }
})

export default mongoose.model('User', Userschema)