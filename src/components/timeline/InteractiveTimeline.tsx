"use client";
import { useState, useMemo } from "react";
import { TimelineItem as TimelineItemType } from "@/content/site-data";
import TimelineItem from "./TimelineItem";
import TimelineFilter from "./TimelineFilter";

interface InteractiveTimelineProps {
  items: TimelineItemType[];
  showFilters?: boolean;
  showStats?: boolean;
}

export default function InteractiveTimeline({ 
  items, 
  showFilters = true, 
  showStats = true 
}: InteractiveTimelineProps) {
  const [filteredItems, setFilteredItems] = useState(items);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Sort items by date
  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return sortOrder === 'desc' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });
  }, [filteredItems, sortOrder]);

  // Calculate stats
  const stats = useMemo(() => {
    const typeStats = items.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const skillStats = items.reduce((acc, item) => {
      item.skills.forEach(skill => {
        acc[skill] = (acc[skill] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const topSkills = Object.entries(skillStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    const currentItems = items.filter(item => item.current).length;
    const totalDuration = items.reduce((acc, item) => {
      if (item.endDate) {
        const start = new Date(item.startDate);
        const end = new Date(item.endDate);
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        return acc + months;
      }
      return acc;
    }, 0);

    return {
      typeStats,
      topSkills,
      currentItems,
      totalDuration: Math.round(totalDuration / 12 * 10) / 10 // Convert to years
    };
  }, [items]);

  const handleFilter = (filtered: TimelineItemType[]) => {
    setFilteredItems(filtered);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-[var(--panel)] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[var(--muted)]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">No Timeline Data</h3>
        <p className="text-[var(--muted)]">Timeline information will appear here when available.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Stats Overview */}
      {showStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="card text-center p-6">
            <div className="text-3xl font-bold text-[var(--primary)] mb-2">
              {items.length}
            </div>
            <div className="text-sm text-[var(--muted)]">Total Items</div>
          </div>
          
          <div className="card text-center p-6">
            <div className="text-3xl font-bold text-[var(--primary)] mb-2">
              {stats.currentItems}
            </div>
            <div className="text-sm text-[var(--muted)]">Current</div>
          </div>
          
          <div className="card text-center p-6">
            <div className="text-3xl font-bold text-[var(--primary)] mb-2">
              {stats.totalDuration}
            </div>
            <div className="text-sm text-[var(--muted)]">Years Experience</div>
          </div>
          
          <div className="card text-center p-6">
            <div className="text-3xl font-bold text-[var(--primary)] mb-2">
              {stats.topSkills.length}
            </div>
            <div className="text-sm text-[var(--muted)]">Top Skills</div>
          </div>
        </div>
      )}

      {/* Top Skills */}
      {showStats && stats.topSkills.length > 0 && (
        <div className="mb-12">
          <h3 className="text-lg font-bold text-[var(--foreground)] text-center mb-6">
            Most Used Skills
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {stats.topSkills.map(([skill, count], index) => (
              <div key={skill} className={`group relative animate-fade-in-up animate-delay-${index * 50 + 300}`}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full opacity-0 group-hover:opacity-100 transition duration-300 blur"></div>
                <span className="relative tag bg-[var(--card)] hover:bg-[var(--panel)] px-4 py-2 text-sm font-medium cursor-default">
                  {skill} ({count})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      {showFilters && (
        <TimelineFilter items={items} onFilter={handleFilter} />
      )}

      {/* Sort Controls */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-sm text-[var(--muted)]">
          {filteredItems.length} of {items.length} items
        </div>
        
        <button
          onClick={toggleSortOrder}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--panel)] transition-colors text-sm font-medium"
        >
          <svg 
            className={`w-4 h-4 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
        </button>
      </div>

      {/* Timeline */}
      {sortedItems.length > 0 ? (
        <div className="relative">
          {sortedItems.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              isLast={index === sortedItems.length - 1}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-[var(--panel)] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[var(--muted)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">No Results Found</h3>
          <p className="text-[var(--muted)]">
            No timeline items match your current filters. Try adjusting your search criteria.
          </p>
        </div>
      )}

      {/* Skills Progression Visualization */}
      {showStats && (
        <div className="mt-16">
          <h3 className="text-lg font-bold text-[var(--foreground)] text-center mb-8">
            Skills Development Over Time
          </h3>
          <div className="card p-6">
            <div className="text-center text-[var(--muted)]">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p>Skills progression visualization coming soon!</p>
              <p className="text-sm mt-2">This will show how your skills have evolved over time.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}