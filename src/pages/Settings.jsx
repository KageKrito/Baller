import { useState } from "react";
import { Link } from "react-router-dom";
import { ALL_LEAGUES, loadSelectedLeagues, saveSelectedLeagues } from "../storage/settings";

export default function Settings() {
  const [selected, setSelected] = useState(loadSelectedLeagues());

  function toggle(code) {
    setSelected(prev =>
      prev.includes(code) ? prev.filter(x => x !== code) : [...prev, code]
    );
  }

  function save() {
    saveSelectedLeagues(selected);
    alert("Gespeichert!");
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <div>
        <Link to="/" style={{ textDecoration: 'none', fontSize: 42, display: "flex", textAlign: "left", justifyContent: "flex-start" }}>⬅</Link>
        <h1 className="text-2xl font-bold mb-4">Einstellungen</h1>
      </div>
      <p className="mb-4 text-gray-600">Welche Ligen möchtest du sehen?</p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {ALL_LEAGUES.map((l) => {
            const active = selected.includes(l.code);

            return (
            <button
                key={l.code}
                onClick={() => toggle(l.code)}
                className={`w-full p-4 rounded-2xl text-lg font-semibold transition flex items-center justify-between border
                ${active
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-gray-200 text-gray-500 border-gray-300"
                }`}
            >
                <span>{l.name}</span>
            </button>
            );
        })}
      </div>

      <button
        onClick={save}
        className="mt-6 w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition"
      >
        Speichern
      </button>
    </div>
  );
}