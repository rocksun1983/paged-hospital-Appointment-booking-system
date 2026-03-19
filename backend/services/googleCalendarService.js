import { google } from "googleapis";

export const addToCalendar = async (summary, description, start, end) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: ["https://www.googleapis.com/auth/calendar"]
  });

  const calendar = google.calendar({ version: "v3", auth });

  await calendar.events.insert({
    calendarId: "primary",
    resource: {
      summary,
      description,
      start: { dateTime: start },
      end: { dateTime: end }
    }
  });
};