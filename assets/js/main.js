/**
* Lightweight UI behavior for the public site.
*/
(function() {
  "use strict";

  const select = (selector) => document.querySelector(selector);
  const selectAll = (selector) => [...document.querySelectorAll(selector)];

  const backToTop = select('.back-to-top');
  if (backToTop) {
    const toggleBackToTop = () => {
      backToTop.classList.toggle('active', window.scrollY > 100);
    };

    window.addEventListener('load', toggleBackToTop, { passive: true });
    document.addEventListener('scroll', toggleBackToTop, { passive: true });
  }

  const typed = select('.typed');
  if (typed && window.Typed) {
    const items = typed
      .getAttribute('data-typed-items')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    if (items.length) {
      new Typed('.typed', {
        strings: items,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    }
  }

  if (window.GLightbox && select('.portfolio-details-lightbox')) {
    GLightbox({
      selector: '.portfolio-details-lightbox',
      width: '90%',
      height: '90vh'
    });
  }

  if (window.Swiper && select('.portfolio-details-slider')) {
    const swiperConfig = {
      speed: 400,
      loop: true,
      preloadImages: false,
      noSwiping: true,
      noSwipingSelector: 'video',
      preventClicks: false,
      preventClicksPropagation: false,
      touchStartPreventDefault: false,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      on: {
        init(swiper) {
          pauseInactiveVideos(swiper);
        },
        slideChangeTransitionStart(swiper) {
          pauseInactiveVideos(swiper);
        }
      }
    };

    if (select('.swiper-button-next') && select('.swiper-button-prev')) {
      swiperConfig.navigation = {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      };
    }

    new Swiper('.portfolio-details-slider', swiperConfig);
  }

  if (window.AOS && select('[data-aos]')) {
    window.addEventListener('load', () => {
      AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        mirror: false
      });
    });
  }

  function pauseInactiveVideos(swiper) {
    selectAll('.portfolio-details-slider video').forEach((video) => {
      const slide = video.closest('.swiper-slide');
      if (!slide) {
        return;
      }

      if (slide.swiperSlideIndex !== swiper.realIndex && slide.dataset.swiperSlideIndex !== String(swiper.realIndex) && !slide.classList.contains('swiper-slide-active')) {
        video.pause();
      }
    });
  }
})();
