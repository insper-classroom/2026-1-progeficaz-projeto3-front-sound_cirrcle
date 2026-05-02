import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/common/Logo";

function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      if (!err.response) {
        setError("Não foi possível conectar ao servidor. Verifique se o backend está rodando.");
      } else {
        setError(err.response?.data?.error || "Erro ao fazer login.");
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
        background: "#f8fafc",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "2.5rem",
          borderRadius: "20px",
          background: "#fff",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <Logo size={56} />
          <h1
            style={{
              margin: "0.75rem 0 0",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#0f172a",
              letterSpacing: "-0.02em",
            }}
          >
            SoundCircle
          </h1>
          <p style={{ margin: "0.4rem 0 0", color: "#94a3b8", fontSize: "0.95rem" }}>
            Entre na sua conta
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
            <label
              style={{
                display: "block",
                marginBottom: "0.35rem",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "#334155",
              }}
            >
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
                border: "1px solid #e2e8f0",
                fontSize: "0.95rem",
                outline: "none",
                background: "#f8fafc",
                transition: "border-color 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#10b981")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.35rem",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "#334155",
              }}
            >
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
                border: "1px solid #e2e8f0",
                fontSize: "0.95rem",
                outline: "none",
                background: "#f8fafc",
                transition: "border-color 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#10b981")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
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
              background: "#0f172a",
              color: "#fff",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "background 0.2s",
            }}
          >
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "0.9rem", color: "#64748b" }}>
          Não tem conta?{" "}
          <Link to="/register" style={{ color: "#10b981", textDecoration: "none", fontWeight: 600 }}>
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
