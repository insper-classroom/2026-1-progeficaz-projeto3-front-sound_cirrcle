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
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <Navbar />
      <main style={{ padding: "2rem 1rem", maxWidth: "500px", margin: "0 auto" }}>
        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "2rem",
            boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
          }}
        >
          <h2 style={{ margin: "0 0 1.5rem", fontSize: "1.4rem", fontWeight: 700, color: "#0f172a" }}>
            Meu Perfil
          </h2>

          {loading && <p style={{ color: "#94a3b8" }}>Carregando…</p>}
          {error && (
            <div style={{ padding: "0.75rem 1rem", background: "#fef2f2", color: "#b91c1c", borderRadius: "10px", fontSize: "0.85rem", marginBottom: "1rem" }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ padding: "0.75rem 1rem", background: "#dcfce7", color: "#15803d", borderRadius: "10px", fontSize: "0.85rem", marginBottom: "1rem" }}>
              {success}
            </div>
          )}

          {user && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ padding: "0.75rem 1rem", background: "#f8fafc", borderRadius: "12px" }}>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#94a3b8", fontWeight: 500 }}>E-mail</p>
                <p style={{ margin: "0.2rem 0 0", fontSize: "1rem", color: "#0f172a" }}>{user.email}</p>
              </div>
              <div style={{ padding: "0.75rem 1rem", background: "#f8fafc", borderRadius: "12px" }}>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#94a3b8", fontWeight: 500 }}>Nome de exibição</p>
                <p style={{ margin: "0.2rem 0 0", fontSize: "1rem", color: "#0f172a" }}>{user.display_name}</p>
              </div>
              <div style={{ padding: "0.75rem 1rem", background: "#f8fafc", borderRadius: "12px" }}>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#94a3b8", fontWeight: 500 }}>Membro desde</p>
                <p style={{ margin: "0.2rem 0 0", fontSize: "1rem", color: "#0f172a" }}>
                  {user.created_at ? new Date(user.created_at).toLocaleDateString() : "-"}
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.35rem", fontSize: "0.85rem", fontWeight: 500, color: "#334155" }}>
                  Alterar nome de exibição
                </label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    style={{
                      flex: 1,
                      padding: "0.7rem 1rem",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      fontSize: "0.95rem",
                      outline: "none",
                      background: "#f8fafc",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#10b981")}
                    onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: "0.7rem 1.2rem",
                      borderRadius: "12px",
                      border: "none",
                      background: "#0f172a",
                      color: "#fff",
                      fontWeight: 600,
                      cursor: "pointer",
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
