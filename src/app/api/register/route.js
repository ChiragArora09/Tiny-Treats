import { User } from "@/app/models/User.js"
import mongoose from "mongoose"
import bcrypt from 'bcrypt'

export async function POST(req, res){
    const body = await req.json()
    mongoose.connect(process.env.MONGO_URL)
    const passw = body.password
    if(!passw?.length || passw.length<6){
        throw new Error("Password must be atleast 6 characters")
    }
    const salt = bcrypt.genSaltSync()
    body.password = bcrypt.hashSync(passw, salt)

    const newUser = await User.create(body)
    return Response.json(newUser)
}