import React from "react";
import { X, Bookmark, Trash2, Play } from "lucide-react";

export default function BookmarksModal({
  isOpen,
  onClose,
  bookmarkedVideos,
  onSelectVideo,
  onRemoveBookmark,
  onClearAll
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="settings-modal"
        style={{ maxWidth: "680px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="settings-header">
          <div className="settings-title">
            <Bookmark size={20} style={{ color: "var(--flag-saffron)" }} />
            <span>Watch Later & Saved Videos ({bookmarkedVideos.length})</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {bookmarkedVideos.length > 0 && (
              <button
                className="filter-pill-btn"
                onClick={onClearAll}
                style={{ fontSize: "0.75rem", color: "#ff6b6b" }}
              >
                Clear All
              </button>
            )}
            <button className="icon-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {bookmarkedVideos.length === 0 ? (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              color: "var(--yt-text-secondary)"
            }}
          >
            <Bookmark size={40} style={{ color: "var(--yt-text-muted)", marginBottom: "12px" }} />
            <h4 style={{ color: "var(--yt-text-primary)", marginBottom: "6px" }}>No saved videos yet</h4>
            <p style={{ fontSize: "0.85rem" }}>
              Click the bookmark icon on any video card or in the player to save videos for later study.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              maxHeight: "60vh",
              overflowY: "auto",
              paddingRight: "4px"
            }}
          >
            {bookmarkedVideos.map((video) => (
              <div
                key={video.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 10px",
                  background: "var(--yt-bg-main)",
                  borderRadius: "10px",
                  border: "1px solid var(--yt-border-subtle)",
                  cursor: "pointer",
                  gap: "10px"
                }}
                onClick={() => {
                  onSelectVideo(video);
                  onClose();
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0, flex: 1 }}>
                  <img
                    src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    referrerPolicy="no-referrer"
                    style={{
                      width: "68px",
                      height: "38px",
                      borderRadius: "6px",
                      objectFit: "cover",
                      flexShrink: 0
                    }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <h4
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: "600",
                        lineHeight: "1.3",
                        marginBottom: "2px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {video.title}
                    </h4>
                    <div style={{ fontSize: "0.72rem", color: "var(--yt-text-secondary)" }}>
                      {video.channelTitle} {video.isIndian && "🇮🇳"}
                    </div>
                  </div>
                </div>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="icon-btn"
                    style={{ width: "32px", height: "32px", color: "var(--yt-green)" }}
                    title="Play Video"
                    onClick={() => {
                      onSelectVideo(video);
                      onClose();
                    }}
                  >
                    <Play size={16} fill="currentColor" />
                  </button>

                  <button
                    className="icon-btn"
                    style={{ width: "32px", height: "32px", color: "#ff6b6b" }}
                    title="Remove from Saved"
                    onClick={() => onRemoveBookmark(video.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
