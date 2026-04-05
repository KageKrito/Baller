import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMatchesByCompetition } from "../api/footballData";
import { ALL_LEAGUES } from "../storage/settings";

export default function League() {
  const { code } = useParams();
  const league = ALL_LEAGUES.find(l => l.code === code);

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchMatchesByCompetition(code);
        setMatches(data.matches || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [code]);

  return (
    <div style={{ padding: 20 }}>
      <Link to="/">⬅ Zurück</Link>

      <h1>{league?.name || code}</h1>

      {loading && <p>Lade Spiele...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && matches.length === 0 && <p>Keine kommenden Spiele gefunden.</p>}

      <ul style={{ padding: 0, listStyle: "none" }}>
        {matches.slice(0, 15).map(m => (
          <li
            key={m.id}
            style={{
              padding: 12,
              borderBottom: "1px solid #eee"
            }}
          >
            <div style={{ fontWeight: "bold" }}>
              {m.homeTeam.name} vs {m.awayTeam.name}
            </div>
            <div style={{ fontSize: 14, opacity: 0.8 }}>
              {new Date(m.utcDate).toLocaleString("de-DE", { hour: "2-digit", minute: "2-digit" }
)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}