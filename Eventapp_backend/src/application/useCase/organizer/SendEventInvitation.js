import nodemailer from "nodemailer";
import config from '../../../../src/config/config.js';

const SendEventInvitation = async (eventId, ticketId, repositories) => {
  try {
    console.log(`Processing invitation for Event ID: ${eventId}, Ticket ID: ${ticketId}`);

    // Step 1: Fetch event details from the database
    const eventData = await repositories.organizerSingleevent(eventId);
    if (!eventData) {
      return { status: false, message: "Event not found" };
    }

    // Step 2: Fetch ticket details from the database
    const ticketData = await repositories.getTicketById(ticketId);
    if (!ticketData) {
      return { status: false, message: "Ticket not found" };
    }

    // Step 3: Validate required data
    if (!eventData.meetLink) {
      return { status: false, message: "Meeting link is not available for this event" };
    }
    if (!ticketData.email) {
      return { status: false, message: "Attendee email is missing" };
    }

    // Step 4: Set up email transporter using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.EMAIL_USER, // Your email
        pass: config.EMAIL_PASS, // Your email password or app password
      },
    });

    // Step 5: Prepare invitation email data
    const emailPayload = {
      from: process.env.EMAIL_USER,
      to: ticketData.email, // Attendee's email
      subject: `Invitation to ${eventData.title}`,
      html: `
        <h2>You are invited to ${eventData.title}</h2>
        <p>Event Start: ${new Date(eventData.startDate).toLocaleString()}</p>
        <p>Event End: ${new Date(eventData.endDate).toLocaleString()}</p>
        <p>Click the link below to join the meeting:</p>
        <a href="${eventData.meetLink}" target="_blank">${eventData.meetLink}</a>
        <p>See you there!</p>
      `,
    };

    // Step 6: Send email
    const emailResponse = await transporter.sendMail(emailPayload);
    console.log(`Invitation sent to ${ticketData.email}:`, emailResponse.messageId);

    // Step 7: Update ticket status after successfully sending email
    const updateResult = await repositories.ticketcheckin(ticketId);

    console.log(`Ticket ${ticketId} check-in updated successfully.`);

    return { status: true, message: `Invitation sent and check-in updated for ${ticketData.email}` };
  } catch (error) {
    console.error("Error sending event invitation and updating check-in:", error);
    return { status: false, message: "Error processing event invitation and check-in" };
  }
};

export default SendEventInvitation;
