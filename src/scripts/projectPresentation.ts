const presentations =
  document.querySelectorAll(
    '[data-presentation]'
  );

presentations.forEach(
  (presentation) => {
    const viewport =
      presentation.querySelector(
        '[data-presentation-viewport]'
      );

    const track =
      presentation.querySelector(
        '[data-presentation-track]'
      );

    const slides =
      Array.from(
        presentation.querySelectorAll(
          '[data-presentation-slide]'
        )
      );

    const counter =
      presentation.querySelector(
        '[data-presentation-counter]'
      );

    const previousButton =
      presentation.querySelector(
        '[data-presentation-prev]'
      );

    const nextButton =
      presentation.querySelector(
        '[data-presentation-next]'
      );

    const modal =
      presentation.querySelector(
        '[data-presentation-modal]'
      );

    const modalImage =
      presentation.querySelector(
        '[data-presentation-modal-image]'
      );

    const modalCounter =
      presentation.querySelector(
        '[data-presentation-modal-counter]'
      );

    const modalClose =
      presentation.querySelector(
        '[data-presentation-modal-close]'
      );

    const modalPreviousButton =
      presentation.querySelector(
        '[data-presentation-modal-prev]'
      );

    const modalNextButton =
      presentation.querySelector(
        '[data-presentation-modal-next]'
      );

    if (
      !(viewport instanceof HTMLElement) ||
      !(track instanceof HTMLElement) ||
      !(counter instanceof HTMLElement) ||
      !(previousButton instanceof HTMLButtonElement) ||
      !(nextButton instanceof HTMLButtonElement) ||
      !(modal instanceof HTMLElement) ||
      !(modalImage instanceof HTMLImageElement) ||
      !(modalCounter instanceof HTMLElement) ||
      !(modalClose instanceof HTMLButtonElement) ||
      !(modalPreviousButton instanceof HTMLButtonElement) ||
      !(modalNextButton instanceof HTMLButtonElement) ||
      slides.length === 0
    ) {
      return;
    }

    let currentIndex = 0;
    let openedSlideIndex = 0;


    /* --------------------------------
       CAROUSEL
    -------------------------------- */

    const getSlideMetrics = () => {
      const firstSlide =
        slides[0];

      if (!(firstSlide instanceof HTMLElement)) {
        return {
          slideWidth: 0,
          gap: 0,
          visibleCount: 1,
        };
      }

      const slideWidth =
        firstSlide
          .getBoundingClientRect()
          .width;

      const trackStyles =
        window.getComputedStyle(track);

      const gap =
        parseFloat(
          trackStyles.columnGap
        ) || 0;

      const visibleCount =
        Math.max(
          1,
          Math.round(
            (
              viewport.clientWidth +
              gap
            ) /
            (
              slideWidth +
              gap
            )
          )
        );

      return {
        slideWidth,
        gap,
        visibleCount,
      };
    };


    const updatePresentation = (
      smooth = true
    ) => {
      const {
        slideWidth,
        gap,
        visibleCount,
      } = getSlideMetrics();

      const maxIndex =
        Math.max(
          0,
          slides.length -
          visibleCount
        );

      currentIndex =
        Math.min(
          currentIndex,
          maxIndex
        );

      const offset =
        currentIndex *
        (slideWidth + gap);

      viewport.scrollTo({
        left: offset,
        behavior: smooth
          ? 'smooth'
          : 'auto',
      });

      const firstVisible =
        currentIndex + 1;

      const lastVisible =
        Math.min(
          currentIndex +
          visibleCount,
          slides.length
        );

      const total =
        String(
          slides.length
        ).padStart(
          2,
          '0'
        );

      if (
        firstVisible ===
        lastVisible
      ) {
        counter.textContent =
          `${String(
            firstVisible
          ).padStart(
            2,
            '0'
          )} / ${total}`;
      } else {
        counter.textContent =
          `${String(
            firstVisible
          ).padStart(
            2,
            '0'
          )}–` +
          `${String(
            lastVisible
          ).padStart(
            2,
            '0'
          )} / ${total}`;
      }

      previousButton.disabled =
        currentIndex === 0;

      nextButton.disabled =
        currentIndex >=
        maxIndex;
    };


    /* --------------------------------
       FULLSCREEN VIEWER
    -------------------------------- */

    const updateModal = () => {
      const slide =
        slides[openedSlideIndex];

      if (!(slide instanceof HTMLElement)) {
        return;
      }

      const slideImage =
        slide.querySelector('img');

      if (
        !(slideImage instanceof HTMLImageElement)
      ) {
        return;
      }

      modalImage.src =
        slideImage.src;

      modalImage.alt =
        slideImage.alt;

      modalCounter.textContent =
        `${String(
          openedSlideIndex + 1
        ).padStart(
          2,
          '0'
        )} / ` +
        `${String(
          slides.length
        ).padStart(
          2,
          '0'
        )}`;

      modalPreviousButton.disabled =
        openedSlideIndex === 0;

      modalNextButton.disabled =
        openedSlideIndex ===
        slides.length - 1;
    };


    const openModal = (
      slideIndex: number
    ) => {
      openedSlideIndex =
        slideIndex;

      updateModal();

      modal.hidden =
        false;

      document.body.classList.add(
        'presentation-modal-open'
      );

      modalClose.focus();
    };


    const closeModal = () => {
      modal.hidden =
        true;

      document.body.classList.remove(
        'presentation-modal-open'
      );
    };


    const showPreviousModalSlide =
      () => {
        if (
          openedSlideIndex <= 0
        ) {
          return;
        }

        openedSlideIndex -= 1;

        updateModal();
      };


    const showNextModalSlide =
      () => {
        if (
          openedSlideIndex >=
          slides.length - 1
        ) {
          return;
        }

        openedSlideIndex += 1;

        updateModal();
      };


    /* --------------------------------
       CAROUSEL EVENTS
    -------------------------------- */

    previousButton.addEventListener(
      'click',
      () => {
        if (
          currentIndex <= 0
        ) {
          return;
        }

        currentIndex -= 1;

        updatePresentation();
      }
    );


    nextButton.addEventListener(
      'click',
      () => {
        const {
          visibleCount,
        } = getSlideMetrics();

        const maxIndex =
          Math.max(
            0,
            slides.length -
            visibleCount
          );

        if (
          currentIndex >=
          maxIndex
        ) {
          return;
        }

        currentIndex += 1;

        updatePresentation();
      }
    );


    /* --------------------------------
       SLIDE CLICK
    -------------------------------- */

    slides.forEach(
      (
        slide,
        index
      ) => {
        if (
          !(
            slide instanceof
            HTMLButtonElement
          )
        ) {
          return;
        }

        slide.addEventListener(
          'click',
          () => {
            openModal(index);
          }
        );
      }
    );


    /* --------------------------------
       MODAL EVENTS
    -------------------------------- */

    modalPreviousButton.addEventListener(
      'click',
      (event) => {
        event.stopPropagation();

        showPreviousModalSlide();
      }
    );


    modalNextButton.addEventListener(
      'click',
      (event) => {
        event.stopPropagation();

        showNextModalSlide();
      }
    );


    modalClose.addEventListener(
      'click',
      (event) => {
        event.stopPropagation();

        closeModal();
      }
    );


    modal.addEventListener(
      'click',
      (event) => {
        if (
          event.target === modal
        ) {
          closeModal();
        }
      }
    );


    /* --------------------------------
       RESIZE
    -------------------------------- */

    window.addEventListener(
      'resize',
      () => {
        updatePresentation(
          false
        );
      }
    );


    updatePresentation(
      false
    );
  }
);