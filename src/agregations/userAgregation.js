
import Mongoose from "../../db.js";
import { userSchema } from '../schemas/user-schema'
const url= process.env.MONGODB_URL

Mongoose.connect(url);


const  agregationUser = async (email) => {
    const agregate = await userSchema.aggregate([
        { $match: { "email": email} },
    ])
    return agregate  
}



export default  agregationUser