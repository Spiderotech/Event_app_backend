import { google } from "googleapis";
import config from '../../../../src/config/config.js';

const CreateGoogleMeetLink = async (eventId, repositories) => {
  try {
    // Fetch event details from the database
    console.log(eventId);
    
    const eventData = await repositories.organizerSingleevent(eventId);
    if (!eventData) {
      return { status: false, message: "Event not found" };
    }

    // Google OAuth2 authentication using Client ID, Secret, and Refresh Token
    const auth = new google.auth.OAuth2(
        config.GOOGLE_CLIENT_ID,
        config.GOOGLE_CLIENT_SECRET,
        config.GOOGLE_REDIRECT_URI
      );
  
      auth.setCredentials({ refresh_token: config.GOOGLE_REFRESH_TOKEN });

    const calendar = google.calendar({ version: "v3", auth });

    // Define event details for Google Calendar
    const event = {
      summary: eventData.title,
      description: eventData.description,
      start: {
        dateTime: new Date(eventData.startDate).toISOString(),
        timeZone: "UTC", // Modify as needed
      },
      end: {
        dateTime: new Date(eventData.endDate).toISOString(),
        timeZone: "UTC", // Modify as needed
      },
      conferenceData: {
        createRequest: {
          requestId: `${eventId}-meet`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    };

    // Insert event into Google Calendar
    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1,
    });

    const meetLink = response.data.hangoutLink;
    console.log("Google Meet Link Created:", meetLink);

    // Save the Meet link in the database
    await repositories.updateEventlink(eventId,meetLink );

    return { status: true, meetLink };
  } catch (error) {
    console.error("Error creating Google Meet link:", error);
    return { status: false, message: "Error creating Google Meet link" };
  }
};

export default CreateGoogleMeetLink;
