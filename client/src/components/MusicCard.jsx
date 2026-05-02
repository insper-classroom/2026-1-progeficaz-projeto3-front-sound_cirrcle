import React, { useState } from "react";
import StarRating from "./StarRating";
import PromoteModal from "./PromoteModal";
import { rateTrack, deleteRating, getComments, postComment } from "../api/feedApi";

function MusicCard({ track, index }) {
  const [userScore, setUserScore] = useState(track.user_score || 0);
  const [avgRating, setAvgRating] = useState(track.average_rating || 0);
  const [ratingCount, setRatingCount] = useState(track.rating_count || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPromote, setShowPromote] = useState(false);

  const isPromoted = track.is_promoted === true;

  const handleRate = async (score) => {
    setSaving(true);
    try {
      if (score === 0) {
        await deleteRating(track.spotify_id);
        setUserScore(0);
        if (ratingCount > 1) {
          const newAvg = (avgRating * ratingCount - avgRating) / (ratingCount - 1);
          setAvgRating(Math.round(newAvg * 10) / 10);
          setRatingCount(ratingCount - 1);
        } else {
          setAvgRating(0);
          setRatingCount(0);
        }
      } else {
        await rateTrack({ track_id: track.spotify_id, score });
        setUserScore(score);
        if (ratingCount === 0) {
          setAvgRating(score);
          setRatingCount(1);
        } else {
          const oldUserScore = userScore || 0;
          if (oldUserScore > 0 && ratingCount > 0) {
            const newAvg = (avgRating * ratingCount - oldUserScore + score) / ratingCount;
            setAvgRating(Math.round(newAvg * 10) / 10);
          } else {
            const newAvg = (avgRating * ratingCount + score) / (ratingCount + 1);
            setAvgRating(Math.round(newAvg * 10) / 10);
            setRatingCount(ratingCount + 1);
          }
        }
      }
    } catch {
      alert("Erro ao salvar avaliação.");
    } finally {
      setSaving(false);
    }
  };

  const loadComments = async () => {
    if (comments.length > 0) {
      setShowComments(!showComments);
      return;
    }
    setLoadingComments(true);
    try {
      const res = await getComments(track.spotify_id);
      setComments(res.data.comments || []);
      setShowComments(true);
    } catch {
      alert("Erro ao carregar comentários.");
    } finally {
      setLoadingComments(false);
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      await postComment({ track_id: track.spotify_id, text: newComment });
      setNewComment("");
      const res = await getComments(track.spotify_id);
      setComments(res.data.comments || []);
    } catch {
      alert("Erro ao enviar comentário.");
    }
  };

  const sentiment = track.sentiment_adjustment || 0;
  const displayRating = Math.max(sentiment, Math.min(5.0, avgRating + sentiment));

  const cardBg = isPromoted ? "#eff6ff" : "#fff";
  const cardBorder = isPromoted ? "1px solid #bfdbfe" : "1px solid #f1f5f9";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        padding: "1.25rem",
        borderRadius: "16px",
        background: cardBg,
        border: cardBorder,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
        transition: "box-shadow 0.2s ease",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 4px 12px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)";
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        <span
          style={{
            fontWeight: 700,
            fontSize: "0.85rem",
            color: "#cbd5e1",
            minWidth: "1.5rem",
            textAlign: "center",
            marginTop: "0.2rem",
          }}
        >
          {index + 1}
        </span>

        {track.cover_url ? (
          <img
            src={track.cover_url}
            alt={track.name}
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "12px",
              objectFit: "cover",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          />
        ) : (
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "12px",
              background: "#f1f5f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
            }}
          >
            🎵
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <p
              style={{
                margin: 0,
                fontWeight: 600,
                fontSize: "1.05rem",
                color: "#0f172a",
                lineHeight: 1.3,
              }}
            >
              {isPromoted && <span style={{ marginRight: "0.3rem" }}>🚀</span>}
              {track.name}
            </p>
            {isPromoted && (
              <span
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  padding: "0.15rem 0.5rem",
                  borderRadius: "9999px",
                  background: "#2563eb",
                  color: "#fff",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {track.promotion_label || "Anúncio"}
              </span>
            )}
          </div>
          <p style={{ margin: "0.2rem 0 0", color: "#64748b", fontSize: "0.9rem" }}>
            {track.artist}
          </p>
          {track.album && (
            <p style={{ margin: "0.15rem 0 0", color: "#94a3b8", fontSize: "0.8rem" }}>
              {track.album}
            </p>
          )}

          <div
            style={{
              marginTop: "0.6rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            {ratingCount > 0 ? (
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <StarRating value={displayRating} readOnly />
                <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}>
                  {displayRating.toFixed(1)}
                </span>
              </div>
            ) : sentiment !== 0 ? (
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <StarRating value={sentiment} readOnly />
                <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}>
                  {sentiment.toFixed(1)}
                </span>
              </div>
            ) : (
              <StarRating value={0} readOnly />
            )}
            {sentiment !== 0 && (
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  padding: "0.2rem 0.6rem",
                  borderRadius: "9999px",
                  background: sentiment > 0 ? "#dcfce7" : "#fee2e2",
                  color: sentiment > 0 ? "#15803d" : "#b91c1c",
                }}
              >
                {sentiment > 0 ? "↑" : "↓"} {Math.abs(sentiment).toFixed(1)}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end" }}>
          {track.spotify_url && (
            <a
              href={track.spotify_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "0.5rem 1rem",
                background: "#10b981",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "9999px",
                fontSize: "0.8rem",
                fontWeight: 500,
                whiteSpace: "nowrap",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#059669")}
              onMouseLeave={(e) => (e.target.style.background = "#10b981")}
            >
              Spotify
            </a>
          )}

          {!isPromoted && (
            <button
              onClick={() => setShowPromote(true)}
              style={{
                padding: "0.4rem 0.9rem",
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: "9999px",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#2563eb",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#dbeafe";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#eff6ff";
              }}
            >
              🚀 Impulsionar
            </button>
          )}
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid #f8fafc",
          paddingTop: "0.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 500 }}>
            Sua nota{saving ? " …" : ""}
          </span>
          <StarRating value={userScore} onChange={handleRate} />
        </div>

        <button
          onClick={loadComments}
          style={{
            alignSelf: "flex-start",
            padding: "0.4rem 0.9rem",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "9999px",
            cursor: "pointer",
            fontSize: "0.8rem",
            fontWeight: 500,
            color: "#475569",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#f1f5f9";
            e.target.style.borderColor = "#cbd5e1";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#f8fafc";
            e.target.style.borderColor = "#e2e8f0";
          }}
        >
          {showComments ? "Ocultar" : "Comentários"}
          <span style={{ color: "#94a3b8", marginLeft: "0.3rem" }}>
            ({loadingComments ? "…" : comments.length})
          </span>
        </button>
      </div>

      {showComments && (
        <div
          style={{
            background: "#f8fafc",
            padding: "1rem",
            borderRadius: "12px",
          }}
        >
          {comments.length === 0 && (
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", margin: 0 }}>
              Nenhum comentário ainda. Seja o primeiro!
            </p>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {comments.map((c) => (
              <div
                key={c._id}
                style={{
                  padding: "0.6rem 0.8rem",
                  background: "#fff",
                  borderRadius: "10px",
                  border: "1px solid #f1f5f9",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#334155",
                  }}
                >
                  {c.display_name}
                </p>
                <p style={{ margin: "0.25rem 0 0", fontSize: "0.9rem", color: "#475569" }}>
                  {c.text}
                </p>
              </div>
            ))}
          </div>

          <form
            onSubmit={handlePostComment}
            style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}
          >
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escreva um comentário..."
              style={{
                flex: 1,
                padding: "0.6rem 0.9rem",
                borderRadius: "9999px",
                border: "1px solid #e2e8f0",
                fontSize: "0.9rem",
                outline: "none",
                background: "#fff",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#10b981")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
            <button
              type="submit"
              style={{
                padding: "0.6rem 1.2rem",
                background: "#0f172a",
                color: "#fff",
                border: "none",
                borderRadius: "9999px",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: 500,
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#1e293b")}
              onMouseLeave={(e) => (e.target.style.background = "#0f172a")}
            >
              Enviar
            </button>
          </form>
        </div>
      )}

      {showPromote && (
        <PromoteModal
          track={track}
          onClose={() => setShowPromote(false)}
          onSuccess={() => window.location.reload()}
        />
      )}
    </div>
  );
}

export default MusicCard;
