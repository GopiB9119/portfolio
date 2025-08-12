/**
 * Scroll-based animation utilities
 */

export function initScrollAnimations() {
    if (typeof window === 'undefined') return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Intersection Observer for scroll reveals
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: unobserve after revealing to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all scroll reveal elements
    const scrollRevealElements = document.querySelectorAll(
        '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-delay, .stagger-children'
    );

    scrollRevealElements.forEach((el) => {
        observer.observe(el);
    });

    // Scroll progress indicator
    const scrollProgress = document.querySelector('.scroll-progress-bar') as HTMLElement;
    if (scrollProgress) {
        const updateScrollProgress = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = `${Math.min(scrollPercent, 100)}%`;
        };

        window.addEventListener('scroll', updateScrollProgress, { passive: true });
        updateScrollProgress(); // Initial call
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const href = (anchor as HTMLAnchorElement).getAttribute('href');
            if (href) {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

/**
 * Add stagger animation to children elements
 */
export function addStaggerAnimation(container: HTMLElement, delay = 100) {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const children = Array.from(container.children) as HTMLElement[];

    children.forEach((child, index) => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(20px)';
        child.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

        setTimeout(() => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
        }, index * delay);
    });
}

/**
 * Enhanced hover effects for cards
 */
export function enhanceCardHovers() {
    if (typeof window === 'undefined') return;

    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
        const cardElement = card as HTMLElement;

        cardElement.addEventListener('mouseenter', () => {
            cardElement.style.transform = 'translateY(-8px) scale(1.02)';
            cardElement.style.boxShadow = 'var(--shadow-xl)';
        });

        cardElement.addEventListener('mouseleave', () => {
            cardElement.style.transform = 'translateY(0) scale(1)';
            cardElement.style.boxShadow = 'var(--shadow)';
        });
    });
}

/**
 * Theme transition effects
 */
export function enhanceThemeTransitions() {
    if (typeof window === 'undefined') return;

    // Add smooth transition class to body during theme changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                document.body.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

                setTimeout(() => {
                    document.body.style.transition = '';
                }, 300);
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });
}

/**
 * Initialize all animations
 */
export function initAllAnimations() {
    if (typeof window === 'undefined') return;

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initScrollAnimations();
            enhanceCardHovers();
            enhanceThemeTransitions();
        });
    } else {
        initScrollAnimations();
        enhanceCardHovers();
        enhanceThemeTransitions();
    }
}