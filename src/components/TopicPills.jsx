import React from "react";

export default function TopicPills({
  activeCategory,
  setActiveCategory,
  activeCreatorId,
  setActiveCreatorId,
  searchQuery,
  setSearchQuery,
  triggerSearch
}) {
  const pills = [
    { id: "all", label: "All (🇮🇳 Indian First)", type: "category" },
    { id: "tutorials", label: "🛠️ All Tutorials (Projects)", type: "category" },
    { id: "project_ai", label: "🤖 AI Projects", type: "category" },
    { id: "project_webdev", label: "🌐 Web Dev Projects", type: "category" },
    { id: "project_fullstack", label: "💻 Full-Stack Projects", type: "category" },
    { id: "indian_only", label: "🇮🇳 Indian Creators Only", type: "category" },
    { id: "fullstack", label: "💻 Fullstack Web Dev", type: "category" },
    { id: "webdev", label: "🌐 Web Development", type: "category" },
    { id: "ai", label: "🤖 AI & Machine Learning", type: "category" },
    { id: "Next.js", label: "⚡ Next.js 14/15", type: "search", query: "Next.js" },
    { id: "MERN", label: "📦 MERN Stack", type: "search", query: "MERN" },
    { id: "GenAI", label: "🧠 Generative AI & LLMs", type: "search", query: "Generative AI" },
    { id: "LangChain", label: "🔗 LangChain & Agents", type: "search", query: "LangChain" },
    { id: "JavaScript", label: "☕ JavaScript Deep Dive", type: "search", query: "JavaScript" },
    { id: "Docker", label: "🐳 Docker & DevOps", type: "search", query: "Docker" },
    { id: "global_only", label: "🌍 Global Masters", type: "category" }
  ];

  const handlePillClick = (pill) => {
    if (pill.type === "category") {
      setActiveCreatorId(null);
      setActiveCategory(pill.id);
      if (pill.id === "all") {
        setSearchQuery("");
      }
    } else if (pill.type === "search") {
      setActiveCreatorId(null);
      setSearchQuery(pill.query);
      triggerSearch(pill.query);
    }
  };

  return (
    <div className="category-pills-bar">
      {pills.map((pill) => {
        const isActive =
          pill.type === "category"
            ? activeCategory === pill.id && !searchQuery && !activeCreatorId
            : searchQuery === pill.query;

        return (
          <button
            key={pill.id}
            className={`category-chip ${isActive ? "active" : ""}`}
            onClick={() => handlePillClick(pill)}
          >
            {pill.label}
          </button>
        );
      })}
    </div>
  );
}
