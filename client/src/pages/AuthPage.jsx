import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/common/Logo";

function AuthPage() {
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
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

  const handleRegister = async (e) => {
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

  const switchTab = (tab) => {
    setActiveTab(tab);
    setEmail("");
    setPassword("");
    setDisplayName("");
    setError("");
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

        {/* Abas */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
          <button
            onClick={() => switchTab("login")}
            style={{
              flex: 1,
              padding: "0.75rem 1rem",
              borderRadius: "12px",
              border: "none",
              background: activeTab === "login" ? "linear-gradient(90deg,#206bff,#1fc0ff)" : "rgba(255,255,255,0.05)",
              color: "#fff",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Login
          </button>
          <button
            onClick={() => switchTab("register")}
            style={{
              flex: 1,
              padding: "0.75rem 1rem",
              borderRadius: "12px",
              border: "none",
              background: activeTab === "register" ? "linear-gradient(90deg,#206bff,#1fc0ff)" : "rgba(255,255,255,0.05)",
              color: "#fff",
              fontSize: "0.95rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Cadastro
          </button>
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

        {/* Formulário de Login */}
        {activeTab === "login" && (
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.35rem", fontSize: "0.85rem", fontWeight: 500, color: "#9fb0c6" }}>
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
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
                  transition: "border-color 0.2s",
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
                placeholder="••••••••"
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
                  transition: "border-color 0.2s",
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
              {loading ? "Entrando…" : "Entrar"}
            </button>
          </form>
        )}

        {/* Formulário de Cadastro */}
        {activeTab === "register" && (
          <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.35rem", fontSize: "0.85rem", fontWeight: 500, color: "#9fb0c6" }}>
                Nome de exibição
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                placeholder="Seu Nome"
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
                  transition: "border-color 0.2s",
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
                placeholder="seu@email.com"
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
                  transition: "border-color 0.2s",
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
                placeholder="••••••••"
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
                  transition: "border-color 0.2s",
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
              {loading ? "Cadastrando…" : "Criar Conta"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
