import mailer from 'nodemailer'

const trasporter = mailer.createTransport({
    service : 'gmail',
    auth : {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    }
});

const senEmail = async(to,subject,text) =>{
    const options = {
        from: process.env.GMAIL_USER,
        to,
        subject,
        text
    }

    try{
        await trasporter.sendMail(options);
        console.log("email send success");
    }catch(error){
        console.log("Error :",error);
    }
}

export {senEmail}