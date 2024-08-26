import Post from "../models/posts.mjs";
import User from "../models/users.mjs";

export class PostsService {

  static async getPostById(id, authorId) {
    try {
      const post = await Post.findOne({_id:id, author:authorId}).populate('author', 'username');
      if (!post) {
        throw new Error("post not found ");
      }
      return post;
    } catch (err) {
      throw new Error("Error getting a post " + err.message);
    }
  }

  static async getAllPosts(authorId) {
    try {
      const posts = await Post.find({author:authorId});
      return posts;
    } catch (err) {
      throw new Error("Error getting posts " + err.message);
    }
  }

  static async createPost(post, authorId) {
   
    const newPost = new Post({...post});

    try {
      const savedPost = await newPost.save();
      await User.findByIdAndUpdate(
        authorId,
        { $push: { posts: savedPost._id } }
      );

      return savedPost;


    } catch (error) {
      throw new Error("Error saving post: " + error.message);
    }
  }

  static async editPost(id, updates) {
    try {
      const result = Post.updateOne({ _id: id }, { $set: updates });
      return result;
    } catch (err) {
      throw new Error("Error updating a post " + err.message);
    }
  }

  static async deletePost(id, authorId) {
    try {
      const result = await Post.deleteOne({ _id: id , author:authorId });
      if (!result) {
        throw new Error("post not found ");
      }

      await User.findByIdAndUpdate(
        authorId,
        { $pull: { posts: id } }
      );
      return result;
    } catch (err) {
      throw new Error("Error getting a post " + err.message);
    }
  }
}
