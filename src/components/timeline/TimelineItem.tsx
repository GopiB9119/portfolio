"use client";
import { useState } from "react";
import { TimelineItem as TimelineItemType } from "@/content/site-data";

interface TimelineItemProps {
  item: TimelineItemType;
  index: number;
  isLast?: boolean;
}

export default function TimelineItem({ item, index, isLast = false }: TimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const typeConfig = {
    work: {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm4-1a1 1 0 00-1 1v1h2V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
      color: "bg-blue-500",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-600",
      borderColor: "border-blue-500/20"
    },
    education: {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
        </svg>
      ),
      color: "bg-green-500",
      bgColor: "bg-green-500/10",
      textColor: "text-green-600",
      borderColor: "border-green-500/20"
    },
    project: {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12z" clipRule="evenodd" />
        </svg>
      ),
      color: "bg-purple-500",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-600",
      borderColor: "border-purple-500/20"
    },
    certification: {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      color: "bg-yellow-500",
      bgColor: "bg-yellow-500/10",
      textColor: "text-yellow-600",
      borderColor: "border-yellow-500/20"
    },
    achievement: {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      color: "bg-orange-500",
      bgColor: "bg-orange-500/10",
      textColor: "text-orange-600",
      borderColor: "border-orange-500/20"
    }
  };

  const config = typeConfig[item.type];
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const getDuration = () => {
    if (item.current) return "Present";
    if (!item.endDate) return formatDate(item.startDate);
    
    const start = new Date(item.startDate);
    const end = new Date(item.endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    
    if (months < 1) return "< 1 month";
    if (months === 1) return "1 month";
    if (months < 12) return `${months} months`;
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''}`;
    return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
  };

  return (
    <div className={`relative animate-fade-in-up animate-delay-${index * 100 + 300}`}>
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-6 top-16 w-0.5 h-full bg-[var(--border)] -z-10"></div>
      )}

      <div className="flex gap-6 group">
        {/* Timeline dot */}
        <div className="relative flex-shrink-0">
          <div className={`w-12 h-12 rounded-full ${config.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-200`}>
            {config.icon}
          </div>
          {item.current && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[var(--background)] animate-pulse">
              <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pb-8">
          <div className="card group-hover:shadow-lg transition-shadow duration-200">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${config.bgColor} ${config.textColor} border ${config.borderColor}`}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                  {item.current && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-600 border border-green-500/20">
                      Current
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-[var(--primary)] font-semibold mb-2">
                  {item.organization}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {formatDate(item.startDate)} - {item.current ? "Present" : (item.endDate ? formatDate(item.endDate) : "Ongoing")}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {getDuration()}
                  </div>
                  {item.location && (
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {item.location}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 rounded-lg hover:bg-[var(--panel)] transition-colors"
                aria-label={isExpanded ? "Collapse details" : "Expand details"}
              >
                <svg 
                  className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Description */}
            <p className="text-[var(--muted)] leading-relaxed mb-4">
              {item.description}
            </p>

            {/* Expandable content */}
            {isExpanded && (
              <div className="border-t border-[var(--border)] pt-4 animate-fade-in">
                {/* Skills */}
                {item.skills && item.skills.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-[var(--foreground)] mb-2">Skills & Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span key={skill} className="tag text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {item.achievements && item.achievements.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-[var(--foreground)] mb-2">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {item.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                          <div className="w-1 h-1 bg-[var(--primary)] rounded-full mt-2 flex-shrink-0"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* External link */}
                {item.url && (
                  <div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--accent)] transition-colors text-sm font-medium"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                      </svg>
                      Learn More
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}