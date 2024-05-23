import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/userModel";
import { error } from "console";

connect()

export async function POST(request: NextRequest)
{
    try{
        const reqBody = await request.json()
        const {token} = reqBody
        // console.log("token is coming",token)

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt:Date.now()}})

        if(!user)
            {
                return NextResponse.json({error: "Invalid Token.. User not found"},{status: 400})
            }
        console.log(user)

        user.isVerified = true;
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save();

        // return NextResponse.redirect("/login")
        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })


    }
    catch(error:any)
    {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}

