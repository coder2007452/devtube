import React, { useState, useEffect } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  Bookmark,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  ArrowLeft,
  CheckCircle2,
  BellRing,
  Sparkles,
  Check
} from "lucide-react";
import { DEV_SHORTS } from "../data/mockVideos";

export default function ShortsPlayer({
  initialShortId,
  onBackToFeed,
  bookmarkedVideos,
  onToggleBookmark
}) {
  // Sort with Indian creators strictly first
  const shortsList = [...DEV_SHORTS]
    .filter((s) => s.thumbnail && s.thumbnail.trim() !== "")
    .sort((a, b) => {
      if (a.isIndian && !b.isIndian) return -1;
      if (!a.isIndian && b.isIndian) return 1;
      return (b.priorityScore || 0) - (a.priorityScore || 0);
    });

  const initialIndex = initialShortId
    ? shortsList.findIndex((s) => s.id === initialShortId)
    : 0;

  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [likesCount, setLikesCount] = useState(48200);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentShort = shortsList[currentIndex] || shortsList[0];
  const isBookmarked = bookmarkedVideos.some((b) => b.id === currentShort?.id);

  // Keyboard navigation for Shorts (Up/Down arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === "j") {
        handleNext();
      } else if (e.key === "ArrowUp" || e.key === "k") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, shortsList.length]);

  const handleNext = () => {
    if (currentIndex < shortsList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      resetStates();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      resetStates();
    }
  };

  const resetStates = () => {
    setIsLiked(false);
    setIsDisliked(false);
    setCopied(false);
  };

  const handleLike = () => {
    if (isLiked) {
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
      setIsDisliked(false);
    }
  };

  const handleShare = () => {
    const url = currentShort.youtubeUrl || `https://www.youtube.com/shorts/${currentShort.id}`;
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!currentShort) return null;

  return (
    <div className="shorts-page-container">
      {/* Top Bar */}
      <div className="shorts-top-bar">
        <button className="filter-pill-btn shorts-back-btn" onClick={onBackToFeed}>
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="shorts-top-title-group">
          <span style={{ fontSize: "1.1rem" }}>⚡</span>
          <span className="shorts-top-title">Shorts</span>
          <span className="shorts-top-badge">
            🇮🇳 Indian First
          </span>
        </div>

        <div className="shorts-counter">
          {currentIndex + 1} / {shortsList.length}
        </div>
      </div>

      {/* Center Shorts Viewing Stage */}
      <div className="shorts-stage">
        {/* Vertical 9:16 Phone/Shorts Frame */}
        <div className="shorts-video-frame">
          <iframe
            key={currentShort.id}
            src={`https://www.youtube.com/embed/${currentShort.id}?autoplay=1&loop=1&playlist=${currentShort.id}&modestbranding=1&rel=0&controls=1`}
            title={currentShort.title}
            className="shorts-iframe"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />

          {/* Bottom Left Overlay (Channel, Title, Subscribe) */}
          <div className="shorts-overlay-bottom">
            <div className="shorts-channel-row">
              <img
                src={currentShort.channelAvatar}
                alt={currentShort.channelTitle}
                className="shorts-channel-avatar"
              />
              <span className="shorts-channel-name">{currentShort.channelTitle}</span>
              <CheckCircle2 size={13} className="verified-icon" />
              {currentShort.isIndian && (
                <span
                  style={{
                    fontSize: "0.65rem",
                    background: "var(--indian-badge-bg)",
                    color: "var(--indian-badge-text)",
                    border: "1px solid var(--indian-badge-border)",
                    padding: "1px 5px",
                    borderRadius: "4px",
                    fontWeight: "700"
                  }}
                >
                  🇮🇳
                </span>
              )}
              <button
                className={`shorts-subscribe-btn ${isSubscribed ? "subscribed" : ""}`}
                onClick={() => setIsSubscribed(!isSubscribed)}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>

            <h3 className="shorts-title-overlay">{currentShort.title}</h3>
          </div>
        </div>

        {/* Right Action Rail (Exact YouTube Shorts Style) */}
        <div className="shorts-action-rail">
          {/* Like */}
          <div className="shorts-action-group">
            <button
              className={`shorts-circle-btn ${isLiked ? "active" : ""}`}
              onClick={handleLike}
              title="Like Short"
            >
              <ThumbsUp size={22} fill={isLiked ? "currentColor" : "none"} />
            </button>
            <span className="shorts-action-label">{likesCount.toLocaleString()}</span>
          </div>

          {/* Dislike */}
          <div className="shorts-action-group">
            <button
              className={`shorts-circle-btn ${isDisliked ? "active" : ""}`}
              onClick={() => setIsDisliked(!isDisliked)}
              title="Dislike Short"
            >
              <ThumbsDown size={22} fill={isDisliked ? "currentColor" : "none"} />
            </button>
            <span className="shorts-action-label">Dislike</span>
          </div>

          {/* Comments */}
          <div className="shorts-action-group">
            <button
              className="shorts-circle-btn"
              onClick={() => alert(`Comments for ${currentShort.title}:\n\n- Aman: Best 60-second explanation!\n- Priya: Crystal clear code demo.`)}
              title="Comments"
            >
              <MessageSquare size={22} />
            </button>
            <span className="shorts-action-label">{currentShort.commentsCount}</span>
          </div>

          {/* Share */}
          <div className="shorts-action-group">
            <button className="shorts-circle-btn" onClick={handleShare} title="Share Short">
              {copied ? (
                <Check size={22} style={{ color: "var(--yt-green)" }} />
              ) : (
                <Share2 size={22} />
              )}
            </button>
            <span className="shorts-action-label">{copied ? "Copied" : "Share"}</span>
          </div>

          {/* Bookmark */}
          <div className="shorts-action-group">
            <button
              className={`shorts-circle-btn ${isBookmarked ? "active" : ""}`}
              onClick={() => onToggleBookmark(currentShort)}
              title="Save Short"
            >
              <Bookmark size={22} fill={isBookmarked ? "currentColor" : "none"} />
            </button>
            <span className="shorts-action-label">{isBookmarked ? "Saved" : "Save"}</span>
          </div>

          {/* Open on YouTube */}
          <div className="shorts-action-group">
            <a
              href={currentShort.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shorts-circle-btn"
              title="Watch on official YouTube"
            >
              <ExternalLink size={20} />
            </a>
            <span className="shorts-action-label">YouTube</span>
          </div>

          {/* Navigation Up / Down Buttons */}
          <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <button
              className="shorts-nav-btn"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              title="Previous Short (Arrow Up)"
            >
              <ChevronUp size={22} />
            </button>

            <button
              className="shorts-nav-btn"
              onClick={handleNext}
              disabled={currentIndex === shortsList.length - 1}
              title="Next Short (Arrow Down)"
            >
              <ChevronDown size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
