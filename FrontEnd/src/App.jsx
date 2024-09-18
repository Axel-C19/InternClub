import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";

export default function App() {
  return (
    <Router>
      <Route path="/" element={<LandingPage />} />
    </Router>
  );
}
