import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import { getFriends, getPendingRequests, sendFriendRequest, respondRequest } from "../api/friendsApi";

function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const [pending, setPending] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [fRes, pRes] = await Promise.all([getFriends(), getPendingRequests()]);
      setFriends(fRes.data.friends || []);
      setPending(pRes.data.requests || []);
    } catch {
      setError("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSendRequest = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await sendFriendRequest(searchName);
      setMessage("Solicitação enviada!");
      setSearchName("");
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao enviar solicitação.");
    }
  };

  const handleRespond = async (requestId, action) => {
    try {
      await respondRequest(requestId, action);
      loadData();
    } catch {
      setError("Erro ao responder solicitação.");
    }
  };

  const cardStyle = {
    padding: "1rem 1.25rem",
    borderRadius: "14px",
    background: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <Navbar />
      <main style={{ padding: "2rem 1rem", maxWidth: "700px", margin: "0 auto" }}>
        <h2 style={{ margin: "0 0 1.5rem", fontSize: "1.4rem", fontWeight: 700, color: "#0f172a" }}>
          Amigos
        </h2>
        {error && <div style={{ padding: "0.75rem 1rem", background: "#fef2f2", color: "#b91c1c", borderRadius: "10px", fontSize: "0.85rem", marginBottom: "1rem" }}>{error}</div>}
        {message && <div style={{ padding: "0.75rem 1rem", background: "#dcfce7", color: "#15803d", borderRadius: "10px", fontSize: "0.85rem", marginBottom: "1rem" }}>{message}</div>}

        <div style={{ background: "#fff", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <label style={{ fontSize: "0.9rem", fontWeight: 500, color: "#334155" }}>Adicionar amigo</label>
          <form onSubmit={handleSendRequest} style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Nome de exibição…"
              style={{ flex: 1, padding: "0.7rem 1rem", borderRadius: "12px", border: "1px solid #e2e8f0", outline: "none", background: "#f8fafc", fontSize: "0.9rem" }}
            />
            <button type="submit" style={{ padding: "0.7rem 1.2rem", borderRadius: "12px", border: "none", background: "#0f172a", color: "#fff", fontWeight: 600, cursor: "pointer" }}>
              Enviar
            </button>
          </form>
        </div>

        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#0f172a", marginBottom: "0.75rem" }}>
          Pendentes ({pending.length})
        </h3>
        {pending.length === 0 && <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Nenhuma solicitação pendente.</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem" }}>
          {pending.map((req) => (
            <div key={req.request_id} style={cardStyle}>
              <span style={{ fontWeight: 500, color: "#334155" }}>{req.from_display_name}</span>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={() => handleRespond(req.request_id, "accept")} style={{ padding: "0.4rem 1rem", borderRadius: "9999px", border: "none", background: "#10b981", color: "#fff", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>Aceitar</button>
                <button onClick={() => handleRespond(req.request_id, "reject")} style={{ padding: "0.4rem 1rem", borderRadius: "9999px", border: "1px solid #e2e8f0", background: "#fff", color: "#64748b", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer" }}>Recusar</button>
              </div>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#0f172a", marginBottom: "0.75rem" }}>
          Meus Amigos ({friends.length})
        </h3>
        {loading && <p style={{ color: "#94a3b8" }}>Carregando…</p>}
        {friends.length === 0 && <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Você ainda não tem amigos.</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {friends.map((f) => (
            <div key={f.id} style={cardStyle}>
              <div>
                <p style={{ margin: 0, fontWeight: 600, color: "#0f172a" }}>{f.display_name}</p>
                <p style={{ margin: "0.15rem 0 0", fontSize: "0.8rem", color: "#94a3b8" }}>{f.email}</p>
              </div>
              <a href={`/amigos/${f.id}/avaliacoes`} style={{ padding: "0.4rem 1rem", borderRadius: "9999px", background: "#f1f5f9", textDecoration: "none", color: "#475569", fontSize: "0.8rem", fontWeight: 500 }}>
                Ver avaliações
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default FriendsPage;
