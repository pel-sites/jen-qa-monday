(function() {
    'use strict';

    function slugify(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }

    function showToast(message) {
        var existing = document.querySelector('.share-toast');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.className = 'share-toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        requestAnimationFrame(function() {
            toast.classList.add('show');
        });

        setTimeout(function() {
            toast.classList.remove('show');
            setTimeout(function() {
                toast.remove();
            }, 300);
        }, 2000);
    }

    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function() {
                showToast('Link copied!');
            }).catch(function() {
                fallbackCopy(text);
            });
        } else {
            fallbackCopy(text);
        }
    }

    function fallbackCopy(text) {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showToast('Link copied!');
        } catch (e) {
            showToast('Failed to copy');
        }
        document.body.removeChild(textarea);
    }

    function setupCopyButtons() {
        var headings = document.querySelectorAll('h2, h3');

        headings.forEach(function(heading) {
            if (heading.closest('.modal-content') || heading.closest('.toc')) return;

            var anchorId = heading.id;
            if (!anchorId) {
                var parentSection = heading.closest('.section[id]');
                if (parentSection) {
                    anchorId = parentSection.id;
                } else {
                    var text = heading.textContent.replace(/^(STEP \d+|[\d]+\.?)\s*/i, '');
                    anchorId = slugify(text);
                    heading.id = anchorId;
                }
            }

            if (!anchorId) return;

            if (heading.querySelector('.copy-link-btn')) return;

            var btn = document.createElement('button');
            btn.className = 'copy-link-btn';
            btn.setAttribute('aria-label', 'Copy link to section');
            btn.setAttribute('title', 'Copy link to section');
            btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';

            (function(id) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var url = window.location.origin + window.location.pathname + '#' + id;
                    copyToClipboard(url);
                });
            })(anchorId);

            heading.style.position = 'relative';
            heading.appendChild(btn);
        });
    }

    function highlightAnchor() {
        if (!window.location.hash) return;

        var target = document.querySelector(window.location.hash);
        if (!target) return;

        target.classList.add('anchor-highlight');

        setTimeout(function() {
            target.classList.remove('anchor-highlight');
        }, 2000);
    }

    function setupNavScrollAffordance() {
        var scrollContainers = document.querySelectorAll('.nav-scroll-container');
        scrollContainers.forEach(function(container) {
            var scrollArea = container.querySelector('.nav-scroll');
            if (!scrollArea) return;

            function checkScrollEnd() {
                var isAtEnd = scrollArea.scrollLeft + scrollArea.clientWidth >= scrollArea.scrollWidth - 5;
                container.classList.toggle('scrolled-end', isAtEnd);
            }

            checkScrollEnd();
            scrollArea.addEventListener('scroll', checkScrollEnd);
            window.addEventListener('resize', checkScrollEnd);
        });
    }

    function setupCollapsibles() {
        var collapsibles = document.querySelectorAll('.collapsible');
        var STORAGE_KEY = 'collapsible-states';

        function getStoredStates() {
            try {
                return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
            } catch (e) {
                return {};
            }
        }

        function saveState(id, isCollapsed) {
            try {
                var states = getStoredStates();
                states[window.location.pathname + '#' + id] = isCollapsed;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(states));
            } catch (e) {
                // Ignore storage errors
            }
        }

        collapsibles.forEach(function(collapsible) {
            var header = collapsible.querySelector('.collapsible-header');
            if (!header) return;

            var id = collapsible.id || header.textContent.trim().slice(0, 30).replace(/\s+/g, '-').toLowerCase();
            collapsible.id = id;

            // Restore state from localStorage
            var states = getStoredStates();
            var storedState = states[window.location.pathname + '#' + id];
            if (storedState === true) {
                collapsible.classList.add('collapsed');
            }

            // Add toggle icon if not present
            if (!header.querySelector('.collapsible-toggle')) {
                var toggle = document.createElement('span');
                toggle.className = 'collapsible-toggle';
                toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>';
                header.appendChild(toggle);
            }

            header.addEventListener('click', function(e) {
                // Don't toggle if clicking a link inside header
                if (e.target.tagName === 'A') return;

                var isCollapsed = collapsible.classList.toggle('collapsed');
                saveState(id, isCollapsed);
            });

            // Make it keyboard accessible
            header.setAttribute('tabindex', '0');
            header.setAttribute('role', 'button');
            header.setAttribute('aria-expanded', !collapsible.classList.contains('collapsed'));

            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    header.click();
                }
            });
        });
    }

    function init() {
        setupCopyButtons();
        highlightAnchor();
        setupNavScrollAffordance();
        setupCollapsibles();

        window.addEventListener('hashchange', highlightAnchor);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
