import React from "react";
import { Home, Film, GraduationCap, Clock, LayoutGrid, ListVideo, Newspaper } from "lucide-react";

export default function MobileBottomNav({
  activeCategory,
  setActiveCategory,
  contentFormat,
  setContentFormat,
  resetToHome,
  onOpenShortsPlayer,
  bookmarkedCount,
  currentView = "home",
  setCurrentView
}) {
  return (
    <nav className="devtube-bottom-nav">
      <button
        type="button"
        className={`bottom-nav-item ${currentView === "home" && contentFormat === "all" && activeCategory === "all" ? "active" : ""}`}
        onClick={() => {
          if (setCurrentView) setCurrentView("home");
          resetToHome();
        }}
        title="Home"
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button
        type="button"
        className={`bottom-nav-item ${currentView === "categories" ? "active" : ""}`}
        onClick={() => {
          if (setCurrentView) setCurrentView("categories");
        }}
        title="Categories"
      >
        <LayoutGrid size={20} style={{ color: currentView === "categories" ? "var(--flag-saffron)" : "inherit" }} />
        <span>Categories</span>
      </button>

      <button
        type="button"
        className={`bottom-nav-item ${currentView === "playlists" ? "active" : ""}`}
        onClick={() => {
          if (setCurrentView) setCurrentView("playlists");
        }}
        title="Playlists"
      >
        <ListVideo size={20} style={{ color: currentView === "playlists" ? "var(--yt-blue)" : "inherit" }} />
        <span>Playlists</span>
      </button>

      <button
        type="button"
        className={`bottom-nav-item ${currentView === "news" ? "active" : ""}`}
        onClick={() => {
          if (setCurrentView) setCurrentView("news");
        }}
        title="Dev News & Updates"
      >
        <Newspaper size={20} style={{ color: currentView === "news" ? "#ef4444" : "inherit" }} />
        <span>News</span>
      </button>

      <button
        type="button"
        className={`bottom-nav-item ${contentFormat === "short" ? "active" : ""}`}
        onClick={() => {
          if (setCurrentView) setCurrentView("home");
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
        className={`bottom-nav-item ${currentView === "watch_later" ? "active" : ""}`}
        onClick={() => {
          if (setCurrentView) setCurrentView("watch_later");
        }}
        title="Watch Later"
      >
        <div className="bottom-nav-icon-wrap">
          <Clock size={20} />
          {bookmarkedCount > 0 && (
            <span className="badge-count bottom-nav-badge">
              {bookmarkedCount}
            </span>
          )}
        </div>
        <span>Saved</span>
      </button>
    </nav>
  );
}
