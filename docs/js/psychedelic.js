/**
 * Psychedelic Mode - The Funnest Button Ever
 * Pure vanilla JS magic
 */
(function() {
    'use strict';

    const STORAGE_KEY = 'jen-qa-psychedelic';
    const PARTICLE_COUNT = 10;
    const CURSOR_TRAIL_COLORS = [
        '#ff00ff', '#00ffff', '#ffff00', '#ff0000',
        '#00ff00', '#ff7f00', '#0000ff', '#9400d3',
        '#ff1493', '#7fff00'
    ];

    let particlesContainer = null;
    let vaporwaveGrid = null;
    let cursorTrailEnabled = true;
    let lastTrailTime = 0;

    /**
     * Create the toggle button
     */
    function createToggleButton() {
        const btn = document.createElement('button');
        btn.className = 'psychedelic-toggle';
        btn.setAttribute('aria-label', 'Toggle psychedelic mode');
        btn.setAttribute('title', 'Toggle psychedelic mode');
        btn.innerHTML = '<span class="icon">🌀</span><span class="label">Trip</span>';

        btn.addEventListener('click', togglePsychedelic);
        document.body.appendChild(btn);

        return btn;
    }

    /**
     * Create SVG filters for wavy effects
     */
    function createSVGFilters() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '0');
        svg.setAttribute('height', '0');
        svg.style.position = 'absolute';
        svg.innerHTML = `
            <defs>
                <filter id="psychedelic-wave">
                    <feTurbulence
                        type="turbulence"
                        baseFrequency="0.01 0.02"
                        numOctaves="2"
                        result="turbulence"
                        seed="1">
                        <animate
                            attributeName="baseFrequency"
                            values="0.01 0.02;0.02 0.01;0.01 0.02"
                            dur="4s"
                            repeatCount="indefinite"/>
                    </feTurbulence>
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="turbulence"
                        scale="5"
                        xChannelSelector="R"
                        yChannelSelector="G"/>
                </filter>

                <filter id="psychedelic-glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>

                <filter id="psychedelic-rgb-shift">
                    <feOffset in="SourceGraphic" dx="2" dy="0" result="red"/>
                    <feOffset in="SourceGraphic" dx="-2" dy="0" result="blue"/>
                    <feOffset in="SourceGraphic" dx="0" dy="2" result="green"/>
                    <feColorMatrix in="red" type="matrix"
                        values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red-out"/>
                    <feColorMatrix in="green" type="matrix"
                        values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green-out"/>
                    <feColorMatrix in="blue" type="matrix"
                        values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue-out"/>
                    <feBlend mode="screen" in="red-out" in2="green-out" result="rg"/>
                    <feBlend mode="screen" in="rg" in2="blue-out"/>
                </filter>
            </defs>
        `;
        document.body.appendChild(svg);
    }

    /**
     * Create floating particles
     */
    function createParticles() {
        particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particlesContainer.appendChild(particle);
        }

        document.body.appendChild(particlesContainer);
    }

    /**
     * Create vaporwave grid background
     */
    function createVaporwaveGrid() {
        vaporwaveGrid = document.createElement('div');
        vaporwaveGrid.className = 'vaporwave-grid';
        document.body.appendChild(vaporwaveGrid);
    }

    /**
     * Handle cursor trail effect
     */
    function handleCursorTrail(e) {
        if (!cursorTrailEnabled) return;

        const now = Date.now();
        if (now - lastTrailTime < 50) return; // Throttle
        lastTrailTime = now;

        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = (e.clientX - 10) + 'px';
        trail.style.top = (e.clientY - 10) + 'px';
        trail.style.background = CURSOR_TRAIL_COLORS[Math.floor(Math.random() * CURSOR_TRAIL_COLORS.length)];

        document.body.appendChild(trail);

        setTimeout(() => {
            trail.remove();
        }, 1000);
    }

    /**
     * Enable psychedelic mode
     */
    function enablePsychedelic() {
        document.body.classList.add('psychedelic');

        // Update button
        const btn = document.querySelector('.psychedelic-toggle');
        if (btn) {
            btn.innerHTML = '<span class="icon">😎</span><span class="label">Chill</span>';
        }

        // Create particles if not exists
        if (!particlesContainer) {
            createParticles();
        }

        // Create vaporwave grid if not exists
        if (!vaporwaveGrid) {
            createVaporwaveGrid();
        }

        // Enable cursor trail
        cursorTrailEnabled = true;
        document.addEventListener('mousemove', handleCursorTrail);

        // Save preference
        try {
            localStorage.setItem(STORAGE_KEY, 'true');
        } catch (e) {}

        // Easter egg console message
        console.log('%c🌀 PSYCHEDELIC MODE ACTIVATED 🌀',
            'font-size: 24px; color: #ff00ff; text-shadow: 2px 2px #00ffff;');
        console.log('%cEnjoy the trip! 🎨✨',
            'font-size: 14px; color: #00ff00;');
    }

    /**
     * Disable psychedelic mode
     */
    function disablePsychedelic() {
        document.body.classList.remove('psychedelic');

        // Update button
        const btn = document.querySelector('.psychedelic-toggle');
        if (btn) {
            btn.innerHTML = '<span class="icon">🌀</span><span class="label">Trip</span>';
        }

        // Disable cursor trail
        cursorTrailEnabled = false;
        document.removeEventListener('mousemove', handleCursorTrail);

        // Remove any existing cursor trails
        document.querySelectorAll('.cursor-trail').forEach(el => el.remove());

        // Save preference
        try {
            localStorage.setItem(STORAGE_KEY, 'false');
        } catch (e) {}

        console.log('%c😎 Back to reality 😎',
            'font-size: 16px; color: #9d50dd;');
    }

    /**
     * Toggle psychedelic mode
     */
    function togglePsychedelic() {
        if (document.body.classList.contains('psychedelic')) {
            disablePsychedelic();
        } else {
            enablePsychedelic();
        }
    }

    /**
     * Check for reduced motion preference
     */
    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /**
     * Initialize
     */
    function init() {
        // Create SVG filters
        createSVGFilters();

        // Create toggle button
        createToggleButton();

        // Check saved preference (only auto-enable if not preferring reduced motion)
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved === 'true' && !prefersReducedMotion()) {
                enablePsychedelic();
            }
        } catch (e) {}

        // Keyboard shortcut: Ctrl/Cmd + Shift + P
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
                e.preventDefault();
                togglePsychedelic();
            }
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
