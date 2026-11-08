import React, { useState } from "react";
import { POPULAR_PLAYLISTS } from "../data/mockPlaylists";
import { ListVideo, Play, CheckCircle2, Sparkles, Filter, ExternalLink } from "lucide-react";

export default function PlaylistsView({
  onSelectPlaylistVideo,
  onSelectCategory
}) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("all");

  const filterTabs = [
    { id: "all", label: "All Playlists" },
    { id: "indian_only", label: "🇮🇳 Indian First" },
    { id: "fullstack", label: "💻 Full-Stack" },
    { id: "ai", label: "🤖 AI & Machine Learning" },
    { id: "webdev", label: "🌐 Web Development" }
  ];

  const filteredPlaylists = POPULAR_PLAYLISTS.filter((pl) => {
    if (activeCategoryFilter === "indian_only") return pl.isIndian;
    if (activeCategoryFilter === "fullstack") return pl.category === "fullstack";
    if (activeCategoryFilter === "ai") return pl.category === "ai";
    if (activeCategoryFilter === "webdev") return pl.category === "webdev";
    return true;
  });

  return (
    <div className="playlists-view-container">
      {/* Header */}
      <div className="playlists-header-wrap">
        <div className="playlists-title-row">
          <div className="playlists-title-group">
            <div className="playlists-badge">
              <ListVideo size={16} />
              <span>CURATED TECH ROADMAPS</span>
            </div>
            <h1 className="playlists-main-title">Popular Developer Playlists</h1>
          </div>
          <span className="playlists-count-pill">{filteredPlaylists.length} Masterclass Playlists</span>
        </div>
        <p className="playlists-sub-text">
          Structured, comprehensive series by leading Indian and global developers. Follow complete paths from zero to production.
        </p>

        {/* Filter Tabs */}
        <div className="playlists-tabs-row">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`playlist-tab-btn ${activeCategoryFilter === tab.id ? "active" : ""}`}
              onClick={() => setActiveCategoryFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Playlists Grid */}
      <div className="playlists-cards-grid">
        {filteredPlaylists.map((pl) => (
          <div
            key={pl.id}
            className="playlist-card"
            onClick={() => onSelectPlaylistVideo(pl.featuredVideoId)}
            title={`Play: ${pl.title}`}
          >
            {/* Thumbnail with Stacked visual indicator & Video count overlay */}
            <div className="playlist-thumb-wrapper">
              {/* Stacked decorative layer behind thumbnail */}
              <div className="playlist-stack-layer-1" />
              <div className="playlist-stack-layer-2" />

              <img
                src={pl.thumbnail}
                alt={pl.title}
                className="playlist-thumb-img"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Overlay with Playlist icon & Video Count */}
              <div className="playlist-overlay-strip">
                <ListVideo size={18} />
                <span>{pl.videoCount} videos</span>
              </div>

              {/* Hover Play Button */}
              <div className="playlist-hover-play">
                <div className="playlist-play-circle">
                  <Play size={20} fill="#fff" />
                </div>
                <span>Play Series</span>
              </div>

              {/* Indian Creator Badge */}
              {pl.isIndian && (
                <span className="indian-badge-tag" style={{ position: "absolute", top: "8px", left: "8px", zIndex: 10 }}>
                  🇮🇳 India
                </span>
              )}
            </div>

            {/* Playlist Meta */}
            <div className="playlist-meta-box">
              <h3 className="playlist-title" title={pl.title}>
                {pl.title}
              </h3>

              <div className="playlist-channel-row">
                <img
                  src={pl.channelAvatar}
                  alt={pl.channelTitle}
                  className="playlist-channel-avatar"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <span className="playlist-channel-name">{pl.channelTitle}</span>
                <CheckCircle2 size={13} className="verified-icon" />
              </div>

              <div className="playlist-stats-row">
                <span>{pl.viewCount}</span>
                <span>•</span>
                <span>{pl.updatedAt}</span>
              </div>

              {/* Tech tags */}
              <div className="playlist-tags-wrap">
                {pl.tags.slice(0, 3).map((tag, idx) => (
                  <span key={idx} className="playlist-tag-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
