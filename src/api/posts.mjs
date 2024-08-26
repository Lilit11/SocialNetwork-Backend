import bodyParser from "body-parser";
import express from "express";
import { PostsService } from "../services/posts.mjs";
import commentsRouter from "./comments.mjs";

const postsRouter = express.Router({ mergeParams: true });

postsRouter.use(bodyParser.json());

postsRouter.post("/", async (req, res) => {
  const { content, image, author } = req.body;
  const authorId= req.params.id
  if (!content || !image || !author) {
    return res
      .status(400)
      .send("Invalid data, please provide full information");
  }

  const post = {
    content,
    image,
    author,
  };

  try {
    const result = await PostsService.createPost(post, authorId);
    return res.status(201).send(result);
  } catch (error) {
    return res.status(400).send("something went wrong while creating post");
  }
});
postsRouter.get("/", async (req, res) => {
    const authorId = req.params.id
  try {
    const result = await PostsService.getAllPosts(authorId);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});
postsRouter.get("/:postId", async (req, res) => {
  const id = req.params.postId;
  const authorId = req.params.id
  try {
    const result = await PostsService.getPostById(id, authorId);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("post not found");
  }
});

postsRouter.patch("/:postId", async (req, res) => {
  const id = req.params.postId;
  const updates = req.body;
  try {
    const result = await PostsService.editPost(id, updates);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("post not found");
  }
});

postsRouter.delete("/:postId", async (req, res) => {
const authorId = req.params.id
  try {
    const result = await PostsService.deletePost(req.params.postId, authorId);
    res.status(200).send(result);
  } catch (err) {
    return res.status(400).send("something went wrong while deleting post");
  }
});

postsRouter.use('/:postId/comments', commentsRouter);
export default postsRouter;
