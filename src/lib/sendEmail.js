require("dotenv").config();
const { Resend } = require("resend");

const sendEmail = async (to, subject, text) => {
    if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.send({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        text,
    })
}

module.exports = sendEmail;