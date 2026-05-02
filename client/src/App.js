import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Feed from "./pages/Feed";
import ProfilePage from "./pages/ProfilePage";
import RatedTracksPage from "./pages/RatedTracksPage";
import FriendsPage from "./pages/FriendsPage";
import FriendFeedPage from "./pages/FriendFeedPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/avaliadas"
            element={
              <ProtectedRoute>
                <RatedTracksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/amigos"
            element={
              <ProtectedRoute>
                <FriendsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/amigos/:friendId/avaliacoes"
            element={
              <ProtectedRoute>
                <FriendFeedPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
