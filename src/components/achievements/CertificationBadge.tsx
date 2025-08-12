"use client";
import { Achievement } from "@/content/site-data";

interface CertificationBadgeProps {
  achievement: Achievement;
  size?: 'small' | 'medium' | 'large';
  showDetails?: boolean;
}

export default function CertificationBadge({ 
  achievement, 
  size = 'medium', 
  showDetails = true 
}: CertificationBadgeProps) {
  const typeConfig = {
    certification: {
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      color: "from-yellow-400 to-yellow-600",
      bgColor: "bg-yellow-500/10",
      textColor: "text-yellow-600",
      borderColor: "border-yellow-500/20"
    },
    award: {
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-600",
      borderColor: "border-purple-500/20"
    },
    contribution: {
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12z" clipRule="evenodd" />
        </svg>
      ),
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-500/10",
      textColor: "text-green-600",
      borderColor: "border-green-500/20"
    },
    milestone: {
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
        </svg>
      ),
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-600",
      borderColor: "border-blue-500/20"
    }
  };

  const sizeConfig = {
    small: {
      container: "w-16 h-20",
      badge: "w-12 h-12",
      icon: "w-6 h-6",
      title: "text-xs",
      issuer: "text-xs",
      date: "text-xs"
    },
    medium: {
      container: "w-24 h-32",
      badge: "w-16 h-16",
      icon: "w-8 h-8",
      title: "text-sm",
      issuer: "text-xs",
      date: "text-xs"
    },
    large: {
      container: "w-32 h-40",
      badge: "w-20 h-20",
      icon: "w-10 h-10",
      title: "text-base",
      issuer: "text-sm",
      date: "text-sm"
    }
  };

  const config = typeConfig[achievement.type];
  const sizes = sizeConfig[size];

  const isExpired = achievement.expiryDate && new Date(achievement.expiryDate) < new Date();
  const isExpiringSoon = achievement.expiryDate && 
    new Date(achievement.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className={`${sizes.container} flex flex-col items-center group cursor-pointer`}>
      {/* Badge */}
      <div className="relative mb-2">
        <div className={`${sizes.badge} rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-200`}>
          <div className={sizes.icon}>
            {config.icon}
          </div>
        </div>
        
        {/* Status indicators */}
        {isExpired && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[var(--background)] flex items-center justify-center">
            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        
        {!isExpired && isExpiringSoon && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full border-2 border-[var(--background)] flex items-center justify-center">
            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}

        {achievement.verificationUrl && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[var(--background)] flex items-center justify-center">
            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* Details */}
      {showDetails && (
        <div className="text-center">
          <h3 className={`${sizes.title} font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors leading-tight mb-1`}>
            {achievement.title}
          </h3>
          
          <p className={`${sizes.issuer} text-[var(--muted)] mb-1`}>
            {achievement.issuer}
          </p>
          
          <div className={`${sizes.date} text-[var(--muted)]`}>
            {formatDate(achievement.date)}
            {achievement.expiryDate && (
              <div className={`${isExpired ? 'text-red-500' : isExpiringSoon ? 'text-yellow-500' : 'text-[var(--muted)]'}`}>
                {isExpired ? 'Expired' : `Expires ${formatDate(achievement.expiryDate)}`}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hover tooltip for small badges */}
      {size === 'small' && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
          <div className="bg-[var(--panel)] border border-[var(--border)] rounded-lg p-3 shadow-lg min-w-48">
            <h4 className="font-bold text-[var(--foreground)] mb-1">{achievement.title}</h4>
            <p className="text-sm text-[var(--muted)] mb-2">{achievement.issuer}</p>
            <p className="text-xs text-[var(--muted)]">{formatDate(achievement.date)}</p>
            {achievement.description && (
              <p className="text-xs text-[var(--muted)] mt-2 leading-relaxed">
                {achievement.description.length > 100 
                  ? achievement.description.substring(0, 100) + "..." 
                  : achievement.description}
              </p>
            )}
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[var(--border)]"></div>
        </div>
      )}
    </div>
  );
}