(function() {
    'use strict';

    // Page structure configuration
    const PAGE_STRUCTURES = {
        'qa_manager_procedure': {
            title: 'QA Manager Procedure',
            phases: [
                { id: 'prep', name: 'Prep', steps: ['step-0'], color: '#579bfc' },
                { id: 'prerun', name: 'Pre-Run', steps: ['step-1', 'step-2', 'step-3', 'step-4', 'step-5', 'step-6'], color: '#fdab3d' },
                { id: 'inprocess', name: 'In-Process', steps: ['step-7', 'step-8', 'step-9', 'step-10', 'step-11'], color: '#00c875' },
                { id: 'final', name: 'Final', steps: ['step-12', 'step-13'], color: '#9d50dd' }
            ]
        },
        'qa_workflow_analysis': {
            title: 'QA Workflow Analysis',
            sections: true
        }
    };

    // Get current page key from URL
    function getPageKey() {
        var path = window.location.pathname;
        var filename = path.split('/').pop().replace('.html', '');
        return filename;
    }

    // Get step name from element
    function getStepName(stepId) {
        var el = document.getElementById(stepId);
        if (!el) return stepId;

        var h2 = el.querySelector('h2') || el.closest('.section')?.querySelector('h2');
        if (h2) {
            // Extract just the title part after the badge
            var text = h2.textContent.trim();
            // Remove "STEP X" prefix
            text = text.replace(/^STEP\s*\d+\s*/i, '').trim();
            return text;
        }
        return stepId;
    }

    // Find which phase a step belongs to
    function getPhaseForStep(stepId, structure) {
        if (!structure.phases) return null;
        for (var i = 0; i < structure.phases.length; i++) {
            if (structure.phases[i].steps.indexOf(stepId) !== -1) {
                return structure.phases[i];
            }
        }
        return null;
    }

    // Get step number (0-13)
    function getStepNumber(stepId) {
        var match = stepId.match(/step-(\d+)/);
        return match ? parseInt(match[1], 10) : -1;
    }

    // Create breadcrumb bar HTML
    function createBreadcrumbBar(structure) {
        var bar = document.createElement('div');
        bar.className = 'breadcrumb-bar';
        bar.innerHTML = `
            <div class="breadcrumb-content">
                <div class="breadcrumb-trail">
                    <a href="./index.html" class="breadcrumb-home">Home</a>
                    <span class="breadcrumb-sep">›</span>
                    <span class="breadcrumb-page">${structure.title}</span>
                    <span class="breadcrumb-sep breadcrumb-phase-sep">›</span>
                    <span class="breadcrumb-phase"></span>
                    <span class="breadcrumb-sep breadcrumb-step-sep">›</span>
                    <span class="breadcrumb-step"></span>
                </div>
                <div class="breadcrumb-progress">
                    ${structure.phases ? createPhaseIndicator(structure.phases) : ''}
                    <span class="breadcrumb-counter"></span>
                </div>
            </div>
        `;
        return bar;
    }

    // Create phase dots indicator
    function createPhaseIndicator(phases) {
        var html = '<div class="phase-indicator">';
        phases.forEach(function(phase) {
            html += `<button class="phase-dot" data-phase="${phase.id}" style="--phase-color: ${phase.color}" title="${phase.name}">
                <span class="phase-dot-inner"></span>
            </button>`;
        });
        html += '</div>';
        return html;
    }

    // Update breadcrumb display
    function updateBreadcrumb(stepId, structure) {
        var phase = getPhaseForStep(stepId, structure);
        var stepName = getStepName(stepId);
        var stepNum = getStepNumber(stepId);
        var totalSteps = 14; // 0-13

        // Update phase
        var phaseEl = document.querySelector('.breadcrumb-phase');
        var phaseSep = document.querySelector('.breadcrumb-phase-sep');
        if (phaseEl && phase) {
            phaseEl.textContent = phase.name + ' Phase';
            phaseEl.style.color = phase.color;
            phaseSep.style.display = '';
        } else if (phaseEl) {
            phaseEl.textContent = '';
            phaseSep.style.display = 'none';
        }

        // Update step
        var stepEl = document.querySelector('.breadcrumb-step');
        var stepSep = document.querySelector('.breadcrumb-step-sep');
        if (stepEl && stepNum >= 0) {
            stepEl.textContent = 'Step ' + stepNum;
            stepSep.style.display = '';
        } else if (stepEl) {
            stepEl.textContent = '';
            stepSep.style.display = 'none';
        }

        // Update counter
        var counterEl = document.querySelector('.breadcrumb-counter');
        if (counterEl && stepNum >= 0) {
            counterEl.textContent = 'Step ' + stepNum + ' of ' + (totalSteps - 1);
        }

        // Update phase dots
        var dots = document.querySelectorAll('.phase-dot');
        dots.forEach(function(dot) {
            var dotPhase = dot.getAttribute('data-phase');
            dot.classList.toggle('active', phase && dotPhase === phase.id);

            // Mark completed phases
            if (structure.phases && phase) {
                var currentPhaseIndex = structure.phases.findIndex(function(p) { return p.id === phase.id; });
                var dotPhaseIndex = structure.phases.findIndex(function(p) { return p.id === dotPhase; });
                dot.classList.toggle('completed', dotPhaseIndex < currentPhaseIndex);
            }
        });
    }

    // Set up Intersection Observer
    function setupScrollTracking(structure) {
        var sections = [];

        if (structure.phases) {
            structure.phases.forEach(function(phase) {
                phase.steps.forEach(function(stepId) {
                    var el = document.getElementById(stepId);
                    if (el) sections.push({ id: stepId, el: el });
                });
            });
        }

        if (sections.length === 0) return;

        var currentSection = null;

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
                    var stepId = entry.target.id;
                    if (stepId !== currentSection) {
                        currentSection = stepId;
                        updateBreadcrumb(stepId, structure);

                        // Update URL hash without scrolling
                        if (history.replaceState) {
                            history.replaceState(null, null, '#' + stepId);
                        }
                    }
                }
            });
        }, {
            threshold: [0.2, 0.5],
            rootMargin: '-80px 0px -50% 0px'
        });

        sections.forEach(function(section) {
            observer.observe(section.el);
        });

        // Handle phase dot clicks
        document.querySelectorAll('.phase-dot').forEach(function(dot) {
            dot.addEventListener('click', function() {
                var phaseId = this.getAttribute('data-phase');
                var phase = structure.phases.find(function(p) { return p.id === phaseId; });
                if (phase && phase.steps[0]) {
                    var target = document.getElementById(phase.steps[0]);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    }

    // Add styles
    function addStyles() {
        var style = document.createElement('style');
        style.textContent = `
            .breadcrumb-bar {
                position: sticky;
                top: 49px; /* Below nav */
                z-index: 99;
                background: linear-gradient(135deg, #0f0f23 0%, #16213e 100%);
                border-bottom: 1px solid #2a2a4a;
                padding: 10px 20px;
                font-size: 0.85em;
                backdrop-filter: blur(10px);
            }

            .breadcrumb-content {
                max-width: 1400px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 20px;
            }

            .breadcrumb-trail {
                display: flex;
                align-items: center;
                gap: 8px;
                flex-wrap: wrap;
            }

            .breadcrumb-home {
                color: #9d50dd;
                text-decoration: none;
            }

            .breadcrumb-home:hover {
                text-decoration: underline;
            }

            .breadcrumb-sep {
                color: #666;
            }

            .breadcrumb-page {
                color: #aaa;
            }

            .breadcrumb-phase {
                font-weight: 600;
                transition: color 0.2s;
            }

            .breadcrumb-step {
                color: #eee;
            }

            .breadcrumb-progress {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .phase-indicator {
                display: flex;
                gap: 6px;
            }

            .phase-dot {
                width: 28px;
                height: 28px;
                border-radius: 50%;
                border: 2px solid var(--phase-color);
                background: transparent;
                cursor: pointer;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
            }

            .phase-dot:hover {
                transform: scale(1.1);
            }

            .phase-dot-inner {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: transparent;
                transition: all 0.2s;
            }

            .phase-dot.active .phase-dot-inner {
                background: var(--phase-color);
                box-shadow: 0 0 8px var(--phase-color);
            }

            .phase-dot.completed .phase-dot-inner {
                background: var(--phase-color);
                opacity: 0.5;
            }

            .breadcrumb-counter {
                color: #888;
                font-size: 0.9em;
                white-space: nowrap;
            }

            @media (max-width: 768px) {
                .breadcrumb-bar {
                    padding: 8px 15px;
                }

                .breadcrumb-content {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 8px;
                }

                .breadcrumb-progress {
                    width: 100%;
                    justify-content: space-between;
                }

                .breadcrumb-page {
                    display: none;
                }

                .breadcrumb-phase-sep:first-of-type {
                    display: none !important;
                }
            }

            @media (max-width: 480px) {
                .breadcrumb-bar {
                    padding: 6px 12px;
                }

                .breadcrumb-content {
                    flex-direction: row;
                    align-items: center;
                    gap: 0;
                }

                .breadcrumb-trail {
                    display: none;
                }

                .breadcrumb-progress {
                    width: 100%;
                    justify-content: center;
                    gap: 10px;
                }

                .phase-indicator {
                    gap: 4px;
                }

                .phase-dot {
                    width: 20px;
                    height: 20px;
                    border-width: 2px;
                }

                .phase-dot-inner {
                    width: 8px;
                    height: 8px;
                }

                .breadcrumb-counter {
                    font-size: 0.85em;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize
    function init() {
        var pageKey = getPageKey();
        var structure = PAGE_STRUCTURES[pageKey];

        if (!structure) return; // No breadcrumb config for this page

        addStyles();

        var bar = createBreadcrumbBar(structure);

        // Insert after nav
        var nav = document.querySelector('nav');
        if (nav) {
            nav.parentNode.insertBefore(bar, nav.nextSibling);
        } else {
            document.body.insertBefore(bar, document.body.firstChild);
        }

        // Set up scroll tracking
        setupScrollTracking(structure);

        // Initial state from hash or first section
        var initialStep = window.location.hash ? window.location.hash.slice(1) : 'step-0';
        if (structure.phases) {
            var validStep = structure.phases.some(function(p) {
                return p.steps.indexOf(initialStep) !== -1;
            });
            if (!validStep) initialStep = 'step-0';
        }
        updateBreadcrumb(initialStep, structure);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
