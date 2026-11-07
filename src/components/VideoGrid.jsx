import React from "react";
import VideoCard from "./VideoCard";
import { Search, Sparkles } from "lucide-react";

export default function VideoGrid({
  videos,
  onSelectVideo,
  bookmarkedVideos,
  onToggleBookmark,
  resetFilters,
  priorityFilter
}) {
  const validVideos = (videos || []).filter(
    (v) => Boolean(v && v.id && v.thumbnail && v.thumbnail.trim() !== "")
  );

  if (!validVideos || validVideos.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 20px",
          textAlign: "center",
          background: "var(--yt-bg-surface)",
          borderRadius: "16px",
          border: "1px solid var(--yt-border-subtle)",
          marginTop: "20px"
        }}
      >
        <Search size={48} style={{ color: "var(--yt-text-muted)", marginBottom: "16px" }} />
        <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "8px" }}>
          No videos found
        </h3>
        <p style={{ color: "var(--yt-text-secondary)", fontSize: "0.9rem", maxWidth: "420px", marginBottom: "20px" }}>
          DevTube strictly displays verified Fullstack Web Dev, Web Development, and AI courses. Try resetting filters or searching for "Next.js", "Docker", or a channel name like "Chai aur Code".
        </p>
        <button className="btn-primary" onClick={resetFilters}>
          Reset All Filters
        </button>
      </div>
    );
  }

  const indianCount = validVideos.filter((v) => v.isIndian).length;

  return (
    <div>
      {/* Grid Meta Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
          fontSize: "0.82rem",
          color: "var(--yt-text-secondary)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>
            Showing <strong style={{ color: "var(--yt-text-primary)" }}>{validVideos.length}</strong> verified courses
          </span>
          <span>•</span>
          <span style={{ color: "var(--indian-badge-text)", fontWeight: "600" }}>
            🇮🇳 {indianCount} Indian Creators
          </span>
          <span>•</span>
          <span>{validVideos.length - indianCount} Global Masters</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Sparkles size={14} style={{ color: "var(--flag-saffron)" }} />
          <span>
            {priorityFilter === "indian_first"
              ? "Indian Creators ranked #1"
              : priorityFilter === "indian_only"
              ? "Filtered to Indian Creators only"
              : "Showing all creators"}
          </span>
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="video-grid">
        {validVideos.map((video) => {
          const isBookmarked = bookmarkedVideos.some((b) => b.id === video.id);
          return (
            <VideoCard
              key={video.id}
              video={video}
              onSelectVideo={onSelectVideo}
              isBookmarked={isBookmarked}
              onToggleBookmark={onToggleBookmark}
            />
          );
        })}
      </div>
    </div>
  );
}
