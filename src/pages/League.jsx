import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMatchesByCompetition } from "../api/footballData";
import { ALL_LEAGUES } from "../storage/settings";

export default function League() {
  const { code } = useParams();
  const league = ALL_LEAGUES.find((l) => l.code === code);

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
    <div className="p-5 max-w-3xl mx-auto">
      <Link
        to="/"
        className="text-4xl font-bold no-underline flex justify-start"
      >
        ⬅
      </Link>

      <h1 className="text-3xl font-bold mt-3 mb-6">
        {league?.name || code}
      </h1>

      {loading && <p className="text-gray-500">Lade Spiele...</p>}
      {error && <p className="text-red-600 font-semibold">{error}</p>}

      {!loading && matches.length === 0 && (
        <p className="text-gray-500">Keine kommenden Spiele gefunden.</p>
      )}

      <ul className="flex flex-col gap-4">
        {matches.slice(0, 15).map((m) => (
          <li
            key={m.id}
            className="bg-white border border-gray-400 rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              {/* Home */}
              <div className="flex items-center gap-2 flex-1 font-semibold">
                <img
                  src={m.homeTeam.crest}
                  alt={m.homeTeam.name}
                  className="w-8 h-8"
                />
                <span className="truncate">{m.homeTeam.name}</span>
              </div>

              {/* VS */}
              <div className="w-12 text-center text-gray-400 font-bold">
                vs
              </div>

              {/* Away */}
              <div className="flex items-center justify-end gap-2 flex-1 font-semibold text-right">
                <span className="truncate">{m.awayTeam.name}</span>
                <img
                  src={m.awayTeam.crest}
                  alt={m.awayTeam.name}
                  className="w-8 h-8"
                />
              </div>
            </div>

            {/* Date */}
            <div className="mt-3 text-sm text-gray-500">
              {new Date(m.utcDate).toLocaleString("de-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}