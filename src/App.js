import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import SidePanel from "./Components/SIdePanel";
import SideNav from "./Components/SIdePanel";
import Dashboard from "./Components/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
const isAuthenticated = !!localStorage.getItem("token");

function App() {

  return (
    <>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
               <SideNav role="admin" />
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/*" // Catch-all route for the root URL '/'
          element={
            localStorage.getItem("token") ? (
              <>
              <SideNav role="admin" />
              <Navigate to="/dashboard" />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
