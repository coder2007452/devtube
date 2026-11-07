import React, { useState } from "react";
import { CheckCircle2, BellRing, ExternalLink, Sparkles, Video, Film } from "lucide-react";

export default function ChannelSearchCard({
  creator,
  longCount,
  shortsCount,
  contentFormat,
  setContentFormat
}) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  if (!creator) return null;

  return (
    <div className="channel-search-spotlight">
      <div className="channel-spotlight-left">
        <img
          src={creator.avatar}
          alt={creator.name}
          className="channel-spotlight-avatar"
        />
        <div className="channel-spotlight-info">
          <div className="channel-spotlight-title">
            <span>{creator.name}</span>
            <CheckCircle2 size={18} className="verified-icon" />
            {creator.isIndian && (
              <span className="indian-badge-tag" style={{ position: "static", fontSize: "0.72rem" }}>
                🇮🇳 Verified Indian Creator
              </span>
            )}
          </div>

          <div className="channel-spotlight-meta">
            <span>{creator.handle}</span>
            <span>•</span>
            <span>{creator.subscribers}</span>
            <span>•</span>
            <span style={{ color: "var(--yt-text-primary)", fontWeight: "600" }}>
              {longCount + shortsCount} DevTube videos • 1K+ on official YouTube
            </span>
            <span>•</span>
            <span style={{ color: "var(--flag-saffron)", fontSize: "0.8rem", fontWeight: "600" }}>
              ⚡ Live YouTube Sync
            </span>
          </div>

          <p className="channel-spotlight-desc">{creator.specialty}</p>

          {/* Quick Format Switcher for this Channel */}
          <div className="channel-format-chips">
            <button
              className={`filter-pill-btn ${contentFormat === "all" ? "active" : ""}`}
              onClick={() => setContentFormat("all")}
            >
              All Content ({longCount + shortsCount})
            </button>

            <button
              className={`filter-pill-btn ${contentFormat === "long" ? "active" : ""}`}
              onClick={() => setContentFormat("long")}
            >
              <Video size={14} />
              <span>Long Form Courses ({longCount})</span>
            </button>

            <button
              className={`filter-pill-btn ${contentFormat === "short" ? "active" : ""}`}
              onClick={() => setContentFormat("short")}
            >
              <Film size={14} style={{ color: "var(--yt-red)" }} />
              <span>Shorts ({shortsCount})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="channel-spotlight-right">
        <button
          className={`yt-subscribe-btn ${isSubscribed ? "subscribed" : ""}`}
          onClick={() => setIsSubscribed(!isSubscribed)}
        >
          {isSubscribed ? (
            <>
              <BellRing size={16} />
              <span>Subscribed</span>
            </>
          ) : (
            <span>Subscribe</span>
          )}
        </button>

        <a
          href={creator.youtubeChannelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="filter-pill-btn"
          style={{ fontSize: "0.8rem", textDecoration: "none" }}
          title="Open on official YouTube channel"
        >
          <ExternalLink size={14} />
          <span>YouTube Channel</span>
        </a>
      </div>
    </div>
  );
}
