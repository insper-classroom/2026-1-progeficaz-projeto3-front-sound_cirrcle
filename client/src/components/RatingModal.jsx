import React, { useState } from "react";

function RatingModal({ track, userScore, onClose, onConfirm }) {
  const [selectedRating, setSelectedRating] = useState(userScore || 0);

  const handleConfirm = () => {
    onConfirm(selectedRating);
    onClose();
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const modalStyle = {
    background: "linear-gradient(180deg, rgba(20,30,50,0.95), rgba(10,15,30,0.95))",
    borderRadius: "16px",
    padding: "2rem",
    width: "90%",
    maxWidth: "400px",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
  };

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#e6eef8",
    margin: "0 0 1rem 0",
  };

  const trackNameStyle = {
    fontSize: "0.95rem",
    color: "#a9d1ff",
    margin: "0 0 1.5rem 0",
  };

  const starsContainerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "0.8rem",
    margin: "1.5rem 0 2rem 0",
  };

  const starStyle = (index) => ({
    fontSize: "2.5rem",
    cursor: "pointer",
    transition: "transform 0.2s ease, filter 0.2s ease",
    filter: index <= selectedRating ? "drop-shadow(0 0 8px rgba(251,191,36,0.6))" : "opacity(0.4)",
    transform: index <= selectedRating ? "scale(1.1)" : "scale(1)",
  });

  const buttonStyle = {
    width: "100%",
    padding: "0.75rem",
    background: "linear-gradient(90deg,#206bff,#1fc0ff)",
    border: "none",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "0.95rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 8px 20px rgba(33,96,255,0.2)",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "1.5rem",
    right: "1.5rem",
    background: "none",
    border: "none",
    color: "#a9d1ff",
    fontSize: "1.5rem",
    cursor: "pointer",
    transition: "color 0.2s",
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button
          style={closeButtonStyle}
          onClick={onClose}
          onMouseEnter={(e) => (e.target.style.color = "#e6eef8")}
          onMouseLeave={(e) => (e.target.style.color = "#a9d1ff")}
        >
          ✕
        </button>

        <h2 style={titleStyle}>Avaliar Música</h2>
        <p style={trackNameStyle}>
          {track.name} - {track.artist}
        </p>

        <div style={starsContainerStyle}>
          {[1, 2, 3, 4, 5].map((index) => (
            <span
              key={index}
              style={starStyle(index)}
              onClick={() => setSelectedRating(index)}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.2)";
                e.target.style.filter = `drop-shadow(0 0 8px rgba(251,191,36,0.8))`;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = index <= selectedRating ? "scale(1.1)" : "scale(1)";
                e.target.style.filter =
                  index <= selectedRating ? "drop-shadow(0 0 8px rgba(251,191,36,0.6))" : "opacity(0.4)";
              }}
            >
              ⭐
            </span>
          ))}
        </div>

        <button style={buttonStyle} onClick={handleConfirm}>
          Confirmar Avaliação
        </button>
      </div>
    </div>
  );
}

export default RatingModal;
