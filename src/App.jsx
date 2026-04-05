import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import League from "./pages/League";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/league/:code" element={<League />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}