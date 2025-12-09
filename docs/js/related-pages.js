(function() {
    'use strict';

    // Cross-reference mapping: which pages relate to which
    const PAGE_RELATIONS = {
        'qa_manager_procedure': {
            title: 'QA Manager Procedure',
            related: [
                { page: 'qa_workflow_analysis', title: 'QA Workflow Analysis', reason: 'How this procedure maps to Monday.com' },
                { page: 'team_performance_analysis', title: 'Team Performance Analysis', reason: 'Current compliance metrics' },
                { page: 'ideal_candidate_profile', title: 'Ideal Candidate Profile', reason: 'Who will execute this procedure' }
            ]
        },
        'team_performance_analysis': {
            title: 'Team Performance Analysis',
            related: [
                { page: 'qa_manager_procedure', title: 'QA Manager Procedure', reason: 'What\'s being measured' },
                { page: 'next_steps_roadmap', title: 'Next Steps Roadmap', reason: 'How we\'re fixing the gaps' },
                { page: 'ideal_candidate_profile', title: 'Ideal Candidate Profile', reason: 'Why we\'re hiring' }
            ]
        },
        'qa_workflow_analysis': {
            title: 'QA Workflow Analysis',
            related: [
                { page: 'qa_manager_procedure', title: 'QA Manager Procedure', reason: 'The procedure this maps to' },
                { page: 'team_performance_analysis', title: 'Team Performance Analysis', reason: 'Current compliance data' },
                { page: 'next_steps_roadmap', title: 'Next Steps Roadmap', reason: 'Planned improvements' }
            ]
        },
        'next_steps_roadmap': {
            title: 'Next Steps Roadmap',
            related: [
                { page: 'team_performance_analysis', title: 'Team Performance Analysis', reason: 'Current state analysis' },
                { page: 'qa_workflow_analysis', title: 'QA Workflow Analysis', reason: 'Workflow gaps to address' },
                { page: 'ideal_candidate_profile', title: 'Ideal Candidate Profile', reason: 'Hiring as part of solution' }
            ]
        },
        'ideal_candidate_profile': {
            title: 'Ideal Candidate Profile',
            related: [
                { page: 'qa_manager_procedure', title: 'QA Manager Procedure', reason: 'What they\'ll be doing' },
                { page: 'team_performance_analysis', title: 'Team Performance Analysis', reason: 'Why we\'re hiring' },
                { page: 'next_steps_roadmap', title: 'Next Steps Roadmap', reason: 'Where they fit in the plan' }
            ]
        }
    };

    // Get current page key from URL
    function getPageKey() {
        var path = window.location.pathname;
        var filename = path.split('/').pop().replace('.html', '');
        // Handle root index
        if (filename === '' || filename === 'index') return null;
        return filename;
    }

    // Create related pages section
    function createRelatedSection(pageData) {
        var section = document.createElement('div');
        section.className = 'related-pages';

        var html = '<div class="related-pages-header"><span class="related-icon">→</span> Related Pages</div>';
        html += '<div class="related-pages-grid">';

        pageData.related.forEach(function(rel) {
            html += `
                <a href="/${rel.page}.html" class="related-page-card">
                    <div class="related-page-title">${rel.title}</div>
                    <div class="related-page-reason">${rel.reason}</div>
                </a>
            `;
        });

        html += '</div>';
        section.innerHTML = html;
        return section;
    }

    // Add styles
    function addStyles() {
        var style = document.createElement('style');
        style.textContent = `
            .related-pages {
                margin-top: 60px;
                padding-top: 40px;
                border-top: 1px solid #2a2a4a;
            }

            .related-pages-header {
                font-size: 1.1em;
                font-weight: 600;
                color: #9d50dd;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .related-icon {
                font-size: 1.2em;
            }

            .related-pages-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 15px;
            }

            .related-page-card {
                background: #0f0f23;
                border: 1px solid #2a2a4a;
                border-radius: 8px;
                padding: 16px 20px;
                text-decoration: none;
                transition: all 0.2s ease;
            }

            .related-page-card:hover {
                border-color: #9d50dd;
                background: #16213e;
                transform: translateY(-2px);
            }

            .related-page-title {
                color: #fff;
                font-weight: 500;
                margin-bottom: 6px;
            }

            .related-page-reason {
                color: #888;
                font-size: 0.85em;
            }

            .related-page-card:hover .related-page-reason {
                color: #aaa;
            }

            /* Inline cross-reference callout */
            .cross-ref {
                background: linear-gradient(135deg, rgba(87, 155, 252, 0.15) 0%, rgba(87, 155, 252, 0.05) 100%);
                border: 1px solid rgba(87, 155, 252, 0.3);
                border-radius: 8px;
                padding: 12px 16px;
                margin: 15px 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .cross-ref-icon {
                color: #579bfc;
                font-size: 1.1em;
            }

            .cross-ref a {
                color: #579bfc;
                text-decoration: none;
            }

            .cross-ref a:hover {
                text-decoration: underline;
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize
    function init() {
        var pageKey = getPageKey();
        var pageData = PAGE_RELATIONS[pageKey];

        if (!pageData) return; // No relations for this page (probably index)

        addStyles();

        // Find footer or last section to insert before
        var footer = document.querySelector('.footer');
        var lastSection = document.querySelector('.section:last-of-type');

        var relatedSection = createRelatedSection(pageData);

        if (footer) {
            footer.parentNode.insertBefore(relatedSection, footer);
        } else if (lastSection) {
            lastSection.parentNode.insertBefore(relatedSection, lastSection.nextSibling);
        } else {
            document.body.appendChild(relatedSection);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
