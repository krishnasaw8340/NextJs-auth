import nodemailer from 'nodemailer'
import User from '@/model/userModel.js'
import bcryptjs from 'bcryptjs'

export const sendMail = async({email, emailType, userId}:any) => {
    try{
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        await User.findByIdAndUpdate(userId, 
            {
                verifyToken:hashedToken,
                verifyTokenExpiry:Date.now() + 36000
            }, {new: true, runValidators: true}
        )
    }
    catch(error:any)
    {
        throw new Error(error.message);
        

    }
}