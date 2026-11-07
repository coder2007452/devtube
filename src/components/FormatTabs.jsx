import React from "react";
import { Film, Video, Sparkles, LayoutGrid } from "lucide-react";

export default function FormatTabs({
  contentFormat,
  setContentFormat,
  longCount,
  shortsCount
}) {
  return (
    <div className="format-tabs-container">
      <div className="format-tabs-left">
        <button
          className={`format-tab-btn ${contentFormat === "long" ? "active" : ""}`}
          onClick={() => setContentFormat("long")}
          title="Show only long-form videos, tutorials, and full courses"
        >
          <Video size={17} />
          <span>Long Form Videos</span>
          {longCount > 0 && <span className="format-count-pill">{longCount}</span>}
        </button>

        <button
          className={`format-tab-btn ${contentFormat === "short" ? "active" : ""}`}
          onClick={() => setContentFormat("short")}
          title="Show only short-form 60-second shorts"
        >
          <Film size={17} style={{ color: "var(--yt-red)" }} />
          <span>Short Form (Shorts)</span>
          {shortsCount > 0 && <span className="format-count-pill">{shortsCount}</span>}
        </button>

        <button
          className={`format-tab-btn ${contentFormat === "all" ? "active" : ""}`}
          onClick={() => setContentFormat("all")}
          title="Show both long form and short form in separated sections"
        >
          <LayoutGrid size={16} />
          <span>All Sections</span>
        </button>
      </div>

      <div className="format-tabs-right">
        <span style={{ fontSize: "0.78rem", color: "var(--indian-badge-text)", display: "flex", alignItems: "center", gap: "5px" }}>
          <Sparkles size={13} />
          <span>🇮🇳 Indian YouTubers Prioritized in Both Sections</span>
        </span>
      </div>
    </div>
  );
}
