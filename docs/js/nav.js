(function() {
  'use strict';

  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');

    if (!toggle || !links) return;

    toggle.addEventListener('click', function() {
      toggle.classList.toggle('active');
      links.classList.toggle('active');
    });

    links.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') {
        toggle.classList.remove('active');
        links.classList.remove('active');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
