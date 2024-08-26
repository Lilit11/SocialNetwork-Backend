import mongoose from 'mongoose'  
mongoose.connect("mongodb://localhost:27017/socialNW");

 const usersSchema = new mongoose.Schema({
    email:String,
    username: String,
    password:String,
    bio: String,
    avatar:String,
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    followings:[{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    blocks:[{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    posts:[{ type: mongoose.Schema.Types.ObjectId, ref: "posts"}],
})


const User = mongoose.model('users', usersSchema)

export default User;