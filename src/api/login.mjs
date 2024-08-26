import bodyParser from "body-parser";
import express from "express";
import { UsersService } from "../services/users.mjs";

const loginRouter = express.Router()
loginRouter.use(bodyParser.json())


loginRouter.post('/', async (req, res)=>{
    const {username, password} = req.body
    if(!username || !password){
        return res.status(400).send("Please provide username and password")
    }
    try{
        const token = await UsersService.handleLogin(username, password);
        return res.status(200).send(token)
    }catch(err){
        return res.status(400).send(err.message)
    }

})
export default loginRouter