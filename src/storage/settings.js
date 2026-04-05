export const ALL_LEAGUES = [
  { code: "WC", name: "FIFA World Cup" },
  { code: "EC", name: "UEFA European Championship" },
  { code: "CL", name: "UEFA Champions League" },
  { code: "BL1", name: "Bundesliga" },
  { code: "PL", name: "Premier League" },
  { code: "PD", name: "La Liga" },
  { code: "FL1", name: "Ligue 1" },
  { code: "SA", name: "Serie A" },
  { code: "PPL", name: "Primeira Liga" },
  { code: "DED", name: "Eredivisie" },
  { code: "BSA", name: "Campeonato Brasileiro Série A" },
  //{ code: "ELC", name: "EFL Championship" },
];

const KEY = "baller_selected_leagues";

export function loadSelectedLeagues() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return ["WC", "CL", "BL1", "PL"]; // default
  return JSON.parse(raw);
}

export function saveSelectedLeagues(codes) {
  localStorage.setItem(KEY, JSON.stringify(codes));
}