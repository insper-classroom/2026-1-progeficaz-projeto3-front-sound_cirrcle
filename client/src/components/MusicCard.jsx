import React, { useEffect, useState } from "react";
import PromoteModal from "./PromoteModal";
import RatingModal from "./RatingModal";
import { rateTrack, deleteRating, getComments, postComment } from "../api/feedApi";

function MusicCard({ track, index, showAdvertBadge }) {
  const [userScore, setUserScore] = useState(track.user_score || 0);
  const [avgRating, setAvgRating] = useState(track.average_rating || 0);
  const [ratingCount, setRatingCount] = useState(track.rating_count || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPromote, setShowPromote] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [isPromoted, setIsPromoted] = useState(track.is_promoted === true);

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

  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      const res = await getComments(track.spotify_id);
      setComments(res.data.comments || []);
    } catch {
      alert("Erro ao carregar comentários.");
    } finally {
      setLoadingComments(false);
      setCommentsLoaded(true);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const loadComments = async () => {
    if (!commentsLoaded) {
      await fetchComments();
    }
    setShowComments((current) => !current);
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      await postComment({ track_id: track.spotify_id, text: newComment });
      setNewComment("");
      const res = await getComments(track.spotify_id);
      setComments(res.data.comments || []);
      setCommentsLoaded(true);
    } catch {
      alert("Erro ao enviar comentário.");
    }
  };

  const handlePromoteSuccess = () => {
    setIsPromoted(true);
  };

  const sentiment = track.sentiment_adjustment || 0;
  const displayRating = Math.max(sentiment, Math.min(5.0, avgRating + sentiment));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1.5rem",
        borderRadius: "14px",
        background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
        boxShadow: "0 10px 30px rgba(2,6,23,0.4), inset 0 1px 0 rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.02)",
        transition: "box-shadow 0.2s ease",
        position: "relative",
      }}
    >
      {/* Header: Imagem + Info + Rating */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        {track.cover_url ? (
          <img
            src={track.cover_url}
            alt={track.name}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "10px",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              flexShrink: 0,
            }}
          >
            🎵
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
            <h3
              style={{
                margin: 0,
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "#e6eef8",
                lineHeight: 1.2,
              }}
            >
              {track.name}
            </h3>
            {showAdvertBadge && (
              <span
                style={{
                  background: "linear-gradient(90deg,#206bff,#1fc0ff)",
                  color: "#fff",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "12px",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 12px rgba(33,96,255,0.3)",
                }}
              >
                ANÚNCIO
              </span>
            )}
          </div>
          <p style={{ margin: "0 0 0.1rem 0", color: "#a9d1ff", fontSize: "0.95rem" }}>
            {track.artist}
          </p>
          {track.album && (
            <p style={{ margin: "0", color: "#7f98ad", fontSize: "0.85rem" }}>
              {track.album}
            </p>
          )}
        </div>

        {/* Rating + Botões Spotify e Impulsionar à direita */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "0.75rem",
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => window.open(`https://open.spotify.com/track/${track.spotify_id}`, "_blank")}
              style={{
                padding: "0.5rem 1.5rem",
                background: "#1ed760",
                border: "none",
                borderRadius: "20px",
                color: "#fff",
                fontSize: "0.9rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: "0 6px 16px rgba(30,215,96,0.3)",
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = "0 8px 20px rgba(30,215,96,0.5)";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = "0 6px 16px rgba(30,215,96,0.3)";
                e.target.style.transform = "scale(1)";
              }}
            >
              Spotify
            </button>
            <button
              onClick={() => setShowPromote(true)}
              style={{
                padding: "0.5rem 1.5rem",
                background: "rgba(236,72,153,0.2)",
                border: "1px solid rgba(236,72,153,0.4)",
                borderRadius: "20px",
                color: "#f472b6",
                fontSize: "0.9rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(236,72,153,0.3)";
                e.target.style.borderColor = "rgba(236,72,153,0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(236,72,153,0.2)";
                e.target.style.borderColor = "rgba(236,72,153,0.4)";
              }}
            >
              🚀 Impulsionar
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ fontSize: "1.3rem" }}>⭐</span>
            <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fbbf24" }}>
              {displayRating > 0 ? displayRating.toFixed(1) : "—"}
            </span>
          </div>
          <span style={{ fontSize: "0.75rem", color: "#7f98ad" }}>
            {ratingCount} {ratingCount === 1 ? "avaliação" : "avaliações"}
          </span>
        </div>
      </div>

      {/* Botões de ação */}
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button
          onClick={() => setShowRatingModal(true)}
          style={{
            flex: 1,
            padding: "0.75rem 1rem",
            background: "linear-gradient(90deg,#206bff,#1fc0ff)",
            border: "none",
            borderRadius: "12px",
            color: "#fff",
            fontSize: "0.95rem",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.2s",
            boxShadow: "0 8px 20px rgba(33,96,255,0.2)",
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = "0 12px 28px rgba(33,96,255,0.35)";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = "0 8px 20px rgba(33,96,255,0.2)";
            e.target.style.transform = "translateY(0)";
          }}
        >
          ⭐ Dar Nota
        </button>
        <button
          onClick={loadComments}
          style={{
            flex: 1,
            padding: "0.75rem 1rem",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            color: "#a9d1ff",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(255,255,255,0.08)";
            e.target.style.borderColor = "rgba(255,255,255,0.12)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255,255,255,0.05)";
            e.target.style.borderColor = "rgba(255,255,255,0.08)";
          }}
        >
          💬 Comentários ({comments.length})
        </button>
      </div>

      {/* Comentários */}
      {showComments && (
        <div
          style={{
            background: "rgba(8,12,18,0.4)",
            padding: "1rem",
            borderRadius: "10px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            marginTop: "0.5rem",
          }}
        >
          {comments.length === 0 ? (
            <p style={{ color: "#7f98ad", fontSize: "0.9rem", margin: 0 }}>
              Sem comentários ainda.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1rem" }}>
              {comments.map((comment, idx) => (
                <div key={idx} style={{ padding: "0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: "8px" }}>
                  <p style={{ margin: "0 0 0.25rem 0", color: "#a9d1ff", fontSize: "0.85rem", fontWeight: 600 }}>
                    {comment.user_display_name || comment.email}
                  </p>
                  <p style={{ margin: 0, color: "#9fb0c6", fontSize: "0.85rem" }}>
                    {comment.text}
                  </p>
                </div>
              ))}
            </div>
          )}

          <form
            onSubmit={handlePostComment}
            style={{
              display: "flex",
              gap: "0.5rem",
              marginTop: "0.75rem",
            }}
          >
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Adicione um comentário…"
              style={{
                flex: 1,
                padding: "0.6rem 0.85rem",
                background: "rgba(8,12,18,0.6)",
                border: "1px solid rgba(255,255,255,0.04)",
                borderRadius: "8px",
                color: "#e6eef8",
                fontSize: "0.85rem",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(43,107,255,0.9)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.04)")}
            />
            <button
              type="submit"
              style={{
                padding: "0.6rem 1rem",
                background: "linear-gradient(90deg,#206bff,#1fc0ff)",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Enviar
            </button>
          </form>
        </div>
      )}

      {showPromote && <PromoteModal track={track} onClose={() => setShowPromote(false)} onSuccess={handlePromoteSuccess} />}

      {showRatingModal && (
        <RatingModal
          track={track}
          userScore={userScore}
          onClose={() => setShowRatingModal(false)}
          onConfirm={handleRate}
        />
      )}
    </div>
  );
}

export default MusicCard;
