import { Link } from "react-router-dom";
import { ALL_LEAGUES, loadSelectedLeagues } from "../storage/settings";

export default function Home() {
  const selected = loadSelectedLeagues();
  const leagues = ALL_LEAGUES.filter(l => selected.includes(l.code));

  return (
    <div style={{ padding: 20 }}>
      <h1>Baller ⚽</h1>

      <Link to="/settings">⚙ Einstellungen</Link>

      <h2>Deine Ligen</h2>

      <div style={{ display: "grid", gap: 12 }}>
        {leagues.map(l => (
          <Link
            key={l.code}
            to={`/league/${l.code}`}
            style={{
              padding: 14,
              borderRadius: 10,
              border: "1px solid #ddd",
              textDecoration: "none",
              color: "white",
              fontSize: 18
            }}
          >
            {l.name}
          </Link>
        ))}
      </div>
    </div>
  );
}