import bodyParser from "body-parser";
import express from "express";
import { UsersService } from "../services/users.mjs";
import postsRouter from "./posts.mjs";

const usersRouter = express.Router();

usersRouter.use(bodyParser.json());

usersRouter.post("/", async (req, res) => {
  const { username, password, email, bio, avatar } = req.body;
  if (!username || !password || !email || !bio || !avatar) {
    return res
      .status(400)
      .send("Invalid data, please provide full information");
  }

  const user = {
    username,
    password,
    email,
    bio,
    avatar,
  };

  try {
    const result = await UsersService.createUser(user);
    return res.status(201).send(result);
  } catch (error) {
    return res.status(400).send("something went wrong while creating user");
  }
});
usersRouter.get("/", async (req, res) => {
  try {
    const result = await UsersService.getAllUsers();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});
usersRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await UsersService.getUserById(id);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("user not found");
  }
});
usersRouter.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  try {
    const result = await UsersService.editUser(id, updates);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("user not found");
  }
});
usersRouter.delete("/:id", async (req, res) => {
  try {
    const result = await UsersService.deleteUser(req.params.id);
    res.status(200).send(result);
  } catch (err) {
    return res.status(400).send("something went wrong while deleting user");
  }
});

usersRouter.use('/:id/posts', postsRouter);
export default usersRouter;
