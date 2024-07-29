import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.NODE_MAILER_MAILID,
        pass:process.env.NODE_MAILER_PASS,
    },
})

const mailOptions = {
    from : 'chakkaravarthik1999@gmail.com',
    to: ['chakkaravarthik99@gmail.com'],
    subject:'Email sending',
    text:"easy email from nodemailer",
}

export {transport, mailOptions};