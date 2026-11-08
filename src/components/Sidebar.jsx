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
  Settings,
  GraduationCap,
  FolderGit2,
  Bot,
  LayoutGrid,
  ListVideo,
  Newspaper,
  Flame
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
  onOpenShortsPlayer,
  currentView = "home",
  setCurrentView,
  watchLaterCount = 0,
  likedCount = 0,
  historyCount = 0
}) {
  const closeDrawer = () => {
    if (setMobileDrawerOpen) {
      setMobileDrawerOpen(false);
    }
  };

  const handleCategoryClick = (catId) => {
    if (setCurrentView) {
      setCurrentView("home");
    }
    setActiveCreatorId(null);
    if (setContentFormat) {
      setContentFormat("all");
    }
    setActiveCategory(catId);
    closeDrawer();
  };

  const handleCreatorClick = (creatorId) => {
    if (setCurrentView) {
      setCurrentView("home");
    }
    setActiveCategory("all");
    setActiveCreatorId(activeCreatorId === creatorId ? null : creatorId);
    closeDrawer();
  };

  const handleHomeClick = () => {
    if (setCurrentView) {
      setCurrentView("home");
    }
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
          <div className="brand-logo" onClick={handleHomeClick} title="StackTube Home">
            <YouTubeIcon size={26} />
            <span className="brand-text">
              StackTube<span className="country-pill">IN</span>
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

        {/* Section 1: Main Explore & Feed */}
        <div className="sidebar-section">
          <button
            type="button"
            className={`sidebar-item ${
              currentView === "home" && activeCategory === "all" && !activeCreatorId && contentFormat === "all"
                ? "active"
                : ""
            }`}
            onClick={handleHomeClick}
            title="Home - All Feeds"
          >
            <Home size={20} className="sidebar-icon" />
            <span>Home</span>
          </button>

          {/* Categories Button (Requested by user as in HackerTube reference photo) */}
          <button
            type="button"
            className={`sidebar-item ${currentView === "categories" ? "active" : ""}`}
            onClick={() => {
              if (setCurrentView) setCurrentView("categories");
              closeDrawer();
            }}
            title="Browse All Categories"
          >
            <LayoutGrid
              size={20}
              className="sidebar-icon"
              style={{ color: currentView === "categories" ? "#fff" : "var(--flag-saffron)" }}
            />
            <span>Categories</span>
          </button>

          {/* Playlists Button (Requested by user) */}
          <button
            type="button"
            className={`sidebar-item ${currentView === "playlists" ? "active" : ""}`}
            onClick={() => {
              if (setCurrentView) setCurrentView("playlists");
              closeDrawer();
            }}
            title="Popular Developer Playlists"
          >
            <ListVideo
              size={20}
              className="sidebar-icon"
              style={{ color: currentView === "playlists" ? "#fff" : "var(--yt-blue)" }}
            />
            <span>Playlists</span>
          </button>

          {/* Dev News & Tech Updates (Requested by user: AI/ML, Fullstack, Web Dev updates) */}
          <button
            type="button"
            className={`sidebar-item ${currentView === "news" ? "active" : ""}`}
            onClick={() => {
              if (setCurrentView) setCurrentView("news");
              closeDrawer();
            }}
            title="Dev News & Tech Updates (AI/ML, Web Dev, Fullstack)"
          >
            <Newspaper
              size={20}
              className="sidebar-icon"
              style={{ color: currentView === "news" ? "#fff" : "#ef4444" }}
            />
            <span>Dev News</span>
            <span
              style={{
                marginLeft: "auto",
                backgroundColor: "#dc2626",
                color: "#fff",
                fontSize: "0.65rem",
                fontWeight: "700",
                padding: "1px 5px",
                borderRadius: "4px",
                letterSpacing: "0.04em"
              }}
            >
              LIVE
            </span>
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

          {/* <button
            type="button"
            className={`sidebar-item ${activeCategory === "indian_only" && currentView === "home" ? "active" : ""}`}
            onClick={() => handleCategoryClick("indian_only")}
            title="Subscriptions"
          >
            <Tv2 size={20} className="sidebar-icon" />
            <span>Subscriptions</span>
          </button> */}
        </div>

        {/* Section 2: TUTORIAL & PROJECTS (Dedicated Hands-on Project Section) */}
        <div className="sidebar-section tutorial-sidebar-section">
          <div className="sidebar-heading tutorial-heading">
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <GraduationCap size={16} style={{ color: "var(--flag-saffron)" }} />
              <span>Tutorial</span>
            </span>
          </div>

          {/* All Project Tutorials */}
          <button
            type="button"
            className={`sidebar-item tutorial-item ${
              currentView === "home" && activeCategory === "tutorials" ? "active" : ""
            }`}
            onClick={() => handleCategoryClick("tutorials")}
            title="All Tutorials & Projects to Build"
          >
            <FolderGit2
              size={20}
              className="sidebar-icon"
              style={{ color: activeCategory === "tutorials" && currentView === "home" ? "#fff" : "var(--flag-saffron)" }}
            />
            <span className="sidebar-item-label">All Tutorials</span>
            <span className="sidebar-pill-badge project-badge">Build</span>
          </button>

          {/* AI Projects */}
          <button
            type="button"
            className={`sidebar-item tutorial-item ${
              currentView === "home" && activeCategory === "project_ai" ? "active" : ""
            }`}
            onClick={() => handleCategoryClick("project_ai")}
            title="AI & Generative AI Projects"
          >
            <Bot
              size={20}
              className="sidebar-icon"
              style={{ color: activeCategory === "project_ai" && currentView === "home" ? "#fff" : "#c084fc" }}
            />
            <span className="sidebar-item-label">AI Projects</span>
            <span className="sidebar-pill-badge ai-badge">AI</span>
          </button>

          {/* Web Development Projects */}
          <button
            type="button"
            className={`sidebar-item tutorial-item ${
              currentView === "home" && activeCategory === "project_webdev" ? "active" : ""
            }`}
            onClick={() => handleCategoryClick("project_webdev")}
            title="Web Development Projects"
          >
            <Code2
              size={20}
              className="sidebar-icon"
              style={{ color: activeCategory === "project_webdev" && currentView === "home" ? "#fff" : "var(--yt-blue)" }}
            />
            <span className="sidebar-item-label">Web Dev Projects</span>
            <span className="sidebar-pill-badge web-badge">Web</span>
          </button>

          {/* Full-Stack Web Development Projects */}
          <button
            type="button"
            className={`sidebar-item tutorial-item ${
              currentView === "home" && activeCategory === "project_fullstack" ? "active" : ""
            }`}
            onClick={() => handleCategoryClick("project_fullstack")}
            title="Full-Stack Web Development Projects"
          >
            <Layers
              size={20}
              className="sidebar-icon"
              style={{ color: activeCategory === "project_fullstack" && currentView === "home" ? "#fff" : "#34d399" }}
            />
            <span className="sidebar-item-label">Full-Stack Projects</span>
            <span className="sidebar-pill-badge fullstack-badge">Fullstack</span>
          </button>
        </div>

        {/* Section 3: "You" (History, Watch Later, Liked) - Full Persistent Features */}
        <div className="sidebar-section">
          <div className="sidebar-heading">
            <span>You &gt;</span>
          </div>

          <button
            type="button"
            className={`sidebar-item ${currentView === "history" ? "active" : ""}`}
            onClick={() => {
              if (setCurrentView) setCurrentView("history");
              closeDrawer();
            }}
            title="Watch History"
          >
            <History size={20} className="sidebar-icon" />
            <span className="sidebar-item-label">History</span>
            {historyCount > 0 && <span className="sidebar-count-text">{historyCount}</span>}
          </button>

          <button
            type="button"
            className={`sidebar-item ${currentView === "watch_later" ? "active" : ""}`}
            onClick={() => {
              if (setCurrentView) setCurrentView("watch_later");
              closeDrawer();
            }}
            title="Watch Later"
          >
            <Clock size={20} className="sidebar-icon" />
            <span className="sidebar-item-label">Watch Later</span>
            {watchLaterCount > 0 && <span className="sidebar-count-text">{watchLaterCount}</span>}
          </button>

          <button
            type="button"
            className={`sidebar-item ${currentView === "liked" ? "active" : ""}`}
            onClick={() => {
              if (setCurrentView) setCurrentView("liked");
              closeDrawer();
            }}
            title="Liked Videos"
          >
            <ThumbsUp size={20} className="sidebar-icon" />
            <span className="sidebar-item-label">Liked videos</span>
            {likedCount > 0 && <span className="sidebar-count-text">{likedCount}</span>}
          </button>
        </div>

        {/* Section 4: Subscriptions / 🇮🇳 Indian Tech Creators */}
        <div className="sidebar-section">
          <div className="sidebar-heading">
            <span>🇮🇳 Indian Tech Creators</span>
          </div>

          {INDIAN_CREATORS.map((creator) => {
            const isSelected = activeCreatorId === creator.id && currentView === "home";
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
                  referrerPolicy="no-referrer"
                />
                <div className="creator-meta">
                  <div className="creator-name">{creator.name}</div>
                </div>
                <div className="unread-dot" />
              </button>
            );
          })}
        </div>

        {/* Section 5: Explore (Strictly Fullstack, Web Dev & AI) */}
        <div className="sidebar-section">
          <div className="sidebar-heading">
            <span>Explore Dev</span>
          </div>

          <button
            type="button"
            className={`sidebar-item ${activeCategory === "fullstack" && currentView === "home" ? "active" : ""}`}
            onClick={() => handleCategoryClick("fullstack")}
            title="Fullstack Web Dev"
          >
            <Layers size={20} className="sidebar-icon" />
            <span>Fullstack Web Dev</span>
          </button>

          <button
            type="button"
            className={`sidebar-item ${activeCategory === "webdev" && currentView === "home" ? "active" : ""}`}
            onClick={() => handleCategoryClick("webdev")}
            title="Web Development"
          >
            <Code2 size={20} className="sidebar-icon" />
            <span>Web Development</span>
          </button>

          <button
            type="button"
            className={`sidebar-item ${activeCategory === "ai" && currentView === "home" ? "active" : ""}`}
            onClick={() => handleCategoryClick("ai")}
            title="AI & Machine Learning"
          >
            <Brain size={20} className="sidebar-icon" />
            <span>AI & Machine Learning</span>
          </button>

          <button
            type="button"
            className={`sidebar-item ${activeCategory === "global_only" && currentView === "home" ? "active" : ""}`}
            onClick={() => handleCategoryClick("global_only")}
            title="Global Tech Masters"
          >
            <Globe size={20} className="sidebar-icon" />
            <span>Global Masters</span>
          </button>
        </div>

        {/* Section 6: Settings & About */}
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
              alert("StackTube version 2.0 • Distraction-free coding streams directly from YouTube.");
              closeDrawer();
            }}
            title="About StackTube"
          >
            <HelpCircle size={20} className="sidebar-icon" />
            <span>About StackTube</span>
          </button>
        </div>
      </aside>
    </>
  );
}
