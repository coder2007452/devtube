import React, { useState, useEffect } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  ExternalLink,
  CheckCircle2,
  FileCode,
  Sparkles,
  Save,
  Check,
  ArrowLeft,
  MessageSquare,
  MoreHorizontal,
  BellRing
} from "lucide-react";

export default function WatchPage({
  video,
  onBackToFeed,
  onSelectVideo,
  allVideos,
  isBookmarked,
  onToggleBookmark,
  onThumbnailError
}) {
  const [likes, setLikes] = useState(24500);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);

  // Comments state
  const [commentInput, setCommentInput] = useState("");
  const [commentsList, setCommentsList] = useState([
    {
      id: 1,
      author: "Aman Sharma",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80",
      time: "2 days ago",
      text: "The way this was explained from core fundamentals to production deployment is unmatched! Bookmarked for my fullstack interviews.",
      likes: 142
    },
    {
      id: 2,
      author: "Pooja Patel",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
      time: "5 days ago",
      text: "Best tutorial series. Finally understood how Server Components and Actions tie into PostgreSQL and Docker.",
      likes: 89
    },
    {
      id: 3,
      author: "Devang Joshi",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&q=80",
      time: "1 week ago",
      text: "Timestamp 14:20 was pure gold! The architecture diagram cleared all doubts.",
      likes: 56
    }
  ]);

  // Load saved note
  useEffect(() => {
    if (video) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const saved = localStorage.getItem(`devtube_note_${video.id}`) || "";
      setNoteContent(saved);
      setIsLiked(false);
      setIsDisliked(false);
      setNoteSaved(false);
      setShareCopied(false);
    }
  }, [video]);

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

  const handleLike = () => {
    if (isLiked) {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
      setIsDisliked(false);
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      if (isLiked) {
        setLikes((prev) => prev - 1);
        setIsLiked(false);
      }
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    const newComment = {
      id: Date.now(),
      author: "You (Developer)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
      time: "Just now",
      text: commentInput.trim(),
      likes: 0
    };
    setCommentsList([newComment, ...commentsList]);
    setCommentInput("");
  };

  if (!video) return null;

  // Filter related videos:
  // Strictly only videos with valid thumbnails,
  // Prioritizing Indian Tech YouTubers first!
  const relatedVideos = allVideos
    .filter((v) => v.id !== video.id && v.thumbnail && v.thumbnail.trim() !== "")
    .sort((a, b) => {
      if (a.isIndian && !b.isIndian) return -1;
      if (!a.isIndian && b.isIndian) return 1;
      const aMatch = a.category === video.category ? 1 : 0;
      const bMatch = b.category === video.category ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 15);

  return (
    <div className="yt-watch-view">
      {/* Left Column: Player, Info, Description, Notes, Comments */}
      <div className="yt-watch-left">
        {/* Back to Home Pill */}
        <button
          onClick={onBackToFeed}
          className="filter-pill-btn"
          style={{ marginBottom: "14px", display: "inline-flex", alignItems: "center", gap: "6px" }}
          title="Back to Video Feed"
        >
          <ArrowLeft size={16} />
          <span>Back to Feed</span>
        </button>

        {/* Embedded YouTube Player */}
        <div className="yt-player-embed-wrap">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            className="yt-player-iframe"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <div className="yt-watch-content-body">
          {/* Video Title */}
          <h1 className="yt-watch-title">{video.title}</h1>

        {/* Channel Row & Action Buttons (Exact YouTube style) */}
        <div className="yt-channel-action-row">
          <div className="yt-channel-profile">
            <img
              src={video.channelAvatar}
              alt={video.channelTitle}
              className="yt-channel-avatar-lg"
            />
            <div>
              <div className="yt-channel-name-lg">
                <span>{video.channelTitle}</span>
                <CheckCircle2 size={15} className="verified-icon" />
                {video.isIndian && (
                  <span
                    style={{
                      fontSize: "0.68rem",
                      background: "var(--indian-badge-bg)",
                      color: "var(--indian-badge-text)",
                      border: "1px solid var(--indian-badge-border)",
                      padding: "1px 6px",
                      borderRadius: "4px"
                    }}
                  >
                    🇮🇳 India
                  </span>
                )}
              </div>
              <div className="yt-channel-sub-count">
                Official YouTube Partner • 1.2M subscribers
              </div>
            </div>

            <button
              className={`yt-subscribe-btn ${isSubscribed ? "subscribed" : ""}`}
              onClick={() => setIsSubscribed(!isSubscribed)}
            >
              {isSubscribed ? (
                <>
                  <BellRing size={15} />
                  <span>Subscribed</span>
                </>
              ) : (
                <span>Subscribe</span>
              )}
            </button>
          </div>

          {/* Action Buttons Cluster */}
          <div className="yt-actions-cluster">
            {/* Joined Like / Dislike */}
            <div className="yt-like-dislike-group">
              <button
                className={`yt-like-btn ${isLiked ? "liked" : ""}`}
                onClick={handleLike}
                title="Like"
              >
                <ThumbsUp size={16} fill={isLiked ? "currentColor" : "none"} />
                <span>{likes.toLocaleString()}</span>
              </button>
              <div className="yt-dislike-divider" />
              <button
                className="yt-dislike-btn"
                onClick={handleDislike}
                title="Dislike"
              >
                <ThumbsDown size={16} fill={isDisliked ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Share */}
            <button className="yt-action-pill" onClick={handleShare} title="Share YouTube Link">
              {shareCopied ? (
                <>
                  <Check size={16} style={{ color: "var(--yt-green)" }} />
                  <span style={{ color: "var(--yt-green)" }}>Copied Link</span>
                </>
              ) : (
                <>
                  <Share2 size={16} />
                  <span>Share</span>
                </>
              )}
            </button>

            {/* Save / Watch Later */}
            <button
              className={`yt-action-pill ${isBookmarked ? "active" : ""}`}
              onClick={() => onToggleBookmark(video)}
              title="Save to Watch Later"
            >
              <Bookmark size={16} fill={isBookmarked ? "#fff" : "none"} />
              <span>{isBookmarked ? "Saved" : "Save"}</span>
            </button>

            {/* Dev Notes Toggle */}
            <button
              className={`yt-action-pill ${showNotes ? "active" : ""}`}
              onClick={() => setShowNotes(!showNotes)}
              title="Open Developer Code Notes"
            >
              <FileCode size={16} />
              <span>Notes</span>
            </button>

            {/* Watch on YouTube direct */}
            <a
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="yt-action-pill"
              title="Watch on official YouTube"
            >
              <ExternalLink size={16} />
              <span>YouTube</span>
            </a>
          </div>
        </div>

        {/* Developer Notes Scratchpad */}
        {showNotes && (
          <div className="dev-notes-container" style={{ marginBottom: "20px" }}>
            <div className="dev-notes-header">
              <div className="dev-notes-title">
                <FileCode size={18} style={{ color: "var(--flag-saffron)" }} />
                <span>Developer Timestamp Notes & Code Snippets</span>
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
                    <span>Save Note</span>
                  </>
                )}
              </button>
            </div>
            <textarea
              className="dev-notes-textarea"
              placeholder="Jot down timestamps (e.g. 14:20 - Docker compose setup), key functions, or code snippets. Saved in your local browser storage per video!"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />
          </div>
        )}

        {/* Expandable YouTube Description Box */}
        <div
          className="yt-description-box"
          onClick={() => setDescExpanded(!descExpanded)}
        >
          <div className="yt-description-meta">
            <span>{video.viewCount}</span>
            <span>•</span>
            <span>Uploaded {video.publishedAt}</span>
            <span>•</span>
            <span style={{ color: "var(--indian-badge-text)" }}>#{video.topicTag}</span>
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

          <button className="yt-desc-toggle-btn">
            {descExpanded ? "Show less" : "...more"}
          </button>
        </div>

        {/* Comments Section */}
        <div className="yt-comments-section">
          <div className="yt-comments-header">
            <span className="yt-comments-count">{commentsList.length} Comments</span>
            <button className="yt-comments-sort">
              <MessageSquare size={16} />
              <span>Top comments</span>
            </button>
          </div>

          {/* Add a comment */}
          <form className="yt-add-comment-row" onSubmit={handleAddComment}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ff9933, #138808)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "0.85rem",
                color: "#fff",
                flexShrink: 0
              }}
            >
              DEV
            </div>
            <div className="yt-comment-input-wrap">
              <input
                type="text"
                className="yt-comment-input"
                placeholder="Add a comment or share your code notes..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
              {commentInput && (
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "8px" }}>
                  <button
                    type="button"
                    className="filter-pill-btn"
                    onClick={() => setCommentInput("")}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary" style={{ padding: "6px 14px", fontSize: "0.8rem" }}>
                    Comment
                  </button>
                </div>
              )}
            </div>
          </form>

          {/* Comments List */}
          {commentsList.map((c) => (
            <div key={c.id} className="yt-comment-item">
              <img src={c.avatar} alt={c.author} className="yt-comment-avatar" />
              <div className="yt-comment-body">
                <div className="yt-comment-author">
                  <span>{c.author}</span>
                  <span style={{ color: "var(--yt-text-muted)", fontSize: "0.75rem", fontWeight: "400" }}>
                    {c.time}
                  </span>
                </div>
                <p className="yt-comment-text">{c.text}</p>
                <div className="yt-comment-actions">
                  <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <ThumbsUp size={13} /> {c.likes > 0 && c.likes}
                  </span>
                  <ThumbsDown size={13} />
                  <span>Reply</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>

      {/* Right Column: Up Next Videos (Strict Indian Priority & Thumbnail Enforced) */}
      <div className="yt-watch-right">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <span style={{ fontSize: "0.92rem", fontWeight: "700" }}>Up Next</span>
          <span style={{ fontSize: "0.78rem", color: "var(--indian-badge-text)", display: "flex", alignItems: "center", gap: "4px" }}>
            <Sparkles size={13} />
            <span>🇮🇳 Indian Prioritized</span>
          </span>
        </div>

        <div className="yt-related-column">
          {relatedVideos.map((item) => (
            <div
              key={item.id}
              className="yt-related-card"
              onClick={() => onSelectVideo(item)}
            >
              <div className="yt-related-thumb-wrap">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="yt-related-thumb"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <span className="video-duration" style={{ fontSize: "0.65rem", padding: "1px 5px", bottom: "4px", right: "4px" }}>
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

              <div className="yt-related-meta">
                <h4 className="yt-related-title" title={item.title}>
                  {item.title}
                </h4>
                <div className="yt-related-channel">
                  <span>{item.channelTitle}</span>
                  <CheckCircle2 size={12} className="verified-icon" />
                </div>
                <div className="yt-related-views">
                  {item.viewCount} • {item.publishedAt}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
