import React, { useState } from "react";

function StarRating({ value, onChange, readOnly = false }) {
  const [hover, setHover] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (star) => {
    if (readOnly || !onChange) return;
    onChange(value === star ? 0 : star);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.15rem" }}>
      {stars.map((star) => {
        const filled = (hover || value || 0) >= star;
        return (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            onMouseEnter={() => !readOnly && setHover(star)}
            onMouseLeave={() => !readOnly && setHover(0)}
            disabled={readOnly}
            style={{
              background: "none",
              border: "none",
              cursor: readOnly ? "default" : "pointer",
              fontSize: "1.3rem",
              color: filled ? "#f59e0b" : "#e2e8f0",
              transition: "color 0.15s ease, transform 0.1s ease",
              padding: "0 0.05rem",
              lineHeight: 1,
            }}
            onMouseDown={(e) => !readOnly && (e.target.style.transform = "scale(0.85)")}
            onMouseUp={(e) => !readOnly && (e.target.style.transform = "scale(1)")}
          >
            ★
          </button>
        );
      })}
      {value > 0 && (
        <span
          style={{
            marginLeft: "0.4rem",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#475569",
          }}
        >
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}

export default StarRating;
