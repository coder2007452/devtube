import { DEV_VIDEOS, DEV_SHORTS, INDIAN_CREATORS, GLOBAL_CREATORS } from "../data/mockVideos.js";

const API_KEY_STORAGE = "devtube_yt_api_key";

export function getStoredApiKey() {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem(API_KEY_STORAGE) || "";
    }
  } catch (e) {
    // fallback if localStorage is blocked by browser privacy
  }
  return "";
}

export function saveApiKey(key) {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      if (key) {
        localStorage.setItem(API_KEY_STORAGE, key.trim());
      } else {
        localStorage.removeItem(API_KEY_STORAGE);
      }
    }
  } catch (e) {
    // fallback
  }
}

// Find if a search query is searching for a channel name / creator
export function findMatchingCreator(query) {
  if (!query || !query.trim()) return null;
  const q = query.trim().toLowerCase();
  const allCreators = [...INDIAN_CREATORS, ...GLOBAL_CREATORS];

  // 1. Direct alias or exact name or handle match
  for (const creator of allCreators) {
    if (creator.name.toLowerCase() === q) return creator;
    if (creator.id === q) return creator;
    const cleanHandle = (creator.handle || "").toLowerCase().replace("@", "");
    if (cleanHandle === q) return creator;
    if (
      creator.aliases &&
      creator.aliases.some((alias) => alias === q || q === alias.toLowerCase())
    ) {
      return creator;
    }
  }

  // 2. Contains match: if user search is or contains the creator's alias
  for (const creator of allCreators) {
    if (
      creator.aliases &&
      creator.aliases.some(
        (alias) => q === alias || q.includes(alias) || alias.includes(q)
      )
    ) {
      return creator;
    }
    const nameLower = creator.name.toLowerCase();
    if (nameLower.includes(q) || q.includes(nameLower)) {
      return creator;
    }
  }

  // 3. Name token match (e.g. "hitesh", "kirat", "harry", "babbar", "piyush", "krish", "nitish", "thapa", "delaney")
  for (const creator of allCreators) {
    const tokens = q.split(/\s+/);
    const creatorTokens = creator.name.toLowerCase().split(/[\s()]+/);
    if (tokens.some((t) => t.length >= 3 && creatorTokens.includes(t))) {
      return creator;
    }
  }

  return null;
}

