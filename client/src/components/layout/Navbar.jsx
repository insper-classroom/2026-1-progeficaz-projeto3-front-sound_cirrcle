import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../common/Logo";

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.2rem 2rem",
        background: "linear-gradient(180deg, rgba(10,22,40,0.9), rgba(5,12,25,0.95))",
        boxShadow: "0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Esquerda - Perfil */}
      <Link
        to="/profile"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          textDecoration: "none",
          color: "#7f98ad",
          fontSize: "0.9rem",
          fontWeight: 500,
          cursor: "pointer",
          transition: "all 0.2s",
          letterSpacing: "0.3px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#a9d1ff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#7f98ad";
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        Perfil
      </Link>

      {/* Centro - Feed/Logo */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          textDecoration: "none",
          color: "#f0f5ff",
          fontSize: "1.25rem",
          fontWeight: 800,
          letterSpacing: "-0.5px",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.color = "#fff")}
        onMouseLeave={(e) => (e.target.style.color = "#f0f5ff")}
      >
        <Logo size={32} color="#fff" />
        Feed
      </Link>

      {/* Direita - Menu */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
            background: "none",
            border: "none",
            color: "#7f98ad",
            fontSize: "0.9rem",
            fontWeight: 500,
            cursor: "pointer",
            padding: "0.5rem 0.75rem",
            transition: "color 0.2s",
            letterSpacing: "0.3px",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#a9d1ff")}
          onMouseLeave={(e) => (e.target.style.color = "#7f98ad")}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
          Menu
        </button>

        {menuOpen && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "100%",
              marginTop: "0.5rem",
              background: "linear-gradient(180deg, rgba(7,20,38,0.95), rgba(0,0,0,0.95))",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              minWidth: "200px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              zIndex: 100,
              overflow: "hidden",
            }}
          >
            {[
              { path: "/avaliadas", label: "Minhas Avaliações" },
              { path: "/amigos", label: "Amigos" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "0.75rem 1.25rem",
                  color: "#a9d1ff",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.background = "rgba(32,107,255,0.1)")}
                onMouseLeave={(e) => (e.target.style.background = "none")}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              style={{
                width: "100%",
                padding: "0.75rem 1.25rem",
                background: "none",
                border: "none",
                color: "#ff9999",
                textDecoration: "none",
                fontSize: "0.9rem",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "rgba(255,100,100,0.1)")}
              onMouseLeave={(e) => (e.target.style.background = "none")}
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
