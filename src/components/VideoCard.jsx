import React, { useState } from "react";
import { CheckCircle2, Bookmark, ExternalLink } from "lucide-react";

export default function VideoCard({
  video,
  onSelectVideo,
  isBookmarked,
  onToggleBookmark
}) {
  const [imgUrl, setImgUrl] = useState(
    video.thumbnail || `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`
  );
  const [hasFailed, setHasFailed] = useState(false);

  // If this video has no valid thumbnail or both domains failed, do not add/render that video
  if (!video || !video.thumbnail || hasFailed) {
    return null;
  }

  const handleImgError = () => {
    if (imgUrl.includes("i.ytimg.com")) {
      // Try fallback to img.youtube.com domain
      setImgUrl(`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`);
    } else if (imgUrl.includes("hqdefault.jpg")) {
      // Try mqdefault
      setImgUrl(`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`);
    } else {
      // If no thumbnail exists at all, do NOT show that video
      setHasFailed(true);
    }
  };

  return (
    <div className="video-card" onClick={() => onSelectVideo(video)}>
      {/* 16:9 Thumbnail Container */}
      <div className="video-thumbnail-container">
        <img
          src={imgUrl}
          alt={video.title}
          className="video-thumbnail"
          loading="lazy"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          onError={handleImgError}
        />

        {/* Video Duration Badge */}
        <span className="video-duration">{video.duration}</span>

        {/* Project Badge Tag */}
        {video.isProject && (
          <span className="project-badge-tag" title="Hands-on Project Tutorial: Build along!">
            🛠️ Project
          </span>
        )}

        {/* 🇮🇳 Indian Creator Badge Tag */}
        {video.isIndian && (
          <span className="indian-badge-tag" title="Verified Indian Tech Creator">
            🇮🇳 India
          </span>
        )}

        {/* Topic Tag */}
        <span className="topic-category-badge">{video.topicTag}</span>

        {/* Hover Quick Actions */}
        <div
          className="video-actions-quick"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="quick-action-btn"
            title={isBookmarked ? "Remove from Watch Later" : "Save to Watch Later"}
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(video);
            }}
            style={{
              color: isBookmarked ? "var(--flag-saffron)" : "#fff"
            }}
          >
            <Bookmark size={15} fill={isBookmarked ? "currentColor" : "none"} />
          </button>

          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="quick-action-btn"
            title="Open on YouTube"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={15} />
          </a>
        </div>
      </div>

      {/* Video Details Row (Avatar, Title, Channel, Stats) */}
      <div className="video-details">
        <img
          src={video.channelAvatar}
          alt={video.channelTitle}
          className="channel-avatar"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        <div className="video-meta">
          <h3 className="video-title" title={video.title}>
            {video.title}
          </h3>

          <div className="video-channel-name">
            <span>{video.channelTitle}</span>
            <CheckCircle2 size={13} className="verified-icon" />
          </div>

          <div className="video-stats">
            <span>{video.viewCount}</span>
            <span> • </span>
            <span>{video.publishedAt}</span>
          </div>

          {/* Project Tech Stack Tags */}
          {video.techStack && video.techStack.length > 0 && (
            <div className="video-tech-stack-row">
              {video.techStack.slice(0, 3).map((tech, i) => (
                <span key={i} className="tech-stack-pill">{tech}</span>
              ))}
              {video.techStack.length > 3 && (
                <span className="tech-stack-pill more">+{video.techStack.length - 3}</span>
              )}
            </div>
          )}

          {/* Hands-on Project Call-to-Action */}
          {video.isProject && (
            <div className="start-building-action">
              <span className="build-action-text">⚡ Start Building</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
