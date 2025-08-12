"use client";
import { useMemo } from "react";

interface SkillsRadarProps {
  skills: Array<{
    name: string;
    level: number; // 1-10
    category?: string;
  }>;
  size?: number;
  showLabels?: boolean;
}

export default function SkillsRadar({ 
  skills, 
  size = 300, 
  showLabels = true 
}: SkillsRadarProps) {
  const processedSkills = useMemo(() => {
    // Take top 8 skills for better visualization
    return skills.slice(0, 8).map((skill, index) => ({
      ...skill,
      angle: (index * 360) / Math.min(skills.length, 8),
      normalizedLevel: Math.max(1, Math.min(10, skill.level)) / 10 // Normalize to 0-1
    }));
  }, [skills]);

  const center = size / 2;
  const maxRadius = center - 40; // Leave space for labels
  const levels = 5; // Number of concentric circles

  // Generate points for the skill polygon
  const skillPoints = processedSkills.map(skill => {
    const angleRad = (skill.angle - 90) * (Math.PI / 180); // Start from top
    const radius = maxRadius * skill.normalizedLevel;
    const x = center + radius * Math.cos(angleRad);
    const y = center + radius * Math.sin(angleRad);
    return { x, y, skill };
  });

  const skillPolygonPath = skillPoints
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ') + ' Z';

  // Category colors
  const categoryColors: Record<string, string> = {
    'Frontend': '#3b82f6',
    'Backend': '#10b981',
    'Database': '#f59e0b',
    'DevOps': '#ef4444',
    'Mobile': '#8b5cf6',
    'AI/ML': '#ec4899',
    'Tools': '#6b7280',
    'Languages': '#06b6d4'
  };

  const getSkillColor = (skill: typeof processedSkills[0]) => {
    return skill.category ? categoryColors[skill.category] || '#6b7280' : '#6b7280';
  };

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background circles */}
        {[...Array(levels)].map((_, i) => {
          const radius = (maxRadius * (i + 1)) / levels;
          return (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
              opacity={0.3}
            />
          );
        })}

        {/* Axis lines */}
        {processedSkills.map((skill, index) => {
          const angleRad = (skill.angle - 90) * (Math.PI / 180);
          const endX = center + maxRadius * Math.cos(angleRad);
          const endY = center + maxRadius * Math.sin(angleRad);
          
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={endX}
              y2={endY}
              stroke="var(--border)"
              strokeWidth="1"
              opacity={0.3}
            />
          );
        })}

        {/* Skill polygon */}
        <path
          d={skillPolygonPath}
          fill="var(--primary)"
          fillOpacity={0.2}
          stroke="var(--primary)"
          strokeWidth="2"
        />

        {/* Skill points */}
        {skillPoints.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill={getSkillColor(point.skill)}
              stroke="white"
              strokeWidth="2"
              className="hover:r-6 transition-all duration-200 cursor-pointer"
            />
            
            {/* Skill level indicator */}
            <circle
              cx={point.x}
              cy={point.y}
              r="8"
              fill="none"
              stroke={getSkillColor(point.skill)}
              strokeWidth="1"
              opacity={0.5}
              className="animate-pulse"
            />
          </g>
        ))}

        {/* Skill labels */}
        {showLabels && skillPoints.map((point, index) => {
          const skill = point.skill;
          const angleRad = (skill.angle - 90) * (Math.PI / 180);
          const labelRadius = maxRadius + 20;
          const labelX = center + labelRadius * Math.cos(angleRad);
          const labelY = center + labelRadius * Math.sin(angleRad);
          
          // Adjust text anchor based on position
          let textAnchor: 'start' | 'middle' | 'end' = 'middle';
          if (labelX > center + 10) textAnchor = 'start';
          else if (labelX < center - 10) textAnchor = 'end';

          return (
            <g key={index}>
              <text
                x={labelX}
                y={labelY}
                textAnchor={textAnchor}
                dominantBaseline="middle"
                className="text-xs font-medium fill-[var(--foreground)]"
              >
                {skill.name}
              </text>
              <text
                x={labelX}
                y={labelY + 12}
                textAnchor={textAnchor}
                dominantBaseline="middle"
                className="text-xs fill-[var(--muted)]"
              >
                {skill.level}/10
              </text>
            </g>
          );
        })}

        {/* Center point */}
        <circle
          cx={center}
          cy={center}
          r="3"
          fill="var(--foreground)"
        />
      </svg>

      {/* Legend */}
      {showLabels && (
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {Array.from(new Set(processedSkills.map(s => s.category).filter(Boolean))).map(category => (
            <div key={category} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: categoryColors[category!] }}
              ></div>
              <span className="text-sm text-[var(--muted)]">{category}</span>
            </div>
          ))}
        </div>
      )}

      {/* Skill levels explanation */}
      <div className="mt-4 text-center">
        <div className="flex items-center justify-center gap-6 text-xs text-[var(--muted)]">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-400"></div>
            <span>1-3 Beginner</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            <span>4-6 Intermediate</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span>7-10 Advanced</span>
          </div>
        </div>
      </div>
    </div>
  );
}