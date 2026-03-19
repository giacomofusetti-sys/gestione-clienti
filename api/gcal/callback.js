export default async function handler(req, res) {
  const { code } = req.query;
  if (!code) {
    return res.status(400).json({ error: "Missing authorization code" });
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: "Google OAuth credentials not configured" });
  }

  const host = process.env.APP_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const redirectUri = `${host}/api/gcal/callback`;

  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Token exchange error:", data);
      return res.status(400).json({ error: "Token exchange failed", details: data });
    }

    const params = new URLSearchParams({
      gcal_token: data.access_token,
    });
    if (data.refresh_token) {
      params.set("gcal_refresh", data.refresh_token);
    }

    res.redirect(`/?${params.toString()}`);
  } catch (err) {
    console.error("Callback error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
