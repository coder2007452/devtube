import React, { useState } from "react";
import { X, Key, CheckCircle2, AlertCircle, ExternalLink, ShieldCheck } from "lucide-react";
import { getStoredApiKey, saveApiKey } from "../services/youtubeApi";

export default function ApiSettingsModal({ onClose, onApiKeyUpdated }) {
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [statusMsg, setStatusMsg] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" | "error"

  const handleSave = () => {
    saveApiKey(apiKey);
    setStatusType("success");
    setStatusMsg("API Key saved successfully! Live YouTube search enabled.");
    onApiKeyUpdated(Boolean(apiKey.trim()));
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    saveApiKey("");
    setApiKey("");
    setStatusType("success");
    setStatusMsg("API Key cleared. Using built-in curated YouTube database.");
    onApiKeyUpdated(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <div className="settings-title">
            <Key size={20} style={{ color: "var(--yt-red)" }} />
            <span>YouTube Data Connection</span>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <p className="settings-desc">
          DevTube connects directly to YouTube for all video streams. By default, it runs with our high-definition curated database of Indian tech creators. You can optionally connect your own YouTube Data API v3 key to query YouTube's live search index.
        </p>

        <div className="input-field-group">
          <label className="field-label">YouTube Data API v3 Key (Optional)</label>
          <input
            type="password"
            className="settings-input"
            placeholder="AIzaSy..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>

        {statusMsg && (
          <div
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "0.84rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: statusType === "success" ? "rgba(43, 166, 64, 0.15)" : "rgba(255, 0, 0, 0.15)",
              color: statusType === "success" ? "var(--yt-green)" : "#ff6b6b",
              border: `1px solid ${statusType === "success" ? "var(--yt-green)" : "#ff6b6b"}`
            }}
          >
            {statusType === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{statusMsg}</span>
          </div>
        )}

        <div className="settings-guide">
          <strong>How it works:</strong>
          <br />
          1. All videos stream directly from YouTube embeds (<code style={{ color: "#ff9933" }}>youtube.com/embed</code>).
          <br />
          2. DevTube strictly enforces the content boundary: only Fullstack Web Dev, Web Dev, and AI videos are shown.
          <br />
          3. Ranking algorithms automatically prioritize Indian Tech YouTubers at the top of every query.
          <br />
          4. Don't have a key? No problem! DevTube is 100% functional out-of-the-box with 30+ real YouTube courses.
        </div>

        <div className="settings-footer">
          {apiKey && (
            <button
              className="btn-secondary"
              onClick={handleClear}
              style={{ color: "#ff6b6b", borderColor: "#ff6b6b" }}
            >
              Disconnect Key
            </button>
          )}
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Save Connection
          </button>
        </div>
      </div>
    </div>
  );
}
