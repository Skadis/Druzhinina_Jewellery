'use strict';

(function () {

  /* global focusManager, Swiper */

  const header = document.querySelector('.page-header');
  const menuButton = header.querySelector('.page-header__toggle');
  const body = document.querySelector('.page-body');
  const modal = document.querySelector('.modal');
  const loginButtons = document.querySelectorAll('.login-link');
  const modalOverlay = document.querySelector('.modal__overlay');
  const modalForm = document.querySelector('.modal__login');
  const pageBody = document.querySelector('body');
  const focusManagerLib = focusManager;
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
    const sliderList = document.querySelector('.slider-catalog__list');

    let swiper = new Swiper('.slider-catalog__slider', {
      init: false,
      simulateTouch: false,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
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

    swiper.init();

    swiper.$el.on('keydown', (e) => {

      const slideIndex = e.target.dataset.slideIndex;

      if (!slideIndex) {
        return;
      }

      swiper.slideTo(slideIndex);
    });

    faqList.classList.remove('faq__list--no-js');
    sliderList.classList.remove('slider-catalog__list--no-js');

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
    const filterButtons = document.querySelectorAll('.filter__field');
    const filterOpenButton = document.querySelector('.catalog__filter-button');
    const filterModal = document.querySelector('.modal--filter');
    const filterModalOverlay = filterModal.querySelector('.modal__overlay');

    const openModalFilter = function (item, evt) {
      evt.preventDefault();
      if (item) {
        item.classList.add('modal--open');
        filterModalOverlay.classList.add('lock');
        pageBody.classList.add('lock');
        focusManagerLib.capture(filterModal);
        const modalCloseButton = item.querySelector('.filter__close-button');

        modalCloseButton.addEventListener('click', onCloseButtonPressFilter);
        filterModalOverlay.addEventListener('click', onOverlayClickFilter);
        window.addEventListener('keydown', onEscKeyPressFilter);
      }
    };

    const closeModalFilter = function () {
      filterModal.classList.remove('modal--open');
      pageBody.classList.remove('lock');
      const modalCloseButton = document.querySelector('.filter__close-button');
      modalCloseButton.removeEventListener('click', onCloseButtonPressFilter);
      filterModalOverlay.removeEventListener('click', onOverlayClickFilter);
      focusManagerLib.release(filterModal);
      window.removeEventListener('keydown', onEscKeyPressFilter);
    };

    const onModalOpenFilter = function (evt) {
      openModalFilter(filterModal, evt);
    };

    const onCloseButtonPressFilter = () => {
      closeModalFilter();
    };

    const onOverlayClickFilter = function (evt) {
      if (evt.target.matches('.lock')) {
        closeModalFilter();
      }
    };

    const onEscKeyPressFilter = function (evt) {
      if (evt.keyCode === 27) {
        evt.preventDefault();
        closeModalFilter();
      }
    };


    filterOpenButton.addEventListener('click', onModalOpenFilter);


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

})();
