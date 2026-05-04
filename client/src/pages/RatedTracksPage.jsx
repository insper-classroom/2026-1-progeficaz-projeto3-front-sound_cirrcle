import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import { getRatedTracks } from "../api/userApi";
import StarRating from "../components/StarRating";

function RatedTracksPage() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getRatedTracks()
      .then((res) => setRatings(res.data.ratings || []))
      .catch(() => setError("Erro ao carregar músicas avaliadas."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at center, #071426 0%, #000 60%)" }}>
      <Navbar />
      <main style={{ padding: "2rem 1rem", maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ margin: "0 0 1.5rem", fontSize: "1.6rem", fontWeight: 800, color: "#e6eef8" }}>
          Minhas Avaliações
        </h2>
        {loading && <p style={{ color: "#92a6bd" }}>Carregando…</p>}
        {error && (
          <div style={{ padding: "0.75rem 1rem", background: "rgba(255,0,0,0.06)", color: "#ff9b9b", borderRadius: "10px", fontSize: "0.85rem" }}>
            {error}
          </div>
        )}
        {!loading && ratings.length === 0 && <p style={{ color: "#92a6bd" }}>Você ainda não avaliou nenhuma música.</p>}

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {ratings.map((r) => {
            const sentiment = r.sentiment_adjustment || 0;
            const displayScore = Math.max(sentiment, Math.min(5.0, r.score + sentiment));
            return (
              <div
                key={r.track_id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem 1.25rem",
                  borderRadius: "16px",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
                  border: "1px solid rgba(255,255,255,0.03)",
                  boxShadow: "0 10px 30px rgba(2,6,23,0.4), inset 0 1px 0 rgba(255,255,255,0.02)",
                }}
              >
                {r.cover_url ? (
                  <img src={r.cover_url} alt={r.track_name} style={{ width: "56px", height: "56px", borderRadius: "10px", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "56px", height: "56px", borderRadius: "10px", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>🎵</div>
                )}
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 700, color: "#e6eef8" }}>{r.track_name}</p>
                  <p style={{ margin: "0.15rem 0 0", color: "#a9d1ff", fontSize: "0.85rem" }}>{r.artist}</p>
                </div>
                <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.3rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <StarRating value={r.score} readOnly />
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fbbf24" }}>
                      {r.score.toFixed(1)}
                    </span>
                    {sentiment !== 0 && (
                      <>
                        <span style={{ fontSize: "0.85rem", color: "#92a6bd" }}>→</span>
                        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#e6eef8" }}>
                          {displayScore.toFixed(1)}
                        </span>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            padding: "0.15rem 0.5rem",
                            borderRadius: "9999px",
                            background: sentiment > 0 ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                            color: sentiment > 0 ? "#7ef3c0" : "#ff9b9b",
                          }}
                        >
                          {sentiment > 0 ? "↑" : "↓"} {Math.abs(sentiment).toFixed(1)}
                        </span>
                      </>
                    )}
                  </div>
                  <p style={{ margin: 0, fontSize: "0.75rem", color: "#92a6bd" }}>
                    {new Date(r.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default RatedTracksPage;
