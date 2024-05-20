import nodemailer from 'nodemailer'
import User from '@/model/userModel.js'
import bcryptjs from 'bcryptjs'
import { connect } from '@/dbConfig/dbConfig'

connect()

export const sendMail = async({email, emailType, userId}:any) => {
    try{
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        if(emailType === "VERIFY")
            {
                await User.findByIdAndUpdate(userId,
                    {verifyToken:hashedToken,
                        verifyTokenExpiry:Date.now() + 3600000
                    }
                )
            }
        else if(emailType === "RESET")
            {
                await User.findByIdAndUpdate(userId,
                    {forgotPasswordToken: hashedToken,
                        forgotPasswordTokenExpiry: Date.now() + 360000
                    }
                )

            }
        // await User.findByIdAndUpdate(userId, 
        //     {
        //         verifyToken:hashedToken,
        //         verifyTokenExpiry:Date.now() + 36000
        //     }, {new: true, runValidators: true}
        // )
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "3e3759719f5e94",
              pass: "2cb4a230f9b007"
            }
          });

          const mailOptions = {
            from:'infosecmenu@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email'  : 'Reset your password',
            html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY"? "Verfiy your email": "Reset your password"} or copy and paste the link below in your browser. <br> ${process.env.domain}/verifyemail?token=${hashedToken}</p>` 
          }

          const mailresponse = await transport.sendMail
          (mailOptions);
          return mailresponse;
    }
    catch(error:any)
    {
        throw new Error(error.message);

    }
}