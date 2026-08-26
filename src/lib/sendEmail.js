require("dotenv").config();
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text) => {
    await resend.send({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        text,
    })
}

module.exports = sendEmail;