// Format duration from ISO 8601 (PT1H2M3S) to HH:MM:SS
function formatDuration(isoDuration) {
  if (!isoDuration) return "15:00";
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "10:00";
  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Format view counts like 1.2M or 450K
export function formatViews(views) {
  if (typeof views === "string" && (views.includes("views") || views.includes("M") || views.includes("K"))) {
    return views;
  }
  const num = Number(views) || 0;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M views`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K views`;
  return `${num} views`;
}

// Known Indian tech channel keywords
const INDIAN_CHANNEL_SIGNATURES = [
  "chai aur code",
  "hitesh choudhary",
  "harkirat",
  "100xdevs",
  "codewithharry",
  "apna college",
  "shradha khapra",
  "love babbar",
  "codehelp",
  "namaste javascript",
  "akshay saini",
  "sheryians",
  "piyush garg",
  "krish naik",
  "campusx",
  "thapa technical",
  "anuj bhaiya",
  "take u forward",
  "striver",
  "kunal kushwaha"
];

export function isLikelyIndianCreator(channelTitle, description = "", tags = []) {
  const combined = `${channelTitle} ${description} ${(tags || []).join(" ")}`.toLowerCase();
  return INDIAN_CHANNEL_SIGNATURES.some((sig) => combined.includes(sig));
}

// Fetch videos live from YouTube Data API v3
export async function fetchLiveYouTubeVideos({ query = "", category = "all", apiKey }) {
  const key = apiKey || getStoredApiKey();
  if (!key) {
    throw new Error("No YouTube API key provided");
  }

  let searchQuery = query.trim();
  const categoryConstraints = {
    fullstack: "fullstack web development project react node nextjs",
    webdev: "web development javascript react frontend css",
    ai: "artificial intelligence generative AI LLM machine learning python",
    all: "fullstack web development AI machine learning"
  };

  const topicConstraint = categoryConstraints[category] || categoryConstraints.all;
  if (!searchQuery) {
    searchQuery = topicConstraint;
  } else {
    searchQuery = `${searchQuery} (fullstack OR web development OR AI)`;
  }

  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${encodeURIComponent(
    searchQuery
  )}&type=video&key=${key}`;

  const res = await fetch(searchUrl);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `YouTube API error: ${res.status}`);
  }

  const data = await res.json();
  const validItems = (data.items || []).filter((item) => {
    const hasId = item.id?.videoId;
    const hasThumb =
      item.snippet?.thumbnails?.high?.url ||
      item.snippet?.thumbnails?.medium?.url ||
      item.snippet?.thumbnails?.default?.url;
    return Boolean(hasId && hasThumb);
  });

  const videoIds = validItems.map((item) => item.id.videoId);
  if (videoIds.length === 0) return [];

  const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(
    ","
  )}&key=${key}`;
  const detailsRes = await fetch(detailsUrl);
  const detailsData = await detailsRes.json();

  const liveVideos = (detailsData.items || [])
    .filter((item) => {
      const thumb =
        item.snippet?.thumbnails?.maxres?.url ||
        item.snippet?.thumbnails?.high?.url ||
        item.snippet?.thumbnails?.medium?.url ||
        item.snippet?.thumbnails?.default?.url;
      return Boolean(thumb);
    })
    .map((item) => {
      const isIndian = isLikelyIndianCreator(
        item.snippet.channelTitle,
        item.snippet.description,
        item.snippet.tags
      );

      const titleAndDesc = `${item.snippet.title} ${item.snippet.description}`.toLowerCase();
      let detectedCategory = "webdev";
      if (
        titleAndDesc.includes("fullstack") ||
        titleAndDesc.includes("full stack") ||
        titleAndDesc.includes("mern")
      ) {
        detectedCategory = "fullstack";
      } else if (
        titleAndDesc.includes("ai") ||
        titleAndDesc.includes("artificial intelligence") ||
        titleAndDesc.includes("llm") ||
        titleAndDesc.includes("machine learning") ||
        titleAndDesc.includes("deep learning")
      ) {
        detectedCategory = "ai";
      }

      const thumbUrl =
        item.snippet.thumbnails?.maxres?.url ||
        item.snippet.thumbnails?.high?.url ||
        item.snippet.thumbnails?.medium?.url ||
        item.snippet.thumbnails?.default?.url ||
        `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`;

      return {
        id: item.id,
        title: item.snippet.title,
        channelId: item.snippet.channelId,
        channelTitle: item.snippet.channelTitle,
        channelAvatar:
          item.snippet.thumbnails?.default?.url ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        thumbnail: thumbUrl,
        isIndian,
        country: isIndian ? "IN" : "GLOBAL",
        category: detectedCategory,
        topicTag: detectedCategory === "fullstack" ? "Fullstack" : detectedCategory === "ai" ? "AI / ML" : "Web Dev",
        duration: formatDuration(item.contentDetails?.duration),
        viewCount: formatViews(item.statistics?.viewCount || "150000"),
        publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
        priorityScore: isIndian ? 100 : 40,
        description: item.snippet.description,
        tags: item.snippet.tags || [],
        youtubeUrl: `https://www.youtube.com/watch?v=${item.id}`,
        isLiveApiData: true
      };
    });

  return liveVideos;
}

// Fetch live search results from DevTube Vite server proxy (YouTube Live Scraper)
export async function fetchLiveBackendSearch({
  query = "",
  creatorName = "",
  isChannel = false,
  category = "all",
  limit = 50
}) {
  if (typeof window === "undefined") return null;
  try {
    const params = new URLSearchParams({
      q: query,
      creatorName: creatorName,
      isChannel: isChannel ? "true" : "false",
      category: category,
      limit: String(limit)
    });
    const res = await fetch(`/api/youtube-live?${params.toString()}`, {
      signal: AbortSignal.timeout(7000)
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn("[devtube] Backend live search notice:", err.message);
    return null;
  }
}

// Master query function:
// 1. Channel Name Search -> Shows ALL videos in that channel (curated + real YouTube live data)
// 2. Topic/Video Search -> Works normally across all creators (prioritizing Indian YouTubers #1)
export async function getVideos({
  query = "",
  category = "all",
  priorityFilter = "indian_first",
  creatorId = null
}) {
  let sourceVideos = [...DEV_VIDEOS];

  // Check if query is searching for a Channel Name or creatorId is selected
  const matchedCreator = !creatorId && query ? findMatchingCreator(query) : null;
  const targetCreator = matchedCreator || (creatorId ? [...INDIAN_CREATORS, ...GLOBAL_CREATORS].find(c => c.id === creatorId) : null);

  // 1. If searching a channel name (e.g. "apna" -> Apna College)
  if (targetCreator) {
    // Collect local curated videos for this creator
    const localCreatorVideos = DEV_VIDEOS.filter((v) => {
      const matchId = v.channelId === targetCreator.id;
      const matchTitle =
        (v.channelTitle || "").toLowerCase().includes(targetCreator.id) ||
        (v.channelTitle || "").toLowerCase().includes(targetCreator.name.toLowerCase().split(" ")[0]);
      return matchId || matchTitle;
    });

    // Concurrently fetch live videos from YouTube for this channel
    try {
      const liveData = await fetchLiveBackendSearch({
        creatorName: targetCreator.name,
        isChannel: true,
        limit: 50
      });

      if (liveData && Array.isArray(liveData.videos) && liveData.videos.length > 0) {
        // Tag live videos with this creator's channelId
        const enrichedLive = liveData.videos.map((lv) => ({
          ...lv,
          channelId: targetCreator.id,
          channelTitle: targetCreator.name,
          channelAvatar: targetCreator.avatar || lv.channelAvatar,
          isIndian: targetCreator.isIndian ?? true,
          country: targetCreator.isIndian ? "IN" : "GLOBAL"
        }));

        // Merge live videos with local curated videos (deduplicating by video ID)
        const videoMap = new Map();
        localCreatorVideos.forEach((v) => videoMap.set(v.id, v));
        enrichedLive.forEach((v) => {
          if (!videoMap.has(v.id)) {
            videoMap.set(v.id, v);
          }
        });

        sourceVideos = Array.from(videoMap.values());
      } else {
        sourceVideos = localCreatorVideos;
      }
    } catch {
      sourceVideos = localCreatorVideos;
    }

    // Filter out any video without a thumbnail
    sourceVideos = sourceVideos.filter((v) =>
      Boolean(v && v.id && v.thumbnail && v.thumbnail.trim() !== "")
    );

    if (category && category !== "all" && category !== "indian_only" && category !== "global_only") {
      sourceVideos = sourceVideos.filter((v) => v.category === category);
    }

    return sourceVideos;
  }

  // 2. Normal Topic / Video Search or General Feed
  // Fetch live YouTube results if query is provided
  if (query.trim()) {
    try {
      const liveData = await fetchLiveBackendSearch({
        query: query.trim(),
        category: category,
        isChannel: false,
        limit: 40
      });

      if (liveData && Array.isArray(liveData.videos) && liveData.videos.length > 0) {
        const videoMap = new Map();
        liveData.videos.forEach((v) => videoMap.set(v.id, v));
        DEV_VIDEOS.forEach((v) => {
          if (!videoMap.has(v.id)) {
            videoMap.set(v.id, v);
          }
        });
        sourceVideos = Array.from(videoMap.values());
      }
    } catch {
      // Continue with curated dataset
    }
  }

  // Live YouTube API integration if user provided a personal API key
  const apiKey = getStoredApiKey();
  if (apiKey && query.trim()) {
    try {
      const live = await fetchLiveYouTubeVideos({ query, category, apiKey });
      if (live && live.length > 0) {
        sourceVideos = [...live, ...sourceVideos];
      }
    } catch (err) {
      console.warn("Falling back to live backend search notice:", err.message);
    }
  }

  // CRITICAL REQUIREMENT: Filter out any video that lacks a valid thumbnail!
  sourceVideos = sourceVideos.filter((v) => {
    return Boolean(v && v.id && v.thumbnail && v.thumbnail.trim() !== "");
  });

  if (category === "indian_only") {
    sourceVideos = sourceVideos.filter((v) => v.isIndian);
  } else if (category === "global_only") {
    sourceVideos = sourceVideos.filter((v) => !v.isIndian);
  } else if (category && category !== "all") {
    sourceVideos = sourceVideos.filter((v) => v.category === category);
  }

  if (query.trim()) {
    const q = query.toLowerCase().trim();
    sourceVideos = sourceVideos.filter((v) => {
      const matchTitle = (v.title || "").toLowerCase().includes(q);
      const matchChannel = (v.channelTitle || "").toLowerCase().includes(q);
      const matchTopic = (v.topicTag || "").toLowerCase().includes(q);
      const matchTags = (v.tags || []).some((tag) => tag.toLowerCase().includes(q));
      const matchDesc = (v.description || "").toLowerCase().includes(q);
      return matchTitle || matchChannel || matchTopic || matchTags || matchDesc;
    });
  }

  // Ranking & Prioritization: Indian Tech YouTubers #1, then global
  const sorted = [...sourceVideos].sort((a, b) => {
    if (priorityFilter === "indian_only" || priorityFilter === "all") {
      return (b.priorityScore || 0) - (a.priorityScore || 0);
    }
    if (a.isIndian && !b.isIndian) return -1;
    if (!a.isIndian && b.isIndian) return 1;
    return (b.priorityScore || 0) - (a.priorityScore || 0);
  });

  return sorted;
}

export function getDevShorts({ creatorId = null, priorityFilter = "indian_first" } = {}) {
  let shorts = DEV_SHORTS.filter(
    (s) => Boolean(s && s.id && s.thumbnail && s.thumbnail.trim() !== "")
  );

  if (creatorId) {
    shorts = shorts.filter((s) => s.channelId === creatorId);
  }

  if (priorityFilter === "indian_only") {
    shorts = shorts.filter((s) => s.isIndian);
  }

  return [...shorts].sort((a, b) => {
    if (a.isIndian && !b.isIndian) return -1;
    if (!a.isIndian && b.isIndian) return 1;
    return (b.priorityScore || 0) - (a.priorityScore || 0);
  });
}
