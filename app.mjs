import * as dotenv from 'dotenv';
import express from "express";
dotenv.config()
import  usersRouter  from './src/api/users.mjs';
import loginRouter from './src/api/login.mjs';
import profileRouter from './src/api/profile.mjs';

const app = express()
const PORT = process.env.PORT || 3000


app.use('/users', usersRouter)
app.use('/login', loginRouter)
app.use('/profile', profileRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})