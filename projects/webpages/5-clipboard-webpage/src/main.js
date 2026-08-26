const UI = {
  sections: null,
};

function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  UI.sections.forEach((section) => observer.observe(section));
}

function init() {
  UI.sections = document.querySelectorAll('[data-animate]');

  initScrollAnimations();
}

init();
