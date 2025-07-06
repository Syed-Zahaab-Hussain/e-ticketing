import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import PassengerDetailsPage from "./pages/PassengerDetailsPage";
import AdminDashboard from "./pages/AdminDashboard";
import BusOperatorDashboard from "./pages/BusOperatorDashboard";
import PassengerDashboard from "./pages/PassengerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          <Route path="/book/:tripId/seats" element={<SeatSelectionPage />} />
          <Route path="/book/passenger-details" element={<PassengerDetailsPage />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/operator/dashboard"
            element={
              <ProtectedRoute allowedRoles={["BUS_OPERATOR"]}>
                <BusOperatorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/passenger/dashboard"
            element={
              <ProtectedRoute allowedRoles={["PASSENGER"]}>
                <PassengerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Generic dashboard route that redirects based on role */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>Redirecting...</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;