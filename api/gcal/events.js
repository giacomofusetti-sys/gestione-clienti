export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  const { timeMin, timeMax, maxResults = "250" } = req.query;

  const params = new URLSearchParams({
    showDeleted: "false",
    singleEvents: "true",
    orderBy: "startTime",
    maxResults,
  });
  if (timeMin) params.set("timeMin", timeMin);
  if (timeMax) params.set("timeMax", timeMax);

  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(process.env.GOOGLE_CALENDAR_ID || 'primary')}/events?${params.toString()}`,
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Calendar events proxy error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
