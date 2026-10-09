import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import VendorDashboard from "./pages/VendorDashboard";
import "./App.css";

function isAuthenticated(role) {
  if (!sessionStorage.getItem("marketgrid_session")) return false;
  return (sessionStorage.getItem("marketgrid_role") || "user") === role;
}

function ProtectedRoute({ children, role }) {
  return isAuthenticated(role) ? children : <Navigate to={role === "vendor" ? "/login/vendor" : "/login/user"} replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login/user" replace />} />
        <Route
          path="/login"
          element={
            <Navigate to="/login/user" replace />
          }
        />
        <Route
          path="/register"
          element={
            <Navigate to="/register/user" replace />
          }
        />
        <Route
          path="/login/user"
          element={
            isAuthenticated("user") ? <Navigate to="/dashboard" replace /> : <Login mode="login" role="user" />
          }
        />
        <Route
          path="/register/user"
          element={
            isAuthenticated("user") ? <Navigate to="/dashboard" replace /> : <Login mode="register" role="user" />
          }
        />
        <Route
          path="/login/vendor"
          element={
            isAuthenticated("vendor") ? <Navigate to="/vendor-dashboard" replace /> : <Login mode="login" role="vendor" />
          }
        />
        <Route
          path="/register/vendor"
          element={
            isAuthenticated("vendor") ? <Navigate to="/vendor-dashboard" replace /> : <Login mode="register" role="vendor" />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="user">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor-dashboard"
          element={
            <ProtectedRoute role="vendor">
              <VendorDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login/user" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;