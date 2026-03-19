import nodemailer from "nodemailer";



const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});



export const sendEmail = async (to, subject, text) => {

  try {

    await transporter.sendMail({
      from: `"Hospital Appointment System" <${process.env.EMAIL}>`,
      to,
      subject,
      text
    });

    console.log("Email sent successfully");

  } catch (error) {

    console.error("Email sending failed:", error);

  }

};



export const sendAppointmentConfirmation = async (
  email,
  patientName,
  doctor,
  date,
  time
) => {

  const html = `
    <h2>Appointment Confirmed 🏥</h2>
    <p>Hello <b>${patientName}</b>,</p>

    <p>Your appointment has been successfully booked.</p>

    <ul>
      <li><b>Doctor:</b> ${doctor}</li>
      <li><b>Date:</b> ${date}</li>
      <li><b>Time:</b> ${time}</li>
    </ul>

    <p>Please arrive 10 minutes early.</p>

    <br/>

    <p>Thank you,<br/>Hospital Management Team</p>
  `;

  try {

    await transporter.sendMail({
      from: `"Hospital Appointment System" <${process.env.EMAIL}>`,
      to: email,
      subject: "Appointment Confirmation",
      html
    });

    console.log("Appointment confirmation email sent");

  } catch (error) {

    console.error("Confirmation email failed:", error);

  }

};



export const sendAppointmentReminder = async (
  email,
  doctor,
  date,
  time
) => {

  const html = `
    <h2>Appointment Reminder ⏰</h2>

    <p>This is a reminder for your upcoming appointment.</p>

    <ul>
      <li><b>Doctor:</b> ${doctor}</li>
      <li><b>Date:</b> ${date}</li>
      <li><b>Time:</b> ${time}</li>
    </ul>

    <p>Please attend on time.</p>

    <br/>

    <p>Hospital Management System</p>
  `;

  try {

    await transporter.sendMail({
      from: `"Hospital Appointment System" <${process.env.EMAIL}>`,
      to: email,
      subject: "Appointment Reminder",
      html
    });

    console.log("Reminder email sent");

  } catch (error) {

    console.error("Reminder email failed:", error);

  }

};