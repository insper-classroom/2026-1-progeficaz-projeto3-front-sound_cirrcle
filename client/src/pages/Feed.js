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
    padding: "0.6rem 1rem",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    background: "#fff",
    fontSize: "0.9rem",
    color: "#334155",
    outline: "none",
    cursor: "pointer",
  };

  const inputStyle = {
    padding: "0.6rem 1rem",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    background: "#fff",
    fontSize: "0.9rem",
    color: "#334155",
    outline: "none",
    flex: 1,
    minWidth: "200px",
  };

  const filteredData = React.useMemo(() => {
    if (!feedData || !feedData.tracks) return feedData;
    if (!searchQuery.trim()) return feedData;
    const query = searchQuery.trim().toLowerCase();
    const filteredTracks = feedData.tracks.filter((track) =>
      track.name.toLowerCase().startsWith(query)
    );
    return { ...feedData, tracks: filteredTracks };
  }, [feedData, searchQuery]);

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <Navbar />
      <main style={{ padding: "2rem 1rem", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="🔍 Pesquisar música..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={inputStyle}
          />
          <select value={period} onChange={(e) => setPeriod(e.target.value)} style={selectStyle}>
            {PERIOD_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={selectStyle}>
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "4rem", color: "#94a3b8" }}>
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
              <div style={{ textAlign: "center", padding: "2rem", color: "#94a3b8" }}>
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
