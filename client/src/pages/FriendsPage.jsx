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
    background: "rgba(8,12,18,0.5)",
    border: "1px solid rgba(255,255,255,0.03)",
    boxShadow: "0 10px 30px rgba(2,6,23,0.4), inset 0 1px 0 rgba(255,255,255,0.02)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at center, #071426 0%, #000 60%)" }}>
      <Navbar />
      <main style={{ padding: "2rem 1rem", maxWidth: "700px", margin: "0 auto" }}>
        <h2 style={{ margin: "0 0 1.5rem", fontSize: "1.6rem", fontWeight: 800, color: "#e6eef8" }}>
          Amigos
        </h2>
        {error && <div style={{ padding: "0.75rem 1rem", background: "rgba(255,0,0,0.06)", color: "#ff9b9b", borderRadius: "10px", fontSize: "0.85rem", marginBottom: "1rem" }}>{error}</div>}
        {message && <div style={{ padding: "0.75rem 1rem", background: "rgba(16,185,129,0.08)", color: "#7ef3c0", borderRadius: "10px", fontSize: "0.85rem", marginBottom: "1rem" }}>{message}</div>}

        <div style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem", boxShadow: "0 10px 30px rgba(2,6,23,0.4), inset 0 1px 0 rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.03)" }}>
          <label style={{ fontSize: "0.95rem", fontWeight: 600, color: "#92a6bd" }}>Adicionar amigo</label>
          <form onSubmit={handleSendRequest} style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Nome de exibição…"
              style={{ flex: 1, padding: "0.75rem 1rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.04)", outline: "none", background: "rgba(8,12,18,0.6)", fontSize: "0.95rem", color: "#e6eef8" }}
            />
            <button type="submit" style={{ padding: "0.75rem 1.2rem", borderRadius: "12px", border: "none", background: "linear-gradient(90deg,#206bff,#1fc0ff)", color: "#fff", fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 20px rgba(33,96,255,0.18)" }}>
              Enviar
            </button>
          </form>
        </div>

        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#e6eef8", marginBottom: "0.75rem" }}>
          Pendentes ({pending.length})
        </h3>
        {pending.length === 0 && <p style={{ color: "#92a6bd", fontSize: "0.9rem" }}>Nenhuma solicitação pendente.</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem" }}>
          {pending.map((req) => (
            <div key={req.request_id} style={cardStyle}>
              <span style={{ fontWeight: 600, color: "#e6eef8" }}>{req.from_display_name}</span>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={() => handleRespond(req.request_id, "accept")} style={{ padding: "0.4rem 1rem", borderRadius: "9999px", border: "none", background: "linear-gradient(90deg,#10b981,#34d399)", color: "#fff", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer" }}>Aceitar</button>
                <button onClick={() => handleRespond(req.request_id, "reject")} style={{ padding: "0.4rem 1rem", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.04)", background: "rgba(255,255,255,0.02)", color: "#92a6bd", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>Recusar</button>
              </div>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#e6eef8", marginBottom: "0.75rem" }}>
          Meus Amigos ({friends.length})
        </h3>
        {loading && <p style={{ color: "#92a6bd" }}>Carregando…</p>}
        {friends.length === 0 && <p style={{ color: "#92a6bd", fontSize: "0.9rem" }}>Você ainda não tem amigos.</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          {friends.map((f) => (
            <div key={f.id} style={cardStyle}>
              <div>
                <p style={{ margin: 0, fontWeight: 700, color: "#e6eef8" }}>{f.display_name}</p>
                <p style={{ margin: "0.15rem 0 0", fontSize: "0.8rem", color: "#92a6bd" }}>{f.email}</p>
              </div>
              <a href={`/amigos/${f.id}/avaliacoes`} style={{ padding: "0.4rem 1rem", borderRadius: "9999px", background: "rgba(255,255,255,0.03)", textDecoration: "none", color: "#a9d1ff", fontSize: "0.85rem", fontWeight: 700 }}>
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
