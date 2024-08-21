import Express from "express";
import Cors from "cors"
import configuration from "config"
import { connectDb } from "./utils/MongodbConector.js";
import { nonAuthRoute } from "./routes/userRoute.js";


//server initializing
const server = Express()

//connect to database
connectDb()

//middlewares
server.use(Cors()) //cross origin communication
server.use(Express.json({limit:"100mb"})) // json body parsing
server.use(Express.urlencoded({ extended: false }))
//static endpoints
//routes
server.use(nonAuthRoute)
//admin route




const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`)
})

export {server}
