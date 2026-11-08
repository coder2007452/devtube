import React, { useState } from "react";
import { CATEGORY_GROUPS } from "../data/categoryTaxonomy";
import { Sparkles, Search, Layers, Compass, ArrowRight } from "lucide-react";

export default function CategoriesView({
  onSelectCategory,
  onSelectMainCategory,
  onFilterFormat
}) {
  const [activeFilterPill, setActiveFilterPill] = useState("all");
  const [filterQuery, setFilterQuery] = useState("");

  const filterPills = [
    { id: "all", label: "All videos" },
    { id: "recommended", label: "Recently recommended" },
    { id: "longs", label: "Longs" },
    { id: "gems", label: "Hidden gems" },
    { id: "indian", label: "🇮🇳 Indian Priority" }
  ];

  const handlePillClick = (pillId) => {
    setActiveFilterPill(pillId);
    if (pillId === "longs" && onFilterFormat) {
      onFilterFormat("long");
    } else if (pillId === "indian" && onSelectMainCategory) {
      onSelectMainCategory("indian_only");
    }
  };

  const filteredGroups = CATEGORY_GROUPS.map((group) => {
    if (!filterQuery.trim()) return group;
    const q = filterQuery.toLowerCase();
    const matchedSubs = group.subcategories.filter((sub) =>
      sub.name.toLowerCase().includes(q) || sub.query.toLowerCase().includes(q)
    );
    const matchesGroup = group.title.toLowerCase().includes(q);
    if (matchesGroup) return group;
    if (matchedSubs.length > 0) {
      return { ...group, subcategories: matchedSubs };
    }
    return null;
  }).filter(Boolean);

  return (
    <div className="categories-view-container">
      {/* Categories View Header */}
      <div className="categories-header-wrap">
        <div className="categories-title-row">
          <h1 className="categories-main-title">Categories</h1>
          <span className="categories-badge-count">{CATEGORY_GROUPS.length} Topic Hubs</span>
        </div>

        {/* Top Pills Row (As shown in reference photo) */}
        <div className="categories-pills-row">
          {filterPills.map((pill) => (
            <button
              key={pill.id}
              type="button"
              className={`cat-pill-btn ${activeFilterPill === pill.id ? "active" : ""}`}
              onClick={() => handlePillClick(pill.id)}
            >
              {pill.label}
            </button>
          ))}

          {/* Quick Filter Search */}
          <div className="cat-search-inline">
            <Search size={14} style={{ color: "var(--yt-text-muted)" }} />
            <input
              type="text"
              placeholder="Filter topics..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="cat-search-input"
            />
            {filterQuery && (
              <button
                type="button"
                className="cat-clear-btn"
                onClick={() => setFilterQuery("")}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Categories Cards Grid (Exact HackerTube layout from user photo) */}
      <div className="categories-cards-grid">
        {filteredGroups.map((group) => {
          const totalGroupVideos = group.subcategories.reduce(
            (sum, sub) => sum + (sub.count || 0),
            0
          );

          return (
            <div key={group.id} className="category-group-card">
              {/* Card Header (Category Title & Total Count) */}
              <div
                className="cat-card-header"
                onClick={() => onSelectCategory(group.title, group.title)}
                title={`Browse all ${group.title} videos`}
              >
                <h3 className="cat-card-title">{group.title}</h3>
                <span className="cat-card-total-count">{totalGroupVideos}</span>
              </div>

              {/* Subcategories List */}
              <div className="cat-card-sub-list">
                {group.subcategories.map((sub) => (
                  <div
                    key={sub.id}
                    className="cat-sub-row"
                    onClick={() => onSelectCategory(sub.query, sub.name)}
                    title={`Filter by: ${sub.name}`}
                  >
                    <span className="cat-sub-name">{sub.name}</span>
                    <span className="cat-sub-count">{sub.count}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
