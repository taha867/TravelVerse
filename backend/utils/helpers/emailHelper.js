import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, text, html }) => {
    try {
        console.log(`Sending email to: ${to}`);

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use TLS (not SSL)
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS, // App-specific password or actual email password
            },
        });
        
        const info = await transporter.sendMail({
            from: `"Travel Verse" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });

        console.log("Email sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email: ", error);
        throw new Error("Failed to send email");
    }
};


export default sendEmail;
