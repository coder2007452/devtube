import React, { useState } from "react";
import {
  Menu,
  Search,
  X,
  Mic,
  Bookmark,
  Settings,
  Sparkles,
  Video,
  Bell,
  Plus,
  ArrowLeft
} from "lucide-react";
import YouTubeIcon from "./YouTubeIcon";

export default function Header({
  sidebarCollapsed,
  setSidebarCollapsed,
  mobileDrawerOpen,
  setMobileDrawerOpen,
  searchQuery,
  setSearchQuery,
  handleSearchSubmit,
  priorityFilter,
  setPriorityFilter,
  bookmarkedVideos,
  setShowBookmarksModal,
  setShowSettingsModal,
  hasApiKey,
  resetToHome
}) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const togglePriority = () => {
    if (priorityFilter === "indian_first") {
      setPriorityFilter("indian_only");
    } else if (priorityFilter === "indian_only") {
      setPriorityFilter("all");
    } else {
      setPriorityFilter("indian_first");
    }
  };

  const priorityLabel =
    priorityFilter === "indian_first"
      ? "🇮🇳 Indian First"
      : priorityFilter === "indian_only"
      ? "🇮🇳 Indian Only"
      : "🌐 All Creators";

  const priorityCompactLabel =
    priorityFilter === "indian_first"
      ? "🇮🇳 1st"
      : priorityFilter === "indian_only"
      ? "🇮🇳 Only"
      : "🌐 All";

  const onHamburgerClick = () => {
    if (window.innerWidth <= 768) {
      if (setMobileDrawerOpen) {
        setMobileDrawerOpen(!mobileDrawerOpen);
      }
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const onMobileSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setMobileSearchOpen(false);
    handleSearchSubmit(e);
  };

  return (
    <header className="devtube-header">
      {/* Mobile Full-Width Search Overlay */}
      {mobileSearchOpen ? (
        <div className="mobile-search-bar">
          <button
            type="button"
            className="icon-btn"
            onClick={() => setMobileSearchOpen(false)}
            title="Back"
          >
            <ArrowLeft size={20} />
          </button>

          <form className="mobile-search-form" onSubmit={onMobileSearchSubmit}>
            <div className="mobile-search-input-wrap">
              <input
                type="text"
                className="mobile-search-input"
                placeholder="Search Fullstack & AI videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchQuery("")}
                  title="Clear"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <button type="submit" className="mobile-search-submit-btn" title="Search">
              <Search size={18} />
            </button>
          </form>

          <button
            type="button"
            className="icon-btn"
            title="Search with voice"
            onClick={() =>
              alert("Voice Search: speak any dev topic like 'Next.js 15 Fullstack' or 'LangChain AI'")
            }
          >
            <Mic size={18} />
          </button>
        </div>
      ) : (
        <>
          {/* Left: Hamburger & YouTube Logo */}
          <div className="header-left">
            <button
              type="button"
              className="icon-btn"
              onClick={onHamburgerClick}
              title="Guide"
            >
              <Menu size={22} />
            </button>

            <div className="brand-logo" onClick={resetToHome} title="DevTube Home">
              <YouTubeIcon size={28} />
              <span className="brand-text">
                DevTube<span className="country-pill">IN</span>
              </span>
            </div>
          </div>

          {/* Center: Search Bar (Exact YouTube Style - Desktop) */}
          <div className="header-center">
            <form className="search-box-form" onSubmit={handleSearchSubmit}>
              <div className="search-input-wrapper">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search Fullstack, Web Dev & AI videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={() => setSearchQuery("")}
                    title="Clear Search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <button type="submit" className="search-submit-btn" title="Search">
                <Search size={19} />
              </button>
            </form>

            <button
              type="button"
              className="icon-btn mic-btn"
              title="Search with voice"
              onClick={() =>
                alert("Voice Search: speak any dev topic like 'Next.js 14 Fullstack' or 'LangChain AI'")
              }
            >
              <Mic size={18} />
            </button>
          </div>

          {/* Right: Actions */}
          <div className="header-right">
            {/* Mobile Search Button (visible on <= 768px) */}
            <button
              type="button"
              className="icon-btn mobile-search-trigger"
              onClick={() => setMobileSearchOpen(true)}
              title="Search videos"
            >
              <Search size={20} />
            </button>

            {/* + Create Button (Desktop only) */}
            <button
              type="button"
              className="yt-create-btn"
              onClick={() => alert("DevTube Studio: upload or bookmark your custom YouTube tutorials.")}
              title="Create"
            >
              <Plus size={16} />
              <span>Create</span>
            </button>

            {/* Indian Tech Priority Quick Toggle */}
            <button
              type="button"
              className="priority-toggle-badge"
              onClick={togglePriority}
              title="Toggle Indian Tech YouTubers Prioritization"
            >
              <Sparkles size={14} />
              <span className="priority-badge-full">{priorityLabel}</span>
              <span className="priority-badge-compact">{priorityCompactLabel}</span>
            </button>

            {/* Notifications Bell (Desktop only) */}
            <button
              type="button"
              className="icon-btn badge-counter-wrap header-notification-btn"
              onClick={() => alert("No new notifications. You are caught up on tech feeds!")}
              title="Notifications"
            >
              <Bell size={20} />
              <span className="badge-count" style={{ background: "var(--yt-red)" }}>3</span>
            </button>

            {/* Watch Later / Bookmarks Counter */}
            <button
              type="button"
              className="icon-btn badge-counter-wrap"
              onClick={() => setShowBookmarksModal(true)}
              title="Watch Later / Bookmarks"
            >
              <Bookmark size={20} />
              {bookmarkedVideos.length > 0 && (
                <span className="badge-count" style={{ background: "var(--flag-saffron)", color: "#000" }}>
                  {bookmarkedVideos.length}
                </span>
              )}
            </button>

            {/* YouTube API Connection Settings */}
            <button
              type="button"
              className="icon-btn"
              onClick={() => setShowSettingsModal(true)}
              title="YouTube Data Connection Settings"
              style={{ position: "relative" }}
            >
              <Settings size={20} />
              {hasApiKey && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "4px",
                    right: "4px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--yt-green)"
                  }}
                />
              )}
            </button>

            {/* Developer Avatar */}
            <div
              className="header-avatar"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ff9933, #138808)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "0.85rem",
                color: "#fff",
                cursor: "pointer",
                flexShrink: 0
              }}
              title="Developer Profile"
            >
              D
            </div>
          </div>
        </>
      )}
    </header>
  );
}
