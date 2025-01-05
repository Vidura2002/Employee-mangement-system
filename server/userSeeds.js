import User from "./models/User.js";
import bcrypt from "bcrypt";
import connectDatabase from "./database/db.js";

const userRegister=async ()=>{
    connectDatabase();
    try{
        const hashPassword=await bcrypt.hash("admin123",12);
        const newUser=new User({
            name:"Admin",
            email:"admin123@gmail.com",
            password:hashPassword,
            role:"admin"
        })

        await newUser.save()
    }catch(error){
        console.log(error);
    }
}

userRegister();