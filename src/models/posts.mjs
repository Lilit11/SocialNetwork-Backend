import mongoose from 'mongoose'  
mongoose.connect("mongodb://localhost:27017/socialNW");

 const postsSchema = new mongoose.Schema({
    content:String,
    image:String,
    likes: { type: Number, default: 0 },
    created:  { type: Date, default: Date.now },
    author:{ type: mongoose.Schema.Types.ObjectId, ref: "users"},
    comments:[{ type: mongoose.Schema.Types.ObjectId, ref: "comments"}],
})


const Post = mongoose.model('posts', postsSchema)

export default Post;