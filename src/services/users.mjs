import User from "../models/users.mjs";
import { hashPassword, verifyPassword } from "../core/helpers.mjs";
import jwt from 'jsonwebtoken'

export class UsersService {
  static async getUserById(id) {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error("user not found ");
      }
      return user;
    } catch (err) {
      throw new Error("Error getting a user " + err.message);
    }
  }

  static async getAllUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (err) {
      throw new Error("Error getting users " + err.message);
    }
  }

  static async createUser(obj) {
    const { email, username, password, bio, avatar } = obj;
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      bio,
      avatar,
    });

    try {
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw new Error("Error saving user: " + error.message);
    }
  }

  static async editUser(id, updates) {
    try {
      const result = User.updateOne({ _id: id }, { $set: updates });
      return result;
    } catch (err) {
      throw new Error("Error updating a user " + err.message);
    }
  }

  static async deleteUser(id) {
    try {
      const result = await User.deleteOne({ _id: id });
      if (!result) {
        throw new Error("user not found ");
      }
      return result;
    } catch (err) {
      throw new Error("Error getting a user " + err.message);
    }
  }

  static async handleLogin(username, password) {

    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      throw new Error("Invalid Username");
    }
    const isValidPass = verifyPassword(password, foundUser.password);
    if (!isValidPass) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({username:foundUser.username}, "secretMessage", {expiresIn:60*60})
    return token
  }
}
