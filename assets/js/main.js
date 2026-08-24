

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
    }
    if (typeof AOS !== 'undefined') {
      lenis.on('scroll', () => AOS.refresh());
    }
  }

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);


    const header = document.querySelector('.site-header');
    if (header) {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: { className: 'header-scrolled', targets: header },
      });
    }


    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .from('.hero-badge', { opacity: 0, y: 25, duration: 0.8, delay: 0.2 })
      .from('.hero-title-reveal', { opacity: 0, y: 40, duration: 1, stagger: 0.15 }, '-=0.5')
      .from('.hero-desc', { opacity: 0, y: 25, duration: 0.8 }, '-=0.6')
      .from('.hero-buttons', { opacity: 0, y: 25, duration: 0.8 }, '-=0.6')
      .from('.hero-visual-card', { opacity: 0, scale: 0.9, duration: 1 }, '-=0.7');


    const floatingItems = document.querySelectorAll('.floating-elem');
    if (floatingItems.length) {
      floatingItems.forEach((el, i) => {
        const delay = i * 0.4;
        const yDist = 12 + (i % 3) * 6;
        gsap.to(el, {
          y: -yDist,
          duration: 3 + (i % 2),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: delay,
        });
      });
    }


    const parallaxBgs = document.querySelectorAll('.parallax-banner-bg');
    if (parallaxBgs.length) {
      parallaxBgs.forEach((bg) => {
        if (bg.parentElement) {
          gsap.to(bg, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: bg.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });
    }


    const footerWatermark = document.querySelector('.footer-giant-watermark');
    if (footerWatermark) {
      ScrollTrigger.matchMedia({
        // Desktop & Tablets
        "(min-width: 768px)": function() {
          gsap.fromTo(
            footerWatermark,
            { x: '-25vw', opacity: 0.3 },
            {
              x: '0vw',
              opacity: 1,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: '.site-footer-main',
                start: 'top 95%',
                end: 'bottom bottom',
                scrub: 1.2,
                invalidateOnRefresh: true,
              },
            }
          );
        },
        // Mobile devices (< 768px)
        "(max-width: 767.98px)": function() {
          gsap.fromTo(
            footerWatermark,
            { x: '-35vw', opacity: 0.25 },
            {
              x: '0vw',
              opacity: 1,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: '.site-footer-main',
                start: 'top 95%',
                end: 'bottom bottom',
                scrub: 1,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      });
    }
  }

  const counterElements = document.querySelectorAll('.stat-number');
  if (counterElements.length && typeof gsap !== 'undefined') {
    counterElements.forEach((el) => {
      const targetVal = parseFloat(el.getAttribute('data-target') || '0');
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const counterObj = { val: 0 };
          gsap.to(counterObj, {
            val: targetVal,
            duration: 2.2,
            ease: 'power2.out',
            onUpdate: () => {
              el.innerText = prefix + Math.floor(counterObj.val).toLocaleString() + suffix;
            },
          });
        },
      });
    });
  }


  if (document.querySelector('.clients-swiper')) {
    new Swiper('.clients-swiper', {
      slidesPerView: 2,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      breakpoints: {
        576: { slidesPerView: 3, spaceBetween: 30 },
        768: { slidesPerView: 4, spaceBetween: 40 },
        992: { slidesPerView: 5, spaceBetween: 50 },
      },
    });
  }

  if (document.querySelector('.testimonials-swiper')) {
    new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: '.testimonials-next-btn',
        prevEl: '.testimonials-prev-btn',
      },
      breakpoints: {
        // Mobile (< 768px): 1 card
        0: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
        // Tablet (768px - 1023px): 3 cards
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        // Laptop & Desktop (1024px+): 4 cards
        1024: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
    });
  }

  const projectItems = document.querySelectorAll('.project-accordion-item');
  const projectNumBtns = document.querySelectorAll('.project-num-btn');

  function setActiveProject(index) {
    projectItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    projectNumBtns.forEach((btn, i) => {
      if (i === index) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  projectItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      setActiveProject(index);
    });

    item.addEventListener('mouseenter', () => {

      if (window.innerWidth >= 992) {
        setActiveProject(index);
      }
    });
  });

  projectNumBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      setActiveProject(index);
    });

    btn.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 992) {
        setActiveProject(index);
      }
    });
  });

  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 50,
      easing: 'ease-out-cubic',
    });
  }

  const quoteForm = document.getElementById('quoteRequestForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i> Quote Submitted Successfully!';
      submitBtn.classList.add('btn-success-active');
      quoteForm.reset();
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove('btn-success-active');
      }, 4000);
    });
  }

  const darkTealSection = document.querySelector('.dark-composition-section');
  if (darkTealSection) {
    const tiles = darkTealSection.querySelectorAll('.dark-service-tile');
    if (tiles.length) {
      let currentOffset = 0;
      let returnTimeout = null;

      const cardConfigs = [
        { yFactor: -0.22, rotFactor: -0.6, scaleFactor: 0.0003 },
        { yFactor: 0.16, rotFactor: 0.4, scaleFactor: -0.0002 },
        { yFactor: -0.28, rotFactor: -0.8, scaleFactor: 0.0004 },
      ];

      const applyCardOffsets = (offset, duration = 0.4) => {
        tiles.forEach((tile, index) => {
          const cfg = cardConfigs[index % cardConfigs.length];
          const y = offset * cfg.yFactor;
          const rot = offset * cfg.rotFactor;
          const scale = Math.max(0.96, Math.min(1.04, 1 + offset * cfg.scaleFactor));

          if (typeof gsap !== 'undefined') {
            gsap.to(tile, {
              y: y,
              rotation: rot,
              scale: scale,
              duration: duration,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          } else {
            tile.style.transform = `translate3d(0, ${y}px, 0) rotate(${rot}deg) scale(${scale})`;
          }
        });
      };

      darkTealSection.addEventListener(
        'wheel',
        (e) => {
          const delta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 45);
          currentOffset = Math.max(-100, Math.min(100, currentOffset + delta * 0.4));
          applyCardOffsets(currentOffset, 0.4);

          clearTimeout(returnTimeout);
          returnTimeout = setTimeout(() => {
            currentOffset = 0;
            applyCardOffsets(0, 0.8);
          }, 350);
        },
        { passive: true }
      );

      darkTealSection.addEventListener('mouseleave', () => {
        clearTimeout(returnTimeout);
        currentOffset = 0;
        applyCardOffsets(0, 0.7);
      });
    }
  }
});
