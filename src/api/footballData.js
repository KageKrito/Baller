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

export async function fetchLeagueInfo(competitionCode) {
  const res = await fetch(`https://api.football-data.org/v4/competitions/${competitionCode}`, {
    headers: {
      "X-Auth-Token": import.meta.env.VITE_FOOTBALL_API_KEY
    }
  });

  if (!res.ok) {
    throw new Error("API Fehler: " + res.status);
  }

  return res.json(); // enthält u.a. "name", "emblem", "area"
}