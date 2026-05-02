import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../common/Logo";

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.75rem 2rem",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          textDecoration: "none",
          color: "#0f172a",
        }}
      >
        <Logo size={36} />
        <span style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
          SoundCircle
        </span>
      </Link>

      <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
        {[
          { path: "/", label: "Feed" },
          { path: "/profile", label: "Perfil" },
          { path: "/avaliadas", label: "Avaliadas" },
          { path: "/amigos", label: "Amigos" },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "9999px",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: isActive(item.path) ? "#fff" : "#475569",
              background: isActive(item.path) ? "#0f172a" : "transparent",
              transition: "all 0.2s ease",
            }}
          >
            {item.label}
          </Link>
        ))}

        <span
          style={{
            marginLeft: "1rem",
            paddingLeft: "1rem",
            borderLeft: "1px solid #e2e8f0",
            fontSize: "0.85rem",
            color: "#64748b",
          }}
        >
          {user?.display_name || user?.email}
        </span>

        <button
          onClick={logout}
          style={{
            marginLeft: "1rem",
            padding: "0.45rem 1.1rem",
            fontSize: "0.85rem",
            fontWeight: 500,
            cursor: "pointer",
            background: "#fff",
            color: "#ef4444",
            border: "1px solid #fecaca",
            borderRadius: "9999px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#fef2f2";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#fff";
          }}
        >
          Sair
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
