import React, { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import FormatTabs from "./components/FormatTabs";
import TopicPills from "./components/TopicPills";
import IndianCreatorsStrip from "./components/IndianCreatorsStrip";
import VideoGrid from "./components/VideoGrid";
import WatchPage from "./components/WatchPage";
import ShortsPlayer from "./components/ShortsPlayer";
import ShortsShelf from "./components/ShortsShelf";
import ShortsGrid from "./components/ShortsGrid";
import ChannelSearchCard from "./components/ChannelSearchCard";
import ApiSettingsModal from "./components/ApiSettingsModal";
import BookmarksModal from "./components/BookmarksModal";
import MobileBottomNav from "./components/MobileBottomNav";
import { getVideos, getStoredApiKey, findMatchingCreator, fetchLiveBackendSearch } from "./services/youtubeApi";
import { DEV_SHORTS } from "./data/mockVideos";
import { Sparkles, Flag, Globe, Video, Search, Loader2 } from "lucide-react";
import "./styles/devtube.css";

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("indian_first"); // "indian_first" | "indian_only" | "all"
  const [activeCreatorId, setActiveCreatorId] = useState(null);

  // Content Format: "all" | "long" | "short"
  const [contentFormat, setContentFormat] = useState("all");

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Shorts Player overlay
  const [activeShortId, setActiveShortId] = useState(null);

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showBookmarksModal, setShowBookmarksModal] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(Boolean(getStoredApiKey()));

  // Detect if current search query matches a Channel Name
  const matchedChannelCreator = searchQuery ? findMatchingCreator(searchQuery) : null;

  // Bookmarks saved in localStorage
  const [bookmarkedVideos, setBookmarkedVideos] = useState(() => {
    try {
      const saved = localStorage.getItem("devtube_bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save bookmarks on change
  useEffect(() => {
    localStorage.setItem("devtube_bookmarks", JSON.stringify(bookmarkedVideos));
  }, [bookmarkedVideos]);

  // Load videos based on active filters (Long form)
  const loadVideos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getVideos({
        query: searchQuery,
        category: activeCategory,
        priorityFilter: priorityFilter,
        creatorId: activeCreatorId
      });

      // Strict requirement: filter out any video without a thumbnail
      const validVideos = (data || []).filter(
        (v) => Boolean(v && v.id && v.thumbnail && v.thumbnail.trim() !== "")
      );

      setVideos(validVideos);
    } catch (err) {
      console.error("Error loading videos:", err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, activeCategory, priorityFilter, activeCreatorId]);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  // Load More videos from YouTube
  const [loadingMore, setLoadingMore] = useState(false);
  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      const more = await fetchLiveBackendSearch({
        query: searchQuery,
        creatorName: matchedChannelCreator ? matchedChannelCreator.name : "",
        isChannel: Boolean(matchedChannelCreator),
        category: activeCategory,
        limit: 80
      });
      if (more && Array.isArray(more.videos) && more.videos.length > 0) {
        setVideos((prev) => {
          const map = new Map();
          prev.forEach((v) => map.set(v.id, v));
          more.videos.forEach((v) => {
            if (!map.has(v.id) && v.thumbnail && v.thumbnail.trim() !== "") {
              map.set(v.id, {
                ...v,
                channelId: matchedChannelCreator ? matchedChannelCreator.id : v.channelId,
                channelTitle: matchedChannelCreator ? matchedChannelCreator.name : v.channelTitle,
                isIndian: matchedChannelCreator ? (matchedChannelCreator.isIndian ?? true) : v.isIndian
              });
            }
          });
          return Array.from(map.values());
        });
      }
    } catch (err) {
      console.warn("Load more notice:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  // Handle Search Submission
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setSelectedVideo(null);
    setActiveShortId(null);
    loadVideos();
  };

  // Toggle Bookmark
  const handleToggleBookmark = (video) => {
    setBookmarkedVideos((prev) => {
      const exists = prev.some((v) => v.id === video.id);
      if (exists) {
        return prev.filter((v) => v.id !== video.id);
      } else {
        return [video, ...prev];
      }
    });
  };

  // Open Shorts Player
  const handleOpenShortsPlayer = (shortId = null) => {
    setSelectedVideo(null);
    setActiveShortId(shortId || DEV_SHORTS[0]?.id);
  };

  // Reset to Home
  const resetToHome = () => {
    setSelectedVideo(null);
    setActiveShortId(null);
    setContentFormat("all");
    setSearchQuery("");
    setActiveCategory("all");
    setActiveCreatorId(null);
    setPriorityFilter("indian_first");
  };

  // Shorts count for current view (or for matched creator if channel searched)
  const relevantShorts = DEV_SHORTS.filter((s) => {
    const hasThumb = Boolean(s && s.id && s.thumbnail && s.thumbnail.trim() !== "");
    if (!hasThumb) return false;
    if (matchedChannelCreator) {
      return s.channelId === matchedChannelCreator.id;
    }
    if (activeCreatorId) {
      return s.channelId === activeCreatorId;
    }
    return true;
  });

  return (
    <div className="devtube-app">
      {/* Fixed Top Header (Exact YouTube Dark Look) */}
      <Header
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        mobileDrawerOpen={mobileDrawerOpen}
        setMobileDrawerOpen={setMobileDrawerOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchSubmit={handleSearchSubmit}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        bookmarkedVideos={bookmarkedVideos}
        setShowBookmarksModal={setShowBookmarksModal}
        setShowSettingsModal={setShowSettingsModal}
        hasApiKey={hasApiKey}
        resetToHome={resetToHome}
      />

      <div className="devtube-container">
        {/* Left Collapsible YouTube Sidebar (and Mobile Drawer) */}
        {!selectedVideo && !activeShortId && (
          <Sidebar
            collapsed={sidebarCollapsed}
            mobileDrawerOpen={mobileDrawerOpen}
            setMobileDrawerOpen={setMobileDrawerOpen}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeCreatorId={activeCreatorId}
            setActiveCreatorId={setActiveCreatorId}
            setShowBookmarksModal={setShowBookmarksModal}
            setShowSettingsModal={setShowSettingsModal}
            resetToHome={resetToHome}
            contentFormat={contentFormat}
            setContentFormat={setContentFormat}
            onOpenShortsPlayer={handleOpenShortsPlayer}
          />
        )}

        {/* Main Content Area */}
        <main
          className={`devtube-main ${
            selectedVideo || activeShortId
              ? "watch-mode"
              : sidebarCollapsed
              ? "sidebar-collapsed"
              : ""
          }`}
        >
          {selectedVideo ? (
            /* ==========================================================
               EXACT YOUTUBE WATCH PAGE (LONG FORM)
               ========================================================== */
            <WatchPage
              video={selectedVideo}
              onBackToFeed={() => setSelectedVideo(null)}
              onSelectVideo={(v) => setSelectedVideo(v)}
              allVideos={videos}
              isBookmarked={bookmarkedVideos.some((b) => b.id === selectedVideo.id)}
              onToggleBookmark={handleToggleBookmark}
            />
          ) : activeShortId ? (
            /* ==========================================================
               YOUTUBE SHORTS FULL PLAYER
               ========================================================== */
            <ShortsPlayer
              initialShortId={activeShortId}
              onBackToFeed={() => setActiveShortId(null)}
              bookmarkedVideos={bookmarkedVideos}
              onToggleBookmark={handleToggleBookmark}
            />
          ) : (
            /* ==========================================================
               YOUTUBE SEARCH & FEED VIEW WITH CHANNEL AWARENESS
               ========================================================== */
            <>
              {/* Content Notice Banner */}
              <div className="topic-guard-banner">
                <div className="banner-left">
                  <span className="banner-flag">🇮🇳</span>
                  <div>
                    <div className="banner-title">
                      YouTube Developer Edition • Strict Fullstack & AI Feed
                    </div>
                    <div className="banner-subtitle">
                      Filtering only <strong>Fullstack Web Dev, Web Development & AI</strong>. Prioritizing top Indian Tech YouTubers first.
                    </div>
                  </div>
                </div>

                <div className="banner-filters">
                  <button
                    className={`filter-pill-btn ${
                      priorityFilter === "indian_first" ? "active" : ""
                    }`}
                    onClick={() => setPriorityFilter("indian_first")}
                    title="Sort Indian Tech Creators to the top"
                  >
                    <Sparkles size={13} />
                    <span>🇮🇳 Indian First</span>
                  </button>

                  <button
                    className={`filter-pill-btn ${
                      priorityFilter === "indian_only" ? "active" : ""
                    }`}
                    onClick={() => setPriorityFilter("indian_only")}
                    title="Show only Indian Creators"
                  >
                    <Flag size={13} />
                    <span>🇮🇳 Indian Only</span>
                  </button>

                  <button
                    className={`filter-pill-btn ${
                      priorityFilter === "all" ? "active" : ""
                    }`}
                    onClick={() => setPriorityFilter("all")}
                    title="Show all creators equally"
                  >
                    <Globe size={13} />
                    <span>🌐 All Creators</span>
                  </button>
                </div>
              </div>

              {/* ==========================================================
                  CHANNEL SEARCH MATCH CARD:
                  If user searched a channel name, show the full channel card!
                  ========================================================== */}
              {matchedChannelCreator && (
                <ChannelSearchCard
                  creator={matchedChannelCreator}
                  longCount={videos.length}
                  shortsCount={relevantShorts.length}
                  contentFormat={contentFormat}
                  setContentFormat={setContentFormat}
                />
              )}

              {/* YouTube Format Separation Tabs (Long Form vs Short Form) */}
              <FormatTabs
                contentFormat={contentFormat}
                setContentFormat={setContentFormat}
                longCount={videos.length}
                shortsCount={relevantShorts.length}
              />

              {/* Category Pills (When browsing general feed or topics) */}
              {contentFormat !== "short" && !matchedChannelCreator && (
                <TopicPills
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  activeCreatorId={activeCreatorId}
                  setActiveCreatorId={setActiveCreatorId}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  triggerSearch={(q) => {
                    setSearchQuery(q);
                  }}
                />
              )}

              {/* Featured Indian Tech Creators Carousel (When on home view) */}
              {!searchQuery && !activeCreatorId && activeCategory !== "global_only" && (
                <IndianCreatorsStrip
                  activeCreatorId={activeCreatorId}
                  setActiveCreatorId={setActiveCreatorId}
                  setActiveCategory={setActiveCategory}
                />
              )}

              {/* Normal Topic / Video Search indicator */}
              {searchQuery && !matchedChannelCreator && (
                <div className="feed-indicator-banner">
                  <div className="feed-indicator-left">
                    <Search size={16} style={{ color: "var(--yt-blue)", flexShrink: 0 }} />
                    <span>
                      Topic search: <strong style={{ color: "var(--yt-text-primary)" }}>"{searchQuery}"</strong>
                    </span>
                  </div>
                  <button className="filter-pill-btn" onClick={() => setSearchQuery("")}>
                    Clear Search ✕
                  </button>
                </div>
              )}

              {/* Active Creator Filter Indicator */}
              {activeCreatorId && (
                <div className="feed-indicator-banner">
                  <div className="feed-indicator-left" style={{ fontWeight: "600" }}>
                    Filtered: <span style={{ color: "var(--flag-saffron)" }}>{activeCreatorId}</span>
                  </div>
                  <button
                    className="filter-pill-btn"
                    onClick={() => setActiveCreatorId(null)}
                  >
                    View All Creators ✕
                  </button>
                </div>
              )}

              {/* ==========================================================
                  SECTION 1: SHORT FORM ONLY (When user selects Short Form)
                  ========================================================== */}
              {contentFormat === "short" && (
                <ShortsGrid
                  onSelectShort={(shortId) => handleOpenShortsPlayer(shortId)}
                  activeCreatorId={matchedChannelCreator ? matchedChannelCreator.id : activeCreatorId}
                  priorityFilter={priorityFilter}
                />
              )}

              {/* ==========================================================
                  SECTION 2: ALL FORMATS OR LONG FORM
                  ========================================================== */}
              {contentFormat !== "short" && (
                <>
                  {/* Long Form Section Header */}
                  <div className="long-form-section-header">
                    <div className="long-form-header-left">
                      <Video size={20} style={{ color: "var(--flag-saffron)", flexShrink: 0 }} />
                      <h2 className="long-form-header-title">
                        {matchedChannelCreator
                          ? `All Videos by ${matchedChannelCreator.name}`
                          : "Long Form Section • Courses & Tutorials"}
                      </h2>
                    </div>
                    <span className="long-form-header-meta">
                      {matchedChannelCreator
                        ? `${videos.length} courses from this channel`
                        : "Full length developer bootcamps & masterclasses"}
                    </span>
                  </div>

                  {/* Long Form Video Grid */}
                  {loading ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "300px",
                        color: "var(--yt-text-secondary)",
                        fontSize: "1rem"
                      }}
                    >
                      Loading verified YouTube courses...
                    </div>
                  ) : (
                    <>
                      <VideoGrid
                        videos={videos}
                        onSelectVideo={(v) => setSelectedVideo(v)}
                        bookmarkedVideos={bookmarkedVideos}
                        onToggleBookmark={handleToggleBookmark}
                        resetFilters={resetToHome}
                        priorityFilter={priorityFilter}
                      />

                      {/* Load More from YouTube button */}
                      {videos.length > 0 && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "32px",
                            marginBottom: "16px"
                          }}
                        >
                          <button
                            className="filter-pill-btn"
                            onClick={handleLoadMore}
                            disabled={loadingMore}
                            style={{
                              padding: "10px 24px",
                              fontSize: "0.92rem",
                              fontWeight: "600",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              cursor: loadingMore ? "wait" : "pointer",
                              background: "var(--yt-bg-surface)",
                              border: "1px solid var(--yt-border-subtle)"
                            }}
                          >
                            {loadingMore ? (
                              <>
                                <Loader2 size={16} className="animate-spin" />
                                <span>Fetching more live courses from YouTube...</span>
                              </>
                            ) : (
                              <>
                                <span>⚡ Load More {matchedChannelCreator ? `${matchedChannelCreator.name} Videos` : "Videos from YouTube"}</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {/* Separated Short Form Shelf (Shown when browsing All Sections) */}
                  {contentFormat === "all" && !activeCreatorId && activeCategory !== "global_only" && (
                    <div style={{ marginTop: "40px" }}>
                      <ShortsShelf
                        onSelectShort={(shortId) => handleOpenShortsPlayer(shortId)}
                      />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </main>
      </div>

      {/* YouTube API Connection Settings Modal */}
      {showSettingsModal && (
        <ApiSettingsModal
          onClose={() => setShowSettingsModal(false)}
          onApiKeyUpdated={(hasKey) => {
            setHasApiKey(hasKey);
            loadVideos();
          }}
        />
      )}

      {/* Bookmarks / Watch Later Modal */}
      <BookmarksModal
        isOpen={showBookmarksModal}
        onClose={() => setShowBookmarksModal(false)}
        bookmarkedVideos={bookmarkedVideos}
        onSelectVideo={(v) => {
          setSelectedVideo(v);
          setActiveShortId(null);
          setShowBookmarksModal(false);
        }}
        onRemoveBookmark={(id) =>
          setBookmarkedVideos((prev) => prev.filter((v) => v.id !== id))
        }
        onClearAll={() => setBookmarkedVideos([])}
      />

      {/* YouTube Mobile Bottom Navigation Bar (Shows on Mobile when browsing feed) */}
      {!selectedVideo && !activeShortId && (
        <MobileBottomNav
          activeCategory={activeCategory}
          contentFormat={contentFormat}
          setContentFormat={setContentFormat}
          resetToHome={resetToHome}
          onOpenShortsPlayer={handleOpenShortsPlayer}
          setShowBookmarksModal={setShowBookmarksModal}
          bookmarkedCount={bookmarkedVideos.length}
          onOpenDrawer={() => setMobileDrawerOpen(true)}
        />
      )}
    </div>
  );
}
