import React from "react";
import { Home, Film, Video, Bookmark, Compass } from "lucide-react";

export default function MobileBottomNav({
  activeCategory,
  contentFormat,
  setContentFormat,
  resetToHome,
  onOpenShortsPlayer,
  setShowBookmarksModal,
  bookmarkedCount,
  onOpenDrawer
}) {
  return (
    <nav className="devtube-bottom-nav">
      <button
        type="button"
        className={`bottom-nav-item ${contentFormat === "all" && activeCategory === "all" ? "active" : ""}`}
        onClick={resetToHome}
        title="Home"
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button
        type="button"
        className={`bottom-nav-item ${contentFormat === "short" ? "active" : ""}`}
        onClick={() => {
          setContentFormat("short");
          onOpenShortsPlayer();
        }}
        title="Shorts"
      >
        <Film size={20} style={{ color: contentFormat === "short" ? "var(--yt-red)" : "inherit" }} />
        <span>Shorts</span>
      </button>

      <button
        type="button"
        className={`bottom-nav-item ${contentFormat === "long" ? "active" : ""}`}
        onClick={() => setContentFormat("long")}
        title="Courses"
      >
        <Video size={20} style={{ color: contentFormat === "long" ? "var(--flag-saffron)" : "inherit" }} />
        <span>Courses</span>
      </button>

      <button
        type="button"
        className="bottom-nav-item"
        onClick={() => setShowBookmarksModal(true)}
        title="Saved"
      >
        <div className="bottom-nav-icon-wrap">
          <Bookmark size={20} />
          {bookmarkedCount > 0 && (
            <span className="badge-count bottom-nav-badge">
              {bookmarkedCount}
            </span>
          )}
        </div>
        <span>Saved</span>
      </button>

      <button
        type="button"
        className="bottom-nav-item"
        onClick={onOpenDrawer}
        title="Explore"
      >
        <Compass size={20} />
        <span>Explore</span>
      </button>
    </nav>
  );
}
