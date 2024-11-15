// controllers/emailController.js
const Email = require("../models/email");  // Assuming an Email schema exists for saving email details
const agenda = require("../config/agenda");
const transporter = require("../config/nodemailer");

agenda.define("send email", async (job) => {
  const { to, subject, body } = job.attrs.data;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: body,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
});

const scheduleEmail = async (req, res) => {
  try {
    const { label, email, delay, leadSource, sendAt } = req.body;
console.log(label, email, delay, leadSource, sendAt )
    // Save email job details to database
    const emailJob = await Email.create({ label, to: email, leadSource, sendAt });

    // Schedule the email to be sent with Agenda
    await agenda.schedule(sendAt, "send email", {
      to: email,
      subject: label,
      body: `Lead Source: ${leadSource}`,
    });

    res.status(201).json({ message: "Email scheduled successfully!" });
  } catch (error) {
    console.error("Error scheduling email:", error);
    res.status(500).json({ message: "Error scheduling email" });
  }
};

module.exports = { scheduleEmail };
