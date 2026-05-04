import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/common/Logo";

function RegisterPage() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(email, password, displayName);
    } catch (err) {
      if (!err.response) {
        setError("Não foi possível conectar ao servidor. Verifique se o backend está rodando.");
      } else {
        setError(err.response?.data?.error || "Erro ao cadastrar.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at center, #071426 0%, #000 60%)",
        padding: "1rem",
        color: "#e6eef8",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "2.25rem",
          borderRadius: "14px",
          background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
          boxShadow: "0 10px 30px rgba(2,6,23,0.7), inset 0 1px 0 rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.02)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 72, height: 72, borderRadius: 14, background: "linear-gradient(180deg,#2b6bff,#1062ff)", boxShadow: "0 8px 30px rgba(16,98,255,0.25), 0 2px 8px rgba(0,0,0,0.6)" }}>
            <Logo size={40} color="#fff" />
          </div>
          <h1
            style={{
              margin: "0.75rem 0 0",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "#e6eef8",
              letterSpacing: "-0.02em",
            }}
          >
            Sound Circle
          </h1>
          <p style={{ margin: "0.35rem 0 0", color: "#92a6bd", fontSize: "0.95rem" }}>
            Avalie e compartilhe suas músicas favoritas
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: "0.75rem 1rem",
              background: "#fef2f2",
              color: "#b91c1c",
              borderRadius: "10px",
              fontSize: "0.85rem",
              marginBottom: "1rem",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.35rem", fontSize: "0.85rem", fontWeight: 500, color: "#9fb0c6" }}>
              Nome de exibição
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.7rem 1rem",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.04)",
                fontSize: "0.95rem",
                outline: "none",
                background: "rgba(8,12,18,0.6)",
                color: "#fff",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(43,107,255,0.9)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.04)")}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.35rem", fontSize: "0.85rem", fontWeight: 500, color: "#9fb0c6" }}>
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.7rem 1rem",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.04)",
                fontSize: "0.95rem",
                outline: "none",
                background: "rgba(8,12,18,0.6)",
                color: "#fff",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(43,107,255,0.9)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.04)")}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.35rem", fontSize: "0.85rem", fontWeight: 500, color: "#9fb0c6" }}>
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.7rem 1rem",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.04)",
                fontSize: "0.95rem",
                outline: "none",
                background: "rgba(8,12,18,0.6)",
                color: "#fff",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(43,107,255,0.9)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.04)")}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.85rem",
              marginTop: "0.5rem",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(90deg,#206bff,#1fc0ff)",
              color: "#fff",
              fontSize: "0.95rem",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              boxShadow: "0 10px 30px rgba(33,96,255,0.25), inset 0 -6px 18px rgba(0,0,0,0.15)",
            }}
          >
            {loading ? "Cadastrando…" : "Entrar"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "0.9rem", color: "#7f98ad" }}>
          Já tem conta?{" "}
          <Link to="/login" style={{ color: "#a9d1ff", textDecoration: "none", fontWeight: 600 }}>
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
