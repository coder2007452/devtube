import React from "react";
import {
  Home,
  Film,
  Video,
  Tv2,
  History,
  Clock,
  ThumbsUp,
  Layers,
  Code2,
  Brain,
  Globe,
  HelpCircle,
  X,
  Settings
} from "lucide-react";
import { INDIAN_CREATORS } from "../data/mockVideos";
import YouTubeIcon from "./YouTubeIcon";

export default function Sidebar({
  collapsed,
  mobileDrawerOpen,
  setMobileDrawerOpen,
  activeCategory,
  setActiveCategory,
  activeCreatorId,
  setActiveCreatorId,
  setShowBookmarksModal,
  setShowSettingsModal,
  resetToHome,
  contentFormat,
  setContentFormat,
  onOpenShortsPlayer
}) {
  const closeDrawer = () => {
    if (setMobileDrawerOpen) {
      setMobileDrawerOpen(false);
    }
  };

  const handleCategoryClick = (catId) => {
    setActiveCreatorId(null);
    setActiveCategory(catId);
    closeDrawer();
  };

  const handleCreatorClick = (creatorId) => {
    setActiveCategory("all");
    setActiveCreatorId(activeCreatorId === creatorId ? null : creatorId);
    closeDrawer();
  };

  const handleHomeClick = () => {
    resetToHome();
    closeDrawer();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileDrawerOpen && (
        <div
          className="sidebar-mobile-backdrop"
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      <aside
        className={`devtube-sidebar ${collapsed ? "collapsed" : ""} ${
          mobileDrawerOpen ? "mobile-open" : ""
        }`}
      >
        {/* Mobile-only Drawer Header */}
        <div className="mobile-drawer-header">
          <div className="brand-logo" onClick={handleHomeClick} title="DevTube Home">
            <YouTubeIcon size={26} />
            <span className="brand-text">
              DevTube<span className="country-pill">IN</span>
            </span>
          </div>
          <button
            type="button"
            className="icon-btn"
            onClick={closeDrawer}
            title="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Section 1: Core Navigation (Home, Long Form, Shorts, Subscriptions) */}
        <div className="sidebar-section">
          <button
            type="button"
            className={`sidebar-item ${
              activeCategory === "all" && !activeCreatorId && contentFormat === "all"
                ? "active"
                : ""
            }`}
            onClick={handleHomeClick}
            title="Home - All Sections"
          >
            <Home size={20} className="sidebar-icon" />
            <span>Home</span>
          </button>

          {/* Dedicated Long Form Section */}
          <button
            type="button"
            className={`sidebar-item ${contentFormat === "long" ? "active" : ""}`}
            onClick={() => {
              setContentFormat("long");
              closeDrawer();
            }}
            title="Long Form Courses & Tutorials"
          >
            <Video
              size={20}
              className="sidebar-icon"
              style={{ color: contentFormat === "long" ? "var(--flag-saffron)" : "inherit" }}
            />
            <span>Long Form Videos</span>
          </button>

          {/* Dedicated Short Form Section */}
          <button
            type="button"
            className={`sidebar-item ${contentFormat === "short" ? "active" : ""}`}
            onClick={() => {
              setContentFormat("short");
              if (onOpenShortsPlayer) onOpenShortsPlayer();
              closeDrawer();
            }}
            title="Short Form (Shorts)"
          >
            <Film size={20} className="sidebar-icon" style={{ color: "var(--yt-red)" }} />
            <span>Shorts</span>
          </button>

          <button
            type="button"
            className={`sidebar-item ${activeCategory === "indian_only" ? "active" : ""}`}
            onClick={() => handleCategoryClick("indian_only")}
            title="Subscriptions"
          >
            <Tv2 size={20} className="sidebar-icon" />
            <span>Subscriptions</span>
          </button>
        </div>

        {/* Section 2: "You" (History, Watch Later, Liked) */}
        <div className="sidebar-section">
          <div className="sidebar-heading">
            <span>You &gt;</span>
          </div>

          <button
            type="button"
            className="sidebar-item"
            onClick={() => {
              alert("Watch History: tracking your watched tutorials.");
              closeDrawer();
            }}
            title="History"
          >
            <History size={20} className="sidebar-icon" />
            <span>History</span>
          </button>

          <button
            type="button"
            className="sidebar-item"
            onClick={() => {
              setShowBookmarksModal(true);
              closeDrawer();
            }}
            title="Watch Later"
          >
            <Clock size={20} className="sidebar-icon" />
            <span>Watch Later</span>
          </button>

          <button
            type="button"
            className="sidebar-item"
            onClick={() => {
              setShowBookmarksModal(true);
              closeDrawer();
            }}
            title="Liked Videos"
          >
            <ThumbsUp size={20} className="sidebar-icon" />
            <span>Liked videos</span>
          </button>
        </div>

        {/* Section 3: Subscriptions / 🇮🇳 Indian Tech Creators */}
        <div className="sidebar-section">
          <div className="sidebar-heading">
            <span>🇮🇳 Indian Tech Creators</span>
          </div>

          {INDIAN_CREATORS.map((creator) => {
            const isSelected = activeCreatorId === creator.id;
            return (
              <button
                type="button"
                key={creator.id}
                className={`creator-sidebar-item ${isSelected ? "active" : ""}`}
                onClick={() => handleCreatorClick(creator.id)}
                title={`${creator.name} - ${creator.specialty}`}
              >
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="creator-sidebar-avatar"
                />
                <div className="creator-meta">
                  <div className="creator-name">{creator.name}</div>
                </div>
                <div className="unread-dot" />
              </button>
            );
          })}
        </div>

        {/* Section 4: Explore (Strictly Fullstack, Web Dev & AI) */}
        <div className="sidebar-section">
          <div className="sidebar-heading">
            <span>Explore Dev</span>
          </div>

          <button
            type="button"
            className={`sidebar-item ${activeCategory === "fullstack" ? "active" : ""}`}
            onClick={() => handleCategoryClick("fullstack")}
            title="Fullstack Web Dev"
          >
            <Layers size={20} className="sidebar-icon" />
            <span>Fullstack Web Dev</span>
          </button>

          <button
            type="button"
            className={`sidebar-item ${activeCategory === "webdev" ? "active" : ""}`}
            onClick={() => handleCategoryClick("webdev")}
            title="Web Development"
          >
            <Code2 size={20} className="sidebar-icon" />
            <span>Web Development</span>
          </button>

          <button
            type="button"
            className={`sidebar-item ${activeCategory === "ai" ? "active" : ""}`}
            onClick={() => handleCategoryClick("ai")}
            title="AI & Machine Learning"
          >
            <Brain size={20} className="sidebar-icon" />
            <span>AI & Machine Learning</span>
          </button>

          <button
            type="button"
            className={`sidebar-item ${activeCategory === "global_only" ? "active" : ""}`}
            onClick={() => handleCategoryClick("global_only")}
            title="Global Tech Masters"
          >
            <Globe size={20} className="sidebar-icon" />
            <span>Global Masters</span>
          </button>
        </div>

        {/* Section 5: Settings & Feedback */}
        <div className="sidebar-section">
          {setShowSettingsModal && (
            <button
              type="button"
              className="sidebar-item"
              onClick={() => {
                setShowSettingsModal(true);
                closeDrawer();
              }}
              title="YouTube Connection Settings"
            >
              <Settings size={20} className="sidebar-icon" />
              <span>YouTube Settings</span>
            </button>
          )}

          <button
            type="button"
            className="sidebar-item"
            onClick={() => {
              alert("DevTube version 2.0 • Distraction-free coding streams directly from YouTube.");
              closeDrawer();
            }}
            title="About DevTube"
          >
            <HelpCircle size={20} className="sidebar-icon" />
            <span>About DevTube</span>
          </button>
        </div>
      </aside>
    </>
  );
}
