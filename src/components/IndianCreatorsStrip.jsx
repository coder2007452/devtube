import React from "react";
import { Sparkles, Flag, ArrowRight, CheckCircle2 } from "lucide-react";
import { INDIAN_CREATORS } from "../data/mockVideos";

export default function IndianCreatorsStrip({
  activeCreatorId,
  setActiveCreatorId,
  setActiveCategory
}) {
  const handleSelectCreator = (creatorId) => {
    if (activeCreatorId === creatorId) {
      setActiveCreatorId(null);
    } else {
      setActiveCreatorId(creatorId);
      setActiveCategory("all");
    }
  };

  return (
    <div className="creators-strip-container">
      <div className="strip-header">
        <div className="strip-title-wrap">
          <span style={{ fontSize: "1.3rem" }}>🇮🇳</span>
          <div>
            <div className="strip-title">
              Top Indian Tech Creators
              <span
                style={{
                  fontSize: "0.7rem",
                  background: "var(--indian-badge-bg)",
                  color: "var(--indian-badge-text)",
                  border: "1px solid var(--indian-badge-border)",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  marginLeft: "8px"
                }}
              >
                Prioritized #1
              </span>
            </div>
            <div className="strip-subtitle">
              India's finest educators in Fullstack Web Development, Next.js, and AI
            </div>
          </div>
        </div>

        {activeCreatorId && (
          <button
            className="filter-pill-btn"
            onClick={() => setActiveCreatorId(null)}
            style={{ fontSize: "0.75rem" }}
          >
            Clear Creator Filter ✕
          </button>
        )}
      </div>

      <div className="creators-scroll">
        {INDIAN_CREATORS.map((creator) => {
          const isSelected = activeCreatorId === creator.id;
          return (
            <div
              key={creator.id}
              className={`creator-card-pill ${isSelected ? "active" : ""}`}
              onClick={() => handleSelectCreator(creator.id)}
              title={`Click to filter by ${creator.name}`}
            >
              <img
                src={creator.avatar}
                alt={creator.name}
                className="creator-card-avatar"
              />
              <div className="creator-card-name" title={creator.name}>
                {creator.name}
              </div>
              <div className="creator-card-sub">{creator.subscribers}</div>
              <div className="creator-card-topic">{creator.specialty}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
