
import Mongoose from "../../db.js";
import userSchema  from '../schemas/user-schema.js'
const url= process.env.MONGODB_URL
console.log(url)

Mongoose.connect(`${url}`);


const  agregationUser = async (email) => {
    const agregate = await userSchema.aggregate([
        { $match: { "email": email} },
    ])
    return agregate[0]  
}



export default  agregationUser