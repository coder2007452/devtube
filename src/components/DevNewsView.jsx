import React, { useState, useMemo } from "react";
import {
  Newspaper,
  Flame,
  Radio,
  Video,
  Film,
  Bot,
  Layers,
  Code2,
  Flag,
  Sparkles,
  Search,
  Clock,
  Eye,
  Bookmark,
  ThumbsUp,
  Share2,
  Play,
  RotateCcw
} from "lucide-react";
import { DEV_NEWS_VIDEOS, getNewsStats } from "../data/mockNews";

export default function DevNewsView({
  onSelectVideo,
  onOpenShortsPlayer,
  watchLaterVideos = [],
  onToggleWatchLater,
  likedVideos = [],
  onToggleLike
}) {
  // Format Filter: "all" | "long" | "short" (User specifically requested: all videos, only long-form, only short-form)
  const [formatFilter, setFormatFilter] = useState("all");

  // Topic Filter: "all" | "ai" | "fullstack" | "webdev" | "indian_first"
  const [topicFilter, setTopicFilter] = useState("all");

  // Search Query within News
  const [searchQuery, setSearchQuery] = useState("");

  const stats = useMemo(() => getNewsStats(), []);

  // Filtered News Items
  const filteredVideos = useMemo(() => {
    let result = [...DEV_NEWS_VIDEOS];

    // 1. Format Filter
    if (formatFilter === "long") {
      result = result.filter((v) => !v.isShort);
    } else if (formatFilter === "short") {
      result = result.filter((v) => v.isShort);
    }

    // 2. Topic Filter
    if (topicFilter === "ai") {
      result = result.filter((v) => v.topic === "ai");
    } else if (topicFilter === "fullstack") {
      result = result.filter((v) => v.topic === "fullstack");
    } else if (topicFilter === "webdev") {
      result = result.filter((v) => v.topic === "webdev");
    } else if (topicFilter === "indian_first") {
      result.sort((a, b) => {
        if (a.isIndian && !b.isIndian) return -1;
        if (!a.isIndian && b.isIndian) return 1;
        return 0;
      });
    }

    // 3. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.channelTitle.toLowerCase().includes(q) ||
          v.summary.toLowerCase().includes(q) ||
          (v.topicLabel && v.topicLabel.toLowerCase().includes(q))
      );
    }

    return result;
  }, [formatFilter, topicFilter, searchQuery]);

  // Handle Video Click (Long vs Short)
  const handleItemClick = (item) => {
    if (item.isShort) {
      if (onOpenShortsPlayer) {
        onOpenShortsPlayer(item.id);
      } else if (onSelectVideo) {
        onSelectVideo(item);
      }
    } else {
      if (onSelectVideo) {
        onSelectVideo(item);
      }
    }
  };

  const isSaved = (videoId) => watchLaterVideos.some((v) => v.id === videoId);
  const isLiked = (videoId) => likedVideos.some((v) => v.id === videoId);

  return (
    <div className="dev-news-container">
      {/* ==========================================================
          HEADER: NEWS & TECH UPDATES HUB
          ========================================================== */}
      <div className="news-header-banner">
        <div className="news-banner-content">
          <div className="news-live-tag">
            <span className="live-pulse-dot" />
            <Radio size={14} className="live-icon" />
            <span>DEV NEWS & TECH UPDATES</span>
          </div>

          <h1 className="news-main-title">
            Today's Developer Updates & Tech News
          </h1>

          <p className="news-main-subtitle">
            Curated YouTuber video updates on <strong>AI / ML breakthroughs</strong>,{" "}
            <strong>Full-Stack architectures</strong>, and <strong>Modern Web Development</strong>.
            Prioritizing top Indian educators 🇮🇳 alongside the latest global code reports.
          </p>

          {/* Quick Metrics Bar */}
          <div className="news-stats-row">
            <div className="news-stat-chip">
              <Newspaper size={14} style={{ color: "var(--flag-saffron)" }} />
              <span>{stats.total} Total Updates</span>
            </div>
            <div className="news-stat-chip">
              <Bot size={14} style={{ color: "#a855f7" }} />
              <span>{stats.aiCount} AI / ML</span>
            </div>
            <div className="news-stat-chip">
              <Layers size={14} style={{ color: "#3b82f6" }} />
              <span>{stats.fullstackCount} Full-Stack</span>
            </div>
            <div className="news-stat-chip">
              <Code2 size={14} style={{ color: "#10b981" }} />
              <span>{stats.webdevCount} Web Dev</span>
            </div>
            <div className="news-stat-chip">
              <Flag size={14} style={{ color: "var(--flag-saffron)" }} />
              <span>{stats.indianCount} 🇮🇳 Indian First</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================================
          FILTER BAR: FORMAT (USER REQUESTED) + TOPIC + SEARCH
          ========================================================== */}
      <div className="news-controls-section">
        <div className="news-controls-top">
          {/* FILTER 1: FORMAT FILTER (All Videos | Long-Form Only | Shorts Only) */}
          <div className="news-format-tabs" role="tablist" aria-label="Format filter">
            <button
              type="button"
              className={`news-format-btn ${formatFilter === "all" ? "active" : ""}`}
              onClick={() => setFormatFilter("all")}
            >
              <Flame size={15} />
              <span>All Formats</span>
              <span className="news-tab-count">{stats.total}</span>
            </button>

            <button
              type="button"
              className={`news-format-btn ${formatFilter === "long" ? "active" : ""}`}
              onClick={() => setFormatFilter("long")}
            >
              <Video size={15} />
              <span>Long Form Videos</span>
              <span className="news-tab-count">{stats.longCount}</span>
            </button>

            <button
              type="button"
              className={`news-format-btn ${formatFilter === "short" ? "active" : ""}`}
              onClick={() => setFormatFilter("short")}
            >
              <Film size={15} />
              <span>Shorts (60s Updates)</span>
              <span className="news-tab-count">{stats.shortCount}</span>
            </button>
          </div>

          {/* Instant Search Bar */}
          <div className="news-search-box">
            <Search size={16} className="news-search-icon" />
            <input
              type="text"
              placeholder="Search updates (e.g. DeepSeek, React 19, Cursor, Bun)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="news-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="news-search-clear"
                onClick={() => setSearchQuery("")}
                title="Clear news search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* FILTER 2: TOPIC PILLS (AI / ML, Full-Stack, Web Dev, Indian First) */}
        <div className="news-topic-pills">
          <button
            type="button"
            className={`news-topic-pill ${topicFilter === "all" ? "active" : ""}`}
            onClick={() => setTopicFilter("all")}
          >
            <span>All Updates</span>
          </button>

          <button
            type="button"
            className={`news-topic-pill ${topicFilter === "ai" ? "active" : ""}`}
            onClick={() => setTopicFilter("ai")}
          >
            <Bot size={14} style={{ color: "#c084fc" }} />
            <span>🤖 AI & ML Updates</span>
          </button>

          <button
            type="button"
            className={`news-topic-pill ${topicFilter === "fullstack" ? "active" : ""}`}
            onClick={() => setTopicFilter("fullstack")}
          >
            <Layers size={14} style={{ color: "#60a5fa" }} />
            <span>⚡ Full-Stack & Web Stack</span>
          </button>

          <button
            type="button"
            className={`news-topic-pill ${topicFilter === "webdev" ? "active" : ""}`}
            onClick={() => setTopicFilter("webdev")}
          >
            <Code2 size={14} style={{ color: "#34d399" }} />
            <span>🌐 Web Development</span>
          </button>

          <button
            type="button"
            className={`news-topic-pill ${topicFilter === "indian_first" ? "active" : ""}`}
            onClick={() => setTopicFilter("indian_first")}
          >
            <Sparkles size={14} style={{ color: "var(--flag-saffron)" }} />
            <span>🇮🇳 Indian Creators First</span>
          </button>
        </div>
      </div>

      {/* ==========================================================
          NEWS VIDEO GRID (LONG FORM & SHORTS)
          ========================================================== */}
      {filteredVideos.length === 0 ? (
        <div className="news-empty-state">
          <Newspaper size={44} style={{ color: "var(--yt-text-secondary)", opacity: 0.5 }} />
          <h3>No updates match your filters</h3>
          <p>Try clearing your search query or selecting "All Formats" to see all developer news.</p>
          <button
            type="button"
            className="filter-pill-btn"
            onClick={() => {
              setFormatFilter("all");
              setTopicFilter("all");
              setSearchQuery("");
            }}
          >
            <RotateCcw size={14} />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="news-grid">
          {filteredVideos.map((item) => {
            const saved = isSaved(item.id);
            const liked = isLiked(item.id);

            return (
              <article
                key={item.id}
                className={`news-card ${item.isShort ? "is-short-card" : "is-long-card"}`}
              >
                {/* Thumbnail Container */}
                <div
                  className="news-thumb-wrapper"
                  onClick={() => handleItemClick(item)}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="news-thumb-img"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  {/* Breaking Badge */}
                  {item.breakingBadge && (
                    <span
                      className={`news-badge ${
                        item.isShort
                          ? "badge-short"
                          : item.breakingBadge.includes("UPDATE")
                          ? "badge-today"
                          : item.breakingBadge.includes("AI")
                          ? "badge-ai"
                          : "badge-hot"
                      }`}
                    >
                      {item.breakingBadge}
                    </span>
                  )}

                  {/* Format & Duration Badge */}
                  <span className="news-duration-badge">
                    {item.isShort ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
                        <Film size={11} /> 60s
                      </span>
                    ) : (
                      item.duration
                    )}
                  </span>

                  {/* Play Overlay on Hover */}
                  <div className="news-play-hover">
                    <div className="news-play-circle">
                      <Play size={20} fill="#fff" />
                    </div>
                  </div>
                </div>

                {/* News Card Content */}
                <div className="news-content-body">
                  {/* Category Pill + Relative Time */}
                  <div className="news-meta-top">
                    <span
                      className={`news-topic-tag ${
                        item.topic === "ai"
                          ? "tag-ai"
                          : item.topic === "fullstack"
                          ? "tag-fullstack"
                          : "tag-webdev"
                      }`}
                    >
                      {item.topic === "ai" ? (
                        <Bot size={12} />
                      ) : item.topic === "fullstack" ? (
                        <Layers size={12} />
                      ) : (
                        <Code2 size={12} />
                      )}
                      <span>{item.topicLabel}</span>
                    </span>

                    <span className="news-publish-time">
                      <Clock size={11} />
                      <span>{item.publishedTime}</span>
                    </span>
                  </div>

                  {/* Video Title */}
                  <h3
                    className="news-video-title"
                    onClick={() => handleItemClick(item)}
                    title={item.title}
                  >
                    {item.title}
                  </h3>

                  {/* Summary Snippet */}
                  <p className="news-snippet">{item.summary}</p>

                  {/* Channel Details & Actions */}
                  <div className="news-footer-row">
                    <div className="news-channel-info">
                      <img
                        src={item.channelAvatar}
                        alt={item.channelTitle}
                        className="news-channel-avatar"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="news-channel-meta">
                        <span className="news-channel-name">
                          {item.channelTitle}
                          {item.isIndian && (
                            <span className="news-indian-badge" title="Top Indian Tech Educator">
                              🇮🇳 IN
                            </span>
                          )}
                        </span>
                        <span className="news-views-count">
                          <Eye size={11} />
                          <span>{item.views}</span>
                        </span>
                      </div>
                    </div>

                    {/* Quick Card Action Buttons */}
                    <div className="news-card-actions">
                      <button
                        type="button"
                        className={`news-action-btn ${liked ? "active" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onToggleLike) onToggleLike(item);
                        }}
                        title={liked ? "Unlike video" : "Like video"}
                      >
                        <ThumbsUp size={14} fill={liked ? "currentColor" : "none"} />
                      </button>

                      <button
                        type="button"
                        className={`news-action-btn ${saved ? "active" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onToggleWatchLater) onToggleWatchLater(item);
                        }}
                        title={saved ? "Remove from Watch Later" : "Save to Watch Later"}
                      >
                        <Bookmark size={14} fill={saved ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
