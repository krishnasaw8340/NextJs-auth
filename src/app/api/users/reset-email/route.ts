import { NextResponse, NextRequest } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import { sendMail } from '@/helpers/mailer';
import User from '@/model/userModel';
connect();


export async function POST(request: NextRequest) {
    try{
        const { email } = await request.json();
        console.log('Received email:', email)
        const user = await User.findOne({email})
        if(!user)
            {
                return NextResponse.json({error:"Email not found"}, {status: 400})           
            }
        await sendMail({
            email: user.email,
            emailType: "RESET",
            userId: user._id
        });
        return NextResponse.json({message:"Password Reset email sent successfully"}, {status:201})
        
    }
    catch(error:any)
    {
        return NextResponse.json({error:"Email does not exist"}, {status: 400})
    }


  // Your logic to handle the reset password
  // Example: send an email with a reset link

}
