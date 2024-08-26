import Comment from "../models/comments.mjs";
import Post from "../models/posts.mjs";

export class CommentsService {
  static async getCommentsById(id, postId) {
    try {
      const comment = await Comment.findOne({ _id: id, post: postId }).populate(
        "post",
        "content"
      );
      if (!comment) {
        throw new Error("comment not found ");
      }
      return comment;
    } catch (err) {
      throw new Error("Error getting a comment " + err.message);
    }
  }

  static async getAllComments(postId) {
    try {
      const comments = await Comment.find({ post: postId });
      return comments;
    } catch (err) {
      throw new Error("Error getting commentss " + err.message);
    }
  }

  static async createComment(comment, postId) {
    const newcomment = new Comment({ ...comment });

    try {
      const savedcomment = await newcomment.save();
      await Post.findByIdAndUpdate(postId, {
        $push: { comments: savedcomment._id },
      });

      return savedcomment;
    } catch (error) {
      throw new Error("Error saving comment: " + error.message);
    }
  }

  static async editComment(id, updates) {
    try {
      const result = Comment.updateOne({ _id: id }, { $set: updates });
      return result;
    } catch (err) {
      throw new Error("Error updating a comment " + err.message);
    }
  }

  static async deleteComment(id, postId) {
    try {
      const result = await Comment.deleteOne({ _id: id, post: postId });
      if (!result) {
        throw new Error("comment not found ");
      }

      await Post.findByIdAndUpdate(postId, { $pull: { comments: id } });
      return result;
    } catch (err) {
      throw new Error("Error getting a comment " + err.message);
    }
  }
}
