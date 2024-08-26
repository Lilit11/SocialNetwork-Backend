import User from "../models/users.mjs";
import jwt from 'jsonwebtoken'


export const auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Token required" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, "secretMessage", async (err, data) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const foundUser = await User.findOne({ username: data.username });
    if (foundUser) {
      req.user = foundUser;
      next();
    }
  });
};
