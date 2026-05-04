import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import { getDailyFeed } from "../api/feedApi";
import FeedView from "../components/FeedView";

const SORT_OPTIONS = [
  { value: "", label: "Ordem original" },
  { value: "best", label: "⭐ Melhores avaliações" },
  { value: "worst", label: "💔 Piores avaliações" },
  { value: "trending_day", label: "🔥 Hoje" },
  { value: "trending_3days", label: "🔥 3 dias" },
  { value: "trending_7days", label: "🔥 7 dias" },
];

const PERIOD_OPTIONS = [
  { value: "daily", label: "📅 Diário" },
  { value: "weekly", label: "📆 Semanal" },
  { value: "monthly", label: "🗓️ Mensal" },
];

function Feed() {
  const [feedData, setFeedData] = useState(null);
  const [sort, setSort] = useState("");
  const [period, setPeriod] = useState("daily");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const loadFeed = (selectedSort, selectedPeriod) => {
    setLoading(true);
    setError("");
    getDailyFeed(selectedSort, selectedPeriod)
      .then((res) => {
        setFeedData(res.data);
      })
      .catch((err) => {
        console.error(err);
        if (!err.response) {
          setError("Não foi possível carregar o feed. Verifique se o backend está rodando.");
        } else {
          setError("Erro ao carregar o feed.");
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadFeed(sort, period);
  }, [sort, period]);

  const selectStyle = {
    padding: "0.75rem 1rem",
    borderRadius: "14px",
    border: "1px solid rgba(180, 205, 255, 0.14)",
    background: "linear-gradient(180deg, rgba(10,18,32,0.72), rgba(8,12,18,0.58))",
    fontSize: "0.95rem",
    color: "#e6eef8",
    outline: "none",
    cursor: "pointer",
    minWidth: "170px",
    flex: "0 0 auto",
    fontWeight: 500,
    boxShadow: "0 10px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.04)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  };

  const inputStyle = {
    padding: "0.75rem 1rem",
    borderRadius: "14px",
    border: "1px solid rgba(180, 205, 255, 0.14)",
    background: "linear-gradient(180deg, rgba(10,18,32,0.72), rgba(8,12,18,0.58))",
    fontSize: "0.95rem",
    color: "#e6eef8",
    outline: "none",
    flex: 1,
    minWidth: "240px",
    boxShadow: "0 10px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.04)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  };

  const filteredData = React.useMemo(() => {
    if (!feedData || !feedData.tracks) return feedData;

    const uniqueTracks = feedData.tracks.filter((track, index, array) => {
      const trackId = track.spotify_id || `${track.name}-${track.artist}`;
      return array.findIndex((item) => {
        const itemId = item.spotify_id || `${item.name}-${item.artist}`;
        return itemId === trackId;
      }) === index;
    });

    if (!searchQuery.trim()) {
      return { ...feedData, tracks: uniqueTracks };
    }

    const query = searchQuery.trim().toLowerCase();
    const filteredTracks = uniqueTracks.filter((track) =>
      track.name.toLowerCase().startsWith(query)
    );
    return { ...feedData, tracks: filteredTracks };
  }, [feedData, searchQuery]);

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at center, #071426 0%, #000 60%)" }}>
      <Navbar />
      <main style={{ padding: "2rem 1rem", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="🔍 Pesquisar música..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              ...inputStyle,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(63, 132, 255, 0.8)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(33,96,255,0.18), 0 10px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.04)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(180, 205, 255, 0.14)";
              e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.04)";
            }}
          />
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            style={{ ...selectStyle }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(63, 132, 255, 0.8)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(33,96,255,0.18), 0 10px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.04)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(180, 205, 255, 0.14)";
              e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.04)";
            }}
          >
            {PERIOD_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{ ...selectStyle }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(63, 132, 255, 0.8)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(33,96,255,0.18), 0 10px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.04)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(180, 205, 255, 0.14)";
              e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.04)";
            }}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "4rem", color: "#92a6bd" }}>
            <p>Carregando feed…</p>
          </div>
        )}
        {error && (
          <div
            style={{
              padding: "1rem",
              background: "#fef2f2",
              color: "#b91c1c",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}
        {!loading && !error && (
          <>
            {searchQuery.trim() && filteredData.tracks.length === 0 && (
              <div style={{ textAlign: "center", padding: "2rem", color: "#92a6bd" }}>
                <p>Nenhuma música encontrada para "{searchQuery}".</p>
              </div>
            )}
            <FeedView data={filteredData} />
          </>
        )}
      </main>
    </div>
  );
}

export default Feed;
