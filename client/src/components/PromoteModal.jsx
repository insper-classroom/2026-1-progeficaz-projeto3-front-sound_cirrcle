import React, { useState } from "react";
import { promoteTrack } from "../api/feedApi";

function PromoteModal({ track, onClose, onSuccess }) {
  const [form, setForm] = useState({
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await promoteTrack({
        track_id: track.spotify_id,
        cardNumber: form.cardNumber,
        cardHolder: form.cardHolder,
        expiry: form.expiry,
        cvv: form.cvv,
      });
      if (typeof onSuccess === "function") {
        onSuccess();
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || "Erro ao processar pagamento.");
    } finally {
      setLoading(false);
    }
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const modalStyle = {
    background: "#fff",
    borderRadius: "16px",
    padding: "2rem",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    fontSize: "0.95rem",
    marginBottom: "0.75rem",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#475569",
    marginBottom: "0.3rem",
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.2rem", color: "#0f172a" }}>
          🚀 Impulsionar Música
        </h3>
        <p style={{ margin: "0 0 1.25rem", color: "#64748b", fontSize: "0.9rem" }}>
          <strong>{track.name}</strong> — {track.artist}
        </p>

        <div
          style={{
            background: "#eff6ff",
            borderRadius: "10px",
            padding: "0.75rem 1rem",
            marginBottom: "1.25rem",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#475569" }}>Valor</p>
          <p style={{ margin: "0.2rem 0 0", fontSize: "1.4rem", fontWeight: 700, color: "#0f172a" }}>
            U$25.00
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: "0.6rem 0.9rem",
              background: "#fef2f2",
              color: "#b91c1c",
              borderRadius: "8px",
              fontSize: "0.85rem",
              marginBottom: "0.75rem",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Número do cartão</label>
          <input
            name="cardNumber"
            placeholder="0000 0000 0000 0000"
            value={form.cardNumber}
            onChange={handleChange}
            style={inputStyle}
          />

          <label style={labelStyle}>Nome no cartão</label>
          <input
            name="cardHolder"
            placeholder="NOME COMPLETO"
            value={form.cardHolder}
            onChange={handleChange}
            style={inputStyle}
          />

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Validade</label>
              <input
                name="expiry"
                placeholder="MM/AA"
                value={form.expiry}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>CVV</label>
              <input
                name="cvv"
                placeholder="123"
                value={form.cvv}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.85rem",
              background: loading ? "#94a3b8" : "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s ease",
            }}
          >
            {loading ? "Processando…" : "Pagar U$25.00"}
          </button>
        </form>

        <button
          onClick={onClose}
          style={{
            width: "100%",
            marginTop: "0.75rem",
            padding: "0.6rem",
            background: "transparent",
            color: "#64748b",
            border: "none",
            fontSize: "0.85rem",
            cursor: "pointer",
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default PromoteModal;
