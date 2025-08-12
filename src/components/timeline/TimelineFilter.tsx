"use client";
import { useState } from "react";
import { TimelineItem } from "@/content/site-data";

interface TimelineFilterProps {
  items: TimelineItem[];
  onFilter: (filteredItems: TimelineItem[]) => void;
}

export default function TimelineFilter({ items, onFilter }: TimelineFilterProps) {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("all");

  // Get unique types and skills
  const types = Array.from(new Set(items.map(item => item.type)));
  const allSkills = Array.from(new Set(items.flatMap(item => item.skills)));
  const topSkills = allSkills
    .map(skill => ({
      skill,
      count: items.filter(item => item.skills.includes(skill)).length
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .map(item => item.skill);

  const applyFilters = (type: string, skill: string, range: string) => {
    let filtered = items;

    // Filter by type
    if (type !== "all") {
      filtered = filtered.filter(item => item.type === type);
    }

    // Filter by skill
    if (skill !== "all") {
      filtered = filtered.filter(item => item.skills.includes(skill));
    }

    // Filter by date range
    if (range !== "all") {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch (range) {
        case "recent":
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
        case "2years":
          cutoffDate.setFullYear(now.getFullYear() - 2);
          break;
        case "older":
          cutoffDate.setFullYear(now.getFullYear() - 2);
          filtered = filtered.filter(item => new Date(item.startDate) < cutoffDate);
          break;
      }
      
      if (range !== "older") {
        filtered = filtered.filter(item => new Date(item.startDate) >= cutoffDate);
      }
    }

    onFilter(filtered);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    applyFilters(type, selectedSkill, dateRange);
  };

  const handleSkillChange = (skill: string) => {
    setSelectedSkill(skill);
    applyFilters(selectedType, skill, dateRange);
  };

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
    applyFilters(selectedType, selectedSkill, range);
  };

  const clearFilters = () => {
    setSelectedType("all");
    setSelectedSkill("all");
    setDateRange("all");
    onFilter(items);
  };

  const hasActiveFilters = selectedType !== "all" || selectedSkill !== "all" || dateRange !== "all";

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-4 items-center justify-center mb-6">
        {/* Type Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleTypeChange("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedType === "all"
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--card)] text-[var(--muted)] hover:bg-[var(--panel)] hover:text-[var(--foreground)]"
            }`}
          >
            All ({items.length})
          </button>
          {types.map((type) => {
            const count = items.filter(item => item.type === type).length;
            const typeConfig = {
              work: { label: "Work", icon: "💼" },
              education: { label: "Education", icon: "🎓" },
              project: { label: "Projects", icon: "🚀" },
              certification: { label: "Certifications", icon: "🏆" },
              achievement: { label: "Achievements", icon: "⭐" }
            };
            
            const config = typeConfig[type as keyof typeof typeConfig] || { label: type, icon: "📌" };
            
            return (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedType === type
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--card)] text-[var(--muted)] hover:bg-[var(--panel)] hover:text-[var(--foreground)]"
                }`}
              >
                {config.icon} {config.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {/* Skills Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-[var(--foreground)]">Skills:</label>
          <select
            value={selectedSkill}
            onChange={(e) => handleSkillChange(e.target.value)}
            className="px-3 py-1 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          >
            <option value="all">All Skills</option>
            {topSkills.map((skill) => {
              const count = items.filter(item => item.skills.includes(skill)).length;
              return (
                <option key={skill} value={skill}>
                  {skill} ({count})
                </option>
              );
            })}
          </select>
        </div>

        {/* Date Range Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-[var(--foreground)]">Period:</label>
          <select
            value={dateRange}
            onChange={(e) => handleDateRangeChange(e.target.value)}
            className="px-3 py-1 rounded-lg bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          >
            <option value="all">All Time</option>
            <option value="recent">Last Year</option>
            <option value="2years">Last 2 Years</option>
            <option value="older">Older than 2 Years</option>
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-3 py-1 text-sm text-[var(--primary)] hover:text-[var(--accent)] transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Results Summary */}
      <div className="text-center mt-4">
        <p className="text-sm text-[var(--muted)]">
          {hasActiveFilters ? (
            <>
              Showing filtered results
              {selectedType !== "all" && ` for ${selectedType}`}
              {selectedSkill !== "all" && ` with ${selectedSkill}`}
              {dateRange !== "all" && ` from ${dateRange === "recent" ? "last year" : dateRange === "2years" ? "last 2 years" : "older periods"}`}
            </>
          ) : (
            `Showing all ${items.length} timeline items`
          )}
        </p>
      </div>
    </div>
  );
}