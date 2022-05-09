'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(modal => modal.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpendal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const header = document.querySelector('.header');

// creating dom elements

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML =
//   "We use cookies for better performance and analytics. <button class='btn btn--close--cookie'>Got it!<button>";
// header.prepend(message);

// // removing element from the dom

// // styling message box

// message.style.backgroundColor = 'grey';
// message.style.width = ' 120%';

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 20 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'red');

// manipulatng attributes

const logo = document.querySelector('.nav__logo');
console.log(logo.src);

// scrolling animation

const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScroll.addEventListener('click', function (event) {
  // const s1Coords = section1.getBoundingClientRect();
  // console.log(s1Coords);

  // scrolling
  // window.scrollTo(
  //   s1Coords.left + window.scrollX,
  //   s1Coords.top + window.scrollY
  // ); ///  New update // scrollY instead of window.pageYOffset

  /*window.scrollTo({
    left: s1Coords.left + window.scrollX,
    top: s1Coords.top + window.scrollY,   // OLD METHOD FOR SCROLLING ANIMATION
    behavior: 'smooth',
  });*/

  section1.scrollIntoView({
    behavior: 'smooth', // Modern method for scrolling animation
  });
});

// page navigation // smooth scroll

/* document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (event) {
    event.preventDefault();
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  });
});
*/

// SMOOTH SCROLL EFFECT EFFICIENT WAY //

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

// TABS

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (event) {
  event.preventDefault();
  const clicked = event.target.closest('.operations__tab');
  console.log(clicked);

  // guard clause
  if (!clicked) return;
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  tabContent.forEach(cont =>
    cont.classList.remove('operations__content--active')
  );
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// MENU FADE ANIMATION

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = opacity;
      }
      logo.style.opacity = opacity;
    });
  }
};

const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', function (e) {
  // We could use bind method also
  handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

// STICKY NAVUGATION

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => console.log(entry));
// };
// const obsOption = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOption);
// observer.observe(section1);

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// REVEALING ELEMENTS ON SCROLL

const allSection = document.querySelectorAll('.section');
const revealEl = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); // terminating oberving
};
const sectionObserver = new IntersectionObserver(revealEl, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//  LAZY LOADING IMAGES

const imgTarget = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  // Replacing src with datasrc
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    // listening for load
    entry.target.classList.remove('lazy-img');
    observer.unobserve(entry.target); // terminating oberving
  });
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTarget.forEach(img => imgObserver.observe(img));

// SLIDER

const sliderFunction = function () {
  const slides = document.querySelectorAll('.slide');
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  const dotContainer = document.querySelector('.dots');
  let currentSlide = 0;
  const maxSlides = slides.length - 1;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide=${i}></button>`
      );
    });
  };

  const activeDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${(i - slide) * 100}%)`;
    });
  };

  const nextSlide = function () {
    if (currentSlide == maxSlides) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide == 0) {
      currentSlide = maxSlides;
    } else {
      currentSlide--;
    }

    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  // Initialisation
  const init = function () {
    goToSlide(0);
    createDots();
    activeDot(0);
  };

  init();

  //event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  document.addEventListener('keydown', function (event) {
    console.log(event);
    if (event.key === 'ArrowRight') nextSlide();

    event.key === 'ArrowLeft' && prevSlide(); // short circuiting
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset; // working with data set
      goToSlide(slide);
      activeDot(slide);
    }
  });
};

sliderFunction();
