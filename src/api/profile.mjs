import bodyParser from "body-parser";
import express from "express";
import { auth } from "../core/auth.mjs";

const profileRouter = express.Router()
profileRouter.use(bodyParser.json())


profileRouter.get('/:id', auth, async (req, res)=>{
    res.status(200).send("Welcome to your personal account dear " + req.user.username)

})
export default profileRouter