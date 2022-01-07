'use strict';

(function () {

  const header = document.querySelector('.page-header');
  const menuButton = header.querySelector('.page-header__toggle');
  const body = document.querySelector('.page-body');
  const modal = document.querySelector('.modal');
  const loginButtons = document.querySelectorAll('.login-link');
  const modalOverlay = document.querySelector('.modal__overlay');
  const modalForm = document.querySelector('.modal__login');
  const pageBody = document.querySelector('body');
  const focusManagerLib = focusManager; // eslint-disable-line
  const storage = window.localStorage;

  const openModal = function (item, evt) {
    evt.preventDefault();
    if (item) {
      item.classList.add('modal--open');
      modalOverlay.classList.add('lock');
      pageBody.classList.add('lock');
      focusManagerLib.capture(modal);
      const modalCloseButton = document.querySelector('.modal__close-button');
      const emailField = item.querySelector('.modal__email');

      if (header.classList.contains('page-header--open')) {
        header.classList.add('page-header--close');
        header.classList.remove('page-header--open');
        body.classList.remove('lock-menu');
        focusManagerLib.release(menuButton);
      }

      if (storage.email) {
        emailField.value = storage.getItem('email');
      }

      emailField.focus();

      modalCloseButton.addEventListener('click', onCloseButtonPress);
      modalOverlay.addEventListener('click', onOverlayClick);
      window.addEventListener('keydown', onEscKeyPress);
    }
  };

  const closeModal = function () {
    modal.classList.remove('modal--open');
    pageBody.classList.remove('lock');
    const modalCloseButton = modal.querySelector('.modal__close-button');
    modalCloseButton.removeEventListener('click', onCloseButtonPress);
    modalOverlay.removeEventListener('click', onOverlayClick);
    focusManagerLib.release(modal);
    window.removeEventListener('keydown', onEscKeyPress);
  };

  const onModalSubmit = function (evt) {
    const email = evt.target.querySelector('.modal__email');

    if (email.value !== '') {
      evt.preventDefault();
      storage.setItem('email', email.value);
      closeModal();
    }
  };

  const onModalOpen = function (evt) {
    openModal(modal, evt);
  };

  const onCloseButtonPress = () => {
    closeModal();
  };

  var onOverlayClick = function (evt) {
    if (evt.target.matches('.lock')) {
      closeModal();
    }
  };

  const onEscKeyPress = function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      closeModal();
    }
  };

  loginButtons.forEach((item) => {
    item.addEventListener('click', onModalOpen);
  });

  if (modalForm) {
    modalForm.addEventListener('submit', onModalSubmit);
  }


  header.classList.remove('page-header--no-js');
  header.classList.add('page-header--close');

  const switchMenu = () => {
    if (header.classList.contains('page-header--close')) {
      header.classList.remove('page-header--close');
      header.classList.add('page-header--open');
      body.classList.add('lock-menu');
      focusManagerLib.capture(header);
    } else {
      header.classList.add('page-header--close');
      header.classList.remove('page-header--open');
      body.classList.remove('lock-menu');
      focusManagerLib.release(menuButton);
    }
  };

  menuButton.addEventListener('click', () => {
    switchMenu();
  });


  if (window.location.toString().includes('main.html')) {
    const faqButtons = document.querySelectorAll('.faq__item');
    const faqList = document.querySelector('.faq__list');

    faqList.classList.remove('faq__list--nojs');

    faqButtons.forEach((item) => {
      item.classList.add('closed');

      item.addEventListener('click', () => {
        if (item.classList.contains('closed')) {
          faqButtons.forEach((toggle) => {
            if (toggle.classList.contains('opened')) {
              toggle.classList.remove('opened');
              toggle.classList.add('closed');
            }
          });

          item.classList.remove('closed');
          item.classList.add('opened');

        } else if (item.classList.contains('opened')) {
          item.classList.remove('opened');
          item.classList.add('closed');
        }
      });
    });
  }

  if (window.location.toString().includes('catalog.html')) {
    const filter = document.querySelector('.filter');
    const filterButtons = document.querySelectorAll('.filter__field');
    const filterOpenButton = document.querySelector('.catalog__filter-button');
    const filterCloseButton = document.querySelector('.filter__close-button');

    filterOpenButton.addEventListener('click', () => {
      if (filter.classList.contains('filter--close')) {
        filter.classList.remove('filter--close');
      }
      filter.classList.add('filter--open');
    });

    filterCloseButton.addEventListener('click', () => {
      if (filter.classList.contains('filter--open')) {
        filter.classList.remove('filter--open');
      }
      filter.classList.add('filter--close');
    });

    filterButtons.forEach((item) => {
      item.classList.add('filter__field--closed');

      item.addEventListener('click', () => {
        if (item.classList.contains('filter__field--closed')) {
          item.classList.remove('filter__field--closed');
        } else {
          item.classList.add('filter__field--closed');
        }
      });
    });
  }

  // eslint-disable-next-line
  let swiper = new Swiper('.slider-catalog__slider', {
    simulateTouch: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30,
        pagination: {
          type: 'fraction',
          renderFraction: function (currentClass, totalClass, index, total) {
            return '<span class="' + currentClass + '">0 ' + index + ' </span>' +
                ' of ' +
                '<span class="' + totalClass + '">0 ' + total + ' </span>';
          },
        }
      },
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 30,
        pagination: {
          type: 'bullets',
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          },
        }
      },
      1024: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 30,
        pagination: {
          type: 'bullets',
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          },
        }
      }
    }
  });
})();
