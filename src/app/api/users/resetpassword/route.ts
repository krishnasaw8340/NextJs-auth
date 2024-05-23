import { sendMail } from "@/helpers/mailer";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
connect();

export default async function SendEmail(req:NextRequest)
{
    try{
        const reqBody = await req.json();
        const {email} = reqBody;
        console.log("Email is coming");

    }
    catch(error:any)
    {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}