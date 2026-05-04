import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import { getProfile, updateDisplayName } from "../api/userApi";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then((res) => {
        setUser(res.data);
        setNewName(res.data.display_name || "");
      })
      .catch(() => setError("Erro ao carregar perfil."))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await updateDisplayName(newName);
      setUser(res.data);
      setSuccess("Nome atualizado com sucesso!");
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao atualizar nome.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at center, #071426 0%, #000 60%)" }}>
      <Navbar />
      <main style={{ padding: "2rem 1rem", maxWidth: "700px", margin: "0 auto" }}>
        <div
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
            borderRadius: "20px",
            padding: "2rem",
            boxShadow: "0 10px 40px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.03)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ width: 56, height: 56, borderRadius: 12, background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.35rem", color: "#e6eef8" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e6eef8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <h2 style={{ margin: 0, fontSize: "1.6rem", fontWeight: 800, color: "#e6eef8" }}>Meu Perfil</h2>
          </div>

          {loading && <p style={{ color: "#92a6bd" }}>Carregando…</p>}
          {error && (
            <div style={{ padding: "0.75rem 1rem", background: "rgba(255,0,0,0.06)", color: "#ff9b9b", borderRadius: "10px", fontSize: "0.85rem", marginBottom: "1rem" }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ padding: "0.75rem 1rem", background: "rgba(16,185,129,0.08)", color: "#7ef3c0", borderRadius: "10px", fontSize: "0.85rem", marginBottom: "1rem" }}>
              {success}
            </div>
          )}

          {user && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ padding: "0.75rem 1rem", background: "rgba(8,12,18,0.5)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.03)" }}>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#92a6bd", fontWeight: 500 }}>E-mail</p>
                <p style={{ margin: "0.2rem 0 0", fontSize: "1rem", color: "#e6eef8" }}>{user.email}</p>
              </div>
              <div style={{ padding: "0.75rem 1rem", background: "rgba(8,12,18,0.5)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.03)" }}>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#92a6bd", fontWeight: 500 }}>Nome de exibição</p>
                <p style={{ margin: "0.2rem 0 0", fontSize: "1rem", color: "#e6eef8" }}>{user.display_name}</p>
              </div>
              <div style={{ padding: "0.75rem 1rem", background: "rgba(8,12,18,0.5)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.03)" }}>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#92a6bd", fontWeight: 500 }}>Membro desde</p>
                <p style={{ margin: "0.2rem 0 0", fontSize: "1rem", color: "#e6eef8" }}>
                  {user.created_at ? new Date(user.created_at).toLocaleDateString() : "-"}
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.35rem", fontSize: "0.85rem", fontWeight: 600, color: "#92a6bd" }}>
                  Alterar nome de exibição
                </label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    style={{
                      flex: 1,
                      padding: "0.75rem 1rem",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.04)",
                      fontSize: "0.95rem",
                      outline: "none",
                      background: "rgba(8,12,18,0.6)",
                      color: "#e6eef8",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(43,107,255,0.9)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.04)")}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: "0.75rem 1.2rem",
                      borderRadius: "12px",
                      border: "none",
                      background: "linear-gradient(90deg,#206bff,#1fc0ff)",
                      color: "#fff",
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: "0 8px 20px rgba(33,96,255,0.18)",
                    }}
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
