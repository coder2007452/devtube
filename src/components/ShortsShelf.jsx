import React from "react";
import { Play, CheckCircle2 } from "lucide-react";
import { DEV_SHORTS } from "../data/mockVideos";

export default function ShortsShelf({ onSelectShort }) {
  // Strictly filter for working thumbnails & sort Indian Creators first!
  const shorts = [...DEV_SHORTS]
    .filter((s) => Boolean(s && s.id && s.thumbnail && s.thumbnail.trim() !== ""))
    .sort((a, b) => {
      if (a.isIndian && !b.isIndian) return -1;
      if (!a.isIndian && b.isIndian) return 1;
      return (b.priorityScore || 0) - (a.priorityScore || 0);
    });

  return (
    <div className="shorts-shelf-container">
      {/* Header with YouTube Shorts Icon */}
      <div className="shorts-shelf-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              background: "var(--yt-red)",
              color: "#fff",
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "900",
              fontSize: "1rem"
            }}
          >
            ⚡
          </div>
          <span style={{ fontSize: "1.2rem", fontWeight: "700" }}>Shorts</span>
          <span
            style={{
              fontSize: "0.72rem",
              background: "var(--indian-badge-bg)",
              color: "var(--indian-badge-text)",
              border: "1px solid var(--indian-badge-border)",
              padding: "2px 8px",
              borderRadius: "12px",
              fontWeight: "600"
            }}
          >
            🇮🇳 Indian Creators Prioritized
          </span>
        </div>
      </div>

      {/* Horizontal Carousel of 9:16 Shorts Cards */}
      <div className="shorts-shelf-scroll">
        {shorts.map((short) => (
          <div
            key={short.id}
            className="shorts-shelf-card"
            onClick={() => onSelectShort(short.id)}
            title={`Play: ${short.title}`}
          >
            <div className="shorts-shelf-thumb-wrap">
              <img
                src={short.thumbnail}
                alt={short.title}
                className="shorts-shelf-thumb"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {short.isIndian && (
                <span className="indian-badge-tag" style={{ top: "6px", left: "6px", fontSize: "0.65rem" }}>
                  🇮🇳 India
                </span>
              )}

              <div className="shorts-play-overlay">
                <Play size={24} fill="#fff" />
              </div>
            </div>

            <div className="shorts-shelf-info">
              <h4 className="shorts-shelf-title" title={short.title}>
                {short.title}
              </h4>
              <div className="shorts-shelf-channel">
                <span>{short.channelTitle}</span>
                <CheckCircle2 size={12} className="verified-icon" />
              </div>
              <div className="shorts-shelf-views">{short.likes} likes</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
