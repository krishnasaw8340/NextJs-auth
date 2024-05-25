import { NextRequest,NextResponse } from "next/server";
import User from "@/model/userModel";
import { connect } from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs"

connect();
export async function POST(request:NextRequest)
{
    try{
        const reqBody = await request.json();
        const {token, password} = reqBody
        console.log("token and password is coming", token, " and ", password)
        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: {$gt: Date.now()}
        });

        if(!user)
            {
                return NextResponse.json({error:"Invalid or expired token"})
            }
        
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
            user.forgotPasswordToken = undefined;
            user.forgotPasswordTokenExpiry = undefined;
            await user.save()
            
            return NextResponse.json({message:"Password Reset Successfully"}, {status: 200})
    }
    catch(error:any)
    {
        return NextResponse.json({error:"Internal Server Error in reset password"}, {status: 500})

    }
}