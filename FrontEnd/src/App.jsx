import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/Login";
import SignUpPage from "./Pages/Signup";
import MainPage from "./Pages/MainPage";
import ProtectedRoute from "./Components/protectedRoute";
import Calendar from "./Pages/Calendary";
import Leetcode from "./Pages/Leetcode";
import Profile from "./Pages/Profile";
import Challenge from "./Pages/Challenge";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/challenge"
          element={
            <ProtectedRoute>
              <Challenge />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendary"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leetcode"
          element={
            <ProtectedRoute>
              <Leetcode />
            </ProtectedRoute>
          }
        />
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
