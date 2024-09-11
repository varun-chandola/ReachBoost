import express from "express"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.routes.js"
import dotenv from "dotenv"
import {connectDB} from "./app.js"
import cors from "cors"

dotenv.config()
const app = express()

const PORT = process.env.PORT
app.use(express.json())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true}));
    

app.use(cors({
    origin:"http://localhost:5173",
    credentials : true  
}
))

app.use(express.static("public"))
app.use('/api/v1' , userRoutes)
connectDB()
app.listen(PORT , ()=> console.log(`server is running on port : ${PORT}`))

/**
 * refreshToken server secure tokens hote hai and unko hum client me nahi send karte
 * refreshToken -> store in -> http cookie
 * 
 * generate accessToken from refreshToken and then the react app maintains the accessToken . 
 * accessToken has to be send with every request to the server to authenticate user 
 * 
 * accessToken - 15 minutes
 * refreshToken - longer - 30d (or more) -> single source of truth
 * 
 * localStorage or cookie storage is not safe -> can be access by js code 
 * put it in the state  (in memory)
 * 
 */