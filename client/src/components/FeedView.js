import React from "react";
import MusicCard from "./MusicCard";

const PERIOD_TITLES = {
  daily: "Feed Diário",
  weekly: "Feed Semanal",
  monthly: "Feed Mensal",
};

function FeedView({ data }) {
  if (!data || !data.tracks || data.tracks.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#94a3b8" }}>
        <p style={{ fontSize: "1.1rem" }}>Nenhuma música disponível no feed.</p>
      </div>
    );
  }

  const { tracks, period } = data;
  const title = PERIOD_TITLES[period] || "Feed";

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "#0f172a",
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {tracks.map((track, index) => (
          <MusicCard key={track.spotify_id || index} track={track} index={index} />
        ))}
      </div>
    </div>
  );
}

export default FeedView;
