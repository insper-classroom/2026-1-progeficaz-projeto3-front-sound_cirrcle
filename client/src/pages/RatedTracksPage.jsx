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
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <Navbar />
      <main style={{ padding: "2rem 1rem", maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ margin: "0 0 1.5rem", fontSize: "1.4rem", fontWeight: 700, color: "#0f172a" }}>
          Minhas Avaliações
        </h2>
        {loading && <p style={{ color: "#94a3b8" }}>Carregando…</p>}
        {error && (
          <div style={{ padding: "0.75rem 1rem", background: "#fef2f2", color: "#b91c1c", borderRadius: "10px", fontSize: "0.85rem" }}>
            {error}
          </div>
        )}
        {!loading && ratings.length === 0 && <p style={{ color: "#94a3b8" }}>Você ainda não avaliou nenhuma música.</p>}

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
                  background: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                {r.cover_url ? (
                  <img src={r.cover_url} alt={r.track_name} style={{ width: "56px", height: "56px", borderRadius: "10px", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "56px", height: "56px", borderRadius: "10px", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>🎵</div>
                )}
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 600, color: "#0f172a" }}>{r.track_name}</p>
                  <p style={{ margin: "0.15rem 0 0", color: "#64748b", fontSize: "0.85rem" }}>{r.artist}</p>
                </div>
                <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.3rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <StarRating value={r.score} readOnly />
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#475569" }}>
                      {r.score.toFixed(1)}
                    </span>
                    {sentiment !== 0 && (
                      <>
                        <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>→</span>
                        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#0f172a" }}>
                          {displayScore.toFixed(1)}
                        </span>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            padding: "0.15rem 0.5rem",
                            borderRadius: "9999px",
                            background: sentiment > 0 ? "#dcfce7" : "#fee2e2",
                            color: sentiment > 0 ? "#15803d" : "#b91c1c",
                          }}
                        >
                          {sentiment > 0 ? "↑" : "↓"} {Math.abs(sentiment).toFixed(1)}
                        </span>
                      </>
                    )}
                  </div>
                  <p style={{ margin: 0, fontSize: "0.75rem", color: "#94a3b8" }}>
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
