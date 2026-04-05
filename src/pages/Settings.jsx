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
    <div style={{ padding: 20 }}>
      <Link to="/">⬅ Zurück</Link>
      <h1>Einstellungen</h1>

      <p>Welche Ligen möchtest du sehen?</p>

      <div style={{ display: "grid", gap: 10 }}>
        {ALL_LEAGUES.map(l => (
          <label key={l.code} style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={selected.includes(l.code)}
              onChange={() => toggle(l.code)}
            />
            {l.name}
          </label>
        ))}
      </div>

      <button
        onClick={save}
        style={{
          marginTop: 20,
          padding: "10px 14px",
          borderRadius: 10,
          border: "none",
          background: "black",
          color: "white"
        }}
      >
        Speichern
      </button>
    </div>
  );
}