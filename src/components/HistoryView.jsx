import React from "react";
import { History, Trash2, Play, CheckCircle2, Clock } from "lucide-react";

export default function HistoryView({
  historyVideos,
  onSelectVideo,
  onRemoveFromHistory,
  onClearHistory
}) {
  return (
    <div className="activity-view-container">
      {/* Header */}
      <div className="activity-header-wrap">
        <div className="activity-header-left">
          <div className="activity-badge history-badge">
            <History size={16} />
            <span>YOUR ACTIVITY</span>
          </div>
          <h1 className="activity-main-title">Watch History</h1>
          <p className="activity-sub-text">
            All videos and masterclasses you've watched on StackTube. Pick up where you left off.
          </p>
        </div>

        {historyVideos && historyVideos.length > 0 && (
          <button
            type="button"
            className="activity-clear-btn"
            onClick={onClearHistory}
            title="Clear all watch history"
          >
            <Trash2 size={15} />
            <span>Clear All History</span>
          </button>
        )}
      </div>

      {/* Videos List */}
      {!historyVideos || historyVideos.length === 0 ? (
        <div className="activity-empty-state">
          <div className="activity-empty-icon">
            <History size={48} style={{ color: "var(--yt-text-muted)" }} />
          </div>
          <h3 className="activity-empty-title">Your Watch History is Empty</h3>
          <p className="activity-empty-desc">
            As you watch fullstack tutorials, AI courses, and project videos, they will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="activity-videos-list">
          {historyVideos.map((video) => (
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
                  {video.description || "Interactive developer tutorial and course stream on StackTube."}
                </p>

                {video.watchedAt && (
                  <div className="activity-timestamp-row">
                    <Clock size={12} />
                    <span>Watched {new Date(video.watchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                )}
              </div>

              {/* Remove action */}
              <button
                type="button"
                className="activity-remove-btn"
                title="Remove from history"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFromHistory(video.id);
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
