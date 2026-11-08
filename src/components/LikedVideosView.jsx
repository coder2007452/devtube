import React from "react";
import { ThumbsUp, Trash2, Play, CheckCircle2 } from "lucide-react";

export default function LikedVideosView({
  likedVideos,
  onSelectVideo,
  onRemoveFromLiked,
  onClearLiked
}) {
  return (
    <div className="activity-view-container">
      {/* Header */}
      <div className="activity-header-wrap">
        <div className="activity-header-left">
          <div className="activity-badge liked-badge">
            <ThumbsUp size={16} />
            <span>LIKED TUTORIALS</span>
          </div>
          <h1 className="activity-main-title">Liked Videos</h1>
          <p className="activity-sub-text">
            All the developer masterclasses and project guides you have given a thumbs up.
          </p>
        </div>

        {likedVideos && likedVideos.length > 0 && (
          <button
            type="button"
            className="activity-clear-btn"
            onClick={onClearLiked}
            title="Clear all liked videos"
          >
            <Trash2 size={15} />
            <span>Clear Liked Videos</span>
          </button>
        )}
      </div>

      {/* Videos List */}
      {!likedVideos || likedVideos.length === 0 ? (
        <div className="activity-empty-state">
          <div className="activity-empty-icon">
            <ThumbsUp size={48} style={{ color: "var(--yt-text-muted)" }} />
          </div>
          <h3 className="activity-empty-title">No Liked Videos Yet</h3>
          <p className="activity-empty-desc">
            Like courses and tutorials while watching, and they will be collected here for easy reference.
          </p>
        </div>
      ) : (
        <div className="activity-videos-list">
          {likedVideos.map((video) => (
            <div
              key={video.id}
              className="activity-video-row"
              onClick={() => onSelectVideo(video)}
            >
              {/* Thumbnail */}
              <div className="activity-thumb-wrap">
                <img
                  src={video.thumbnail || `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  className="activity-thumb-img"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <span className="video-duration">{video.duration}</span>
                {video.isIndian && (
                  <span className="indian-badge-tag" style={{ position: "absolute", top: "6px", left: "6px" }}>
                    🇮🇳 India
                  </span>
                )}
                <div className="activity-thumb-play-overlay">
                  <Play size={20} fill="#fff" />
                </div>
              </div>

              {/* Info */}
              <div className="activity-info-box">
                <h3 className="activity-video-title" title={video.title}>
                  {video.title}
                </h3>

                <div className="activity-channel-row">
                  <span className="activity-channel-name">{video.channelTitle}</span>
                  <CheckCircle2 size={13} className="verified-icon" />
                  <span className="activity-sep">•</span>
                  <span>{video.viewCount}</span>
                </div>

                <p className="activity-video-desc">
                  {video.description || "Liked developer tutorial on StackTube."}
                </p>

                {video.techStack && video.techStack.length > 0 && (
                  <div className="activity-tech-row">
                    {video.techStack.map((tech, i) => (
                      <span key={i} className="tech-stack-pill">{tech}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Remove action */}
              <button
                type="button"
                className="activity-remove-btn"
                title="Unlike video"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFromLiked(video.id);
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
