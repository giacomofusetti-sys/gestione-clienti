export default async function handler(req, res) {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return res.status(500).json({ error: "Missing Supabase configuration" });
  }

  const headers = {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
  };

  if (req.method === "GET") {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/visit_notes?select=*`, { headers });
      if (!response.ok) {
        const err = await response.text();
        return res.status(response.status).json({ error: err });
      }
      const data = await response.json();
      return res.status(200).json(data);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method === "POST") {
    const { event_id, raw_note, ai_note } = req.body;
    if (!event_id) {
      return res.status(400).json({ error: "event_id is required" });
    }
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/visit_notes`, {
        method: "POST",
        headers: {
          ...headers,
          Prefer: "resolution=merge-duplicates,return=representation",
        },
        body: JSON.stringify({
          event_id,
          raw_note: raw_note || null,
          ai_note: ai_note || null,
        }),
      });
      if (!response.ok) {
        const err = await response.text();
        return res.status(response.status).json({ error: err });
      }
      const data = await response.json();
      return res.status(200).json(data);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
