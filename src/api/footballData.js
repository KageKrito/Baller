const BASE_URL = "/api/v4";

export async function fetchMatchesByCompetition(competitionCode) {
  const res = await fetch(`${BASE_URL}/competitions/${competitionCode}/matches?status=SCHEDULED`, {
    headers: {
      "X-Auth-Token": import.meta.env.VITE_FOOTBALL_API_KEY
    }
  });

  if (!res.ok) {
    throw new Error("API Fehler: " + res.status);
  }

  return res.json();
}