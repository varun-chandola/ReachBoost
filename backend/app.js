import mongoose from "mongoose"
export const connectDB = async () =>{
    try {
        const connected = await mongoose.connect(process.env.mongoURL)
        console.log(`Db Connected to host : ` , connected.connection.host)
    } catch (error) {
        console.log('error connecting to db : ' , error.message)
    }
}