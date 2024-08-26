import mongoose from 'mongoose'  
mongoose.connect("mongodb://localhost:27017/socialNW");

 const commentsSchema = new mongoose.Schema({
    contnent: String,
    likes: {type: Number, default: 0 },
    created: {type: Date, default: Date.now },
    post: {type: mongoose.Schema.Types.ObjectId, ref:"posts"},
    author:{ type: mongoose.Schema.Types.ObjectId, ref: "users"},
})


const Comment = mongoose.model('comments', commentsSchema)

export default Comment;