import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ALL_LEAGUES, loadSelectedLeagues } from "../storage/settings";
import { fetchLeagueInfo } from "../api/footballData";

export default function Home() {
  const selected = loadSelectedLeagues();
  const leagues = ALL_LEAGUES.filter((l) => selected.includes(l.code));

  const [leagueLogos, setLeagueLogos] = useState({});

  useEffect(() => {
    async function loadLogos() {
      const logos = {};

      for (const l of leagues) {
        try {
          const data = await fetchLeagueInfo(l.code);
          logos[l.code] = data.emblem;
        } catch (err) {
          console.warn("Logo fehlt für Liga", l.code, err);
        }
      }

      setLeagueLogos(logos);
    }

    loadLogos();
  }, [leagues]);

return (
    <div className="p-5 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Baller</h1>

            <Link
                to="/settings"
                className="text-3xl no-underline hover:opacity-70 transition"
            >
                ⚙
            </Link>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Deine Ligen
        </h2>

        {/* League Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {leagues.map((l) => (
                <Link
                    key={l.code}
                    to={`/league/${l.code}`}
                    className="flex items-center gap-4 p-5 rounded-2xl border border-gray-200 shadow-sm bg-white hover:shadow-md transition no-underline"
                >
                    {leagueLogos[l.code] ? (
                        <img
                            src={leagueLogos[l.code]}
                            alt={l.name}
                            className="w-12 h-12"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200" />
                    )}

                    <div className="flex flex-col text-left">
                        <span className="text-sm font-bold text-gray-900">
                            {l.name}
                        </span>
                        <span className="text-xs text-gray-500">{l.code}</span>
                    </div>
                </Link>
            ))}
        </div>
    </div>
);
}