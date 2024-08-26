import bodyParser from "body-parser";
import express from "express";
import { CommentsService } from "../services/comments.mjs";
import postsRouter from "./posts.mjs";

const commentsRouter = express.Router({ mergeParams: true });

commentsRouter.use(bodyParser.json());

commentsRouter.post("/", async (req, res) => {
  const { content, author} = req.body;
  const authorId = req.params.id;
  const postId = req.params.postId;

  if (!content || !author) {
    return res
      .status(400)
      .send("Invalid data, please provide full information");
  }

  const comment = {
    content,
    post:postId,
    author,
  };

  try {
    const result = await CommentsService.createComment(comment,postId);
    return res.status(201).send(result);
  } catch (error) {
    return res.status(400).send("something went wrong while creating post");
  }
});
commentsRouter.get("/", async (req, res) => {
  const authorId = req.params.id;
  const postId = req.params.postId;
  try {
    const result = await CommentsService.getAllComments(postId);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});
commentsRouter.get("/:commentId", async (req, res) => {
  const id = req.params.commentId;
  const authorId = req.params.id;
  const postId = req.params.postId;
  try {
    const result = await CommentsService.getCommentById(id, postId);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("comment not found");
  }
});

commentsRouter.patch("/:commentId", async (req, res) => {
  const id = req.params.commentId;
  const updates = req.body;
  try {
    const result = await CommentsService.editComment(id, updates);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("comment not found");
  }
});

commentsRouter.delete("/:commentId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const result = await CommentsService.deleteComment(req.params.commentId, postId);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    return res.status(400).send("something went wrong while deleting comment");
  }
});

export default commentsRouter;
