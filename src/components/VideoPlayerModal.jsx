import React, { useState, useEffect } from "react";
import {
  X,
  ThumbsUp,
  Share2,
  Bookmark,
  ExternalLink,
  CheckCircle2,
  FileCode,
  Sparkles,
  Save,
  Check
} from "lucide-react";

export default function VideoPlayerModal({
  video,
  onClose,
  onSelectVideo,
  allVideos,
  isBookmarked,
  onToggleBookmark
}) {
  const [likes, setLikes] = useState(1420);
  const [isLiked, setIsLiked] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  const [noteContent, setNoteContent] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);

  // Load saved note for this video from localStorage
  useEffect(() => {
    if (video) {
      const saved = localStorage.getItem(`devtube_note_${video.id}`) || "";
      setNoteContent(saved);
      setIsLiked(false);
      setNoteSaved(false);
      setShareCopied(false);
    }
  }, [video]);

  // Save note to localStorage
  const handleSaveNote = () => {
    if (video) {
      localStorage.setItem(`devtube_note_${video.id}`, noteContent);
      setNoteSaved(true);
      setTimeout(() => setNoteSaved(false), 2000);
    }
  };

  const handleShare = () => {
    const url = video.youtubeUrl || `https://www.youtube.com/watch?v=${video.id}`;
    navigator.clipboard?.writeText(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  const handleToggleLike = () => {
    if (isLiked) {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  if (!video) return null;

  // Filter related videos:
  // Same category or topic, excluding current video,
  // STRICTLY prioritizing Indian YouTubers first!
  const relatedVideos = allVideos
    .filter((v) => v.id !== video.id)
    .sort((a, b) => {
      // Prioritize Indian creators first
      if (a.isIndian && !b.isIndian) return -1;
      if (!a.isIndian && b.isIndian) return 1;
      // Then prioritize matching category
      const aMatch = a.category === video.category ? 1 : 0;
      const bMatch = b.category === video.category ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 10);

  return (
    <div className="player-modal-backdrop" onClick={onClose}>
      <div
        className="player-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="player-modal-header">
          <div className="modal-header-title">
            <span style={{ color: "var(--yt-red)", fontWeight: "bold" }}>DevTube Cinema</span>
            <span>•</span>
            <span>Connected to YouTube Embed</span>
            {video.isIndian && (
              <span className="indian-badge-tag" style={{ position: "static" }}>
                🇮🇳 Indian Tech Creator
              </span>
            )}
          </div>

          <button
            className="icon-btn"
            onClick={onClose}
            title="Close Player"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body: Left Player, Right Up-Next */}
        <div className="player-body-layout">
          {/* Main Video Section */}
          <div className="player-main-col">
            {/* Embedded YouTube Player */}
            <div className="video-iframe-wrap">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&enablejsapi=1&origin=${typeof window !== "undefined" && window.location.origin ? encodeURIComponent(window.location.origin) : ""}&widget_referrer=${typeof window !== "undefined" && window.location.href ? encodeURIComponent(window.location.href) : ""}&rel=0&modestbranding=1&playsinline=1`}
                title={video.title}
                className="video-iframe"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
              />
            </div>

            {/* Video Title */}
            <h1 className="player-title">{video.title}</h1>

            {/* Channel Info & Actions */}
            <div className="player-info-bar">
              <div className="player-channel-info">
                <img
                  src={video.channelAvatar}
                  alt={video.channelTitle}
                  className="player-channel-avatar"
                />
                <div>
                  <div className="player-channel-name">
                    <span>{video.channelTitle}</span>
                    <CheckCircle2 size={15} className="verified-icon" />
                    {video.isIndian && (
                      <span
                        style={{
                          fontSize: "0.68rem",
                          color: "var(--indian-badge-text)",
                          background: "var(--indian-badge-bg)",
                          padding: "1px 6px",
                          borderRadius: "4px"
                        }}
                      >
                        🇮🇳 Verified
                      </span>
                    )}
                  </div>
                  <div className="player-channel-subs">
                    Official YouTube Partner
                  </div>
                </div>

                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(video.channelTitle)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="subscribe-yt-btn"
                  title="Subscribe on YouTube"
                >
                  Subscribe
                </a>
              </div>

              {/* Action Buttons */}
              <div className="player-actions-row">
                <button
                  className={`action-pill-btn ${isLiked ? "active" : ""}`}
                  onClick={handleToggleLike}
                  title="Like Video"
                >
                  <ThumbsUp size={16} fill={isLiked ? "#fff" : "none"} />
                  <span>{likes.toLocaleString()}</span>
                </button>

                <button
                  className={`action-pill-btn ${isBookmarked ? "active" : ""}`}
                  onClick={() => onToggleBookmark(video)}
                  title="Watch Later"
                >
                  <Bookmark size={16} fill={isBookmarked ? "#fff" : "none"} />
                  <span>{isBookmarked ? "Saved" : "Save"}</span>
                </button>

                <button
                  className="action-pill-btn"
                  onClick={handleShare}
                  title="Copy YouTube Link"
                >
                  {shareCopied ? (
                    <>
                      <Check size={16} style={{ color: "var(--yt-green)" }} />
                      <span style={{ color: "var(--yt-green)" }}>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 size={16} />
                      <span>Share</span>
                    </>
                  )}
                </button>

                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-pill-btn"
                  title="Watch directly on YouTube"
                >
                  <ExternalLink size={16} />
                  <span>YouTube</span>
                </a>

                <button
                  className={`action-pill-btn ${showNotes ? "active" : ""}`}
                  onClick={() => setShowNotes(!showNotes)}
                  title="Toggle Developer Notes"
                >
                  <FileCode size={16} />
                  <span>Notes</span>
                </button>
              </div>
            </div>

            {/* Description Box */}
            <div className="description-box">
              <div className="description-meta">
                <span>{video.viewCount}</span>
                <span> • </span>
                <span>Uploaded {video.publishedAt}</span>
                <span> • </span>
                <span style={{ color: "var(--indian-badge-text)" }}>
                  Category: {video.topicTag}
                </span>
              </div>

              <div
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: descExpanded ? "unset" : 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
                }}
              >
                {video.description}
              </div>

              <button
                onClick={() => setDescExpanded(!descExpanded)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-primary)",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginTop: "8px",
                  fontSize: "0.82rem"
                }}
              >
                {descExpanded ? "Show less" : "...more"}
              </button>
            </div>

            {/* Developer Notes Scratchpad */}
            {showNotes && (
              <div className="dev-notes-container">
                <div className="dev-notes-header">
                  <div className="dev-notes-title">
                    <FileCode size={18} style={{ color: "var(--flag-saffron)" }} />
                    <span>Developer Scratchpad & Timestamp Notes</span>
                  </div>

                  <button
                    className="filter-pill-btn"
                    onClick={handleSaveNote}
                    style={{ fontSize: "0.78rem" }}
                  >
                    {noteSaved ? (
                      <>
                        <Check size={14} style={{ color: "var(--yt-green)" }} />
                        <span>Saved!</span>
                      </>
                    ) : (
                      <>
                        <Save size={14} />
                        <span>Save Notes</span>
                      </>
                    )}
                  </button>
                </div>

                <textarea
                  className="dev-notes-textarea"
                  placeholder="Take code snippets, timestamps, or personal architecture notes while watching this video. Notes are automatically saved for this video!"
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Side Column: Up Next Videos (Strict Indian Priority) */}
          <div className="player-side-col">
            <div className="side-col-header">
              <span>Up Next (🇮🇳 Prioritized)</span>
              <Sparkles size={14} style={{ color: "var(--flag-saffron)" }} />
            </div>

            <div className="side-videos-list">
              {relatedVideos.map((item) => (
                <div
                  key={item.id}
                  className="side-video-card"
                  onClick={() => onSelectVideo(item)}
                >
                  <div className="side-thumb-wrap">
                    <img
                      src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`}
                      alt={item.title}
                      className="side-thumb"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <span className="video-duration" style={{ fontSize: "0.65rem", padding: "1px 4px" }}>
                      {item.duration}
                    </span>
                    {item.isIndian && (
                      <span
                        className="indian-badge-tag"
                        style={{ fontSize: "0.58rem", padding: "1px 4px", top: "4px", left: "4px" }}
                      >
                        🇮🇳
                      </span>
                    )}
                  </div>

                  <div className="side-meta">
                    <h4 className="side-title" title={item.title}>
                      {item.title}
                    </h4>
                    <div className="side-channel">{item.channelTitle}</div>
                    <div className="side-views">
                      {item.viewCount} • {item.publishedAt}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
