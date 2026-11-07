import React from "react";
import { Play, CheckCircle2, Sparkles, Film } from "lucide-react";
import { DEV_SHORTS } from "../data/mockVideos";

export default function ShortsGrid({
  onSelectShort,
  activeCreatorId,
  priorityFilter
}) {
  // Filter for valid thumbnails
  let shorts = DEV_SHORTS.filter(
    (s) => Boolean(s && s.id && s.thumbnail && s.thumbnail.trim() !== "")
  );

  // Filter by creator if selected
  if (activeCreatorId) {
    shorts = shorts.filter((s) => s.channelId === activeCreatorId);
  }

  // Filter by priority
  if (priorityFilter === "indian_only") {
    shorts = shorts.filter((s) => s.isIndian);
  }

  // Prioritize Indian creators #1, then global
  const sortedShorts = [...shorts].sort((a, b) => {
    if (a.isIndian && !b.isIndian) return -1;
    if (!a.isIndian && b.isIndian) return 1;
    return (b.priorityScore || 0) - (a.priorityScore || 0);
  });

  const indianCount = sortedShorts.filter((s) => s.isIndian).length;

  return (
    <div className="shorts-grid-section">
      {/* Section Header */}
      <div className="shorts-section-header">
        <div className="shorts-section-header-left">
          <div
            style={{
              background: "var(--yt-red)",
              color: "#fff",
              width: "30px",
              height: "30px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "900",
              flexShrink: 0
            }}
          >
            ⚡
          </div>
          <div>
            <h2 className="shorts-section-title">
              Short Form Section • YouTube Shorts
            </h2>
            <p className="shorts-section-desc">
              Bite-sized 60-second developer insights, tricks, and quick concepts
            </p>
          </div>
        </div>

        <div className="shorts-section-header-meta">
          <span style={{ fontSize: "0.82rem", color: "var(--indian-badge-text)", fontWeight: "600" }}>
            🇮🇳 {indianCount} Indian Tech Shorts
          </span>
          <span style={{ fontSize: "0.82rem", color: "var(--yt-text-secondary)" }}>
            • {sortedShorts.length - indianCount} Global
          </span>
        </div>
      </div>

      {sortedShorts.length === 0 ? (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            background: "var(--yt-bg-surface)",
            borderRadius: "12px",
            color: "var(--yt-text-secondary)"
          }}
        >
          No short-form videos match this creator or filter.
        </div>
      ) : (
        <div className="shorts-full-grid">
          {sortedShorts.map((short) => (
            <div
              key={short.id}
              className="shorts-grid-card"
              onClick={() => onSelectShort(short.id)}
              title={`Play: ${short.title}`}
            >
              <div className="shorts-grid-thumb-wrap">
                <img
                  src={short.thumbnail}
                  alt={short.title}
                  className="shorts-grid-thumb"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {short.isIndian && (
                  <span className="indian-badge-tag" style={{ top: "8px", left: "8px" }}>
                    🇮🇳 India
                  </span>
                )}

                <div className="shorts-grid-play-hover">
                  <Play size={28} fill="#fff" />
                </div>
              </div>

              <div className="shorts-grid-meta">
                <h3 className="shorts-grid-title" title={short.title}>
                  {short.title}
                </h3>
                <div className="shorts-grid-channel">
                  <span>{short.channelTitle}</span>
                  <CheckCircle2 size={12} className="verified-icon" />
                </div>
                <div className="shorts-grid-views">{short.likes} likes</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
