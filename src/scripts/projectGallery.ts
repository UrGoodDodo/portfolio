const galleries =
  document.querySelectorAll<HTMLElement>(
    '[data-gallery]'
  );

galleries.forEach((gallery) => {
  const pages =
    Array.from(
      gallery.querySelectorAll<HTMLElement>(
        '[data-gallery-page]'
      )
    );

  const prevButton =
    gallery.querySelector<HTMLButtonElement>(
      '[data-gallery-prev]'
    );

  const nextButton =
    gallery.querySelector<HTMLButtonElement>(
      '[data-gallery-next]'
    );

  const counter =
    gallery.querySelector<HTMLElement>(
      '[data-gallery-counter]'
    );

  const imageButtons =
    Array.from(
      gallery.querySelectorAll<HTMLButtonElement>(
        '[data-gallery-image]'
      )
    );

  const modal =
    gallery.querySelector<HTMLElement>(
      '[data-gallery-modal]'
    );

  const modalImage =
    gallery.querySelector<HTMLImageElement>(
      '[data-gallery-modal-image]'
    );

  const modalCounter =
    gallery.querySelector<HTMLElement>(
      '[data-gallery-modal-counter]'
    );

  const modalPrev =
    gallery.querySelector<HTMLButtonElement>(
      '[data-gallery-modal-prev]'
    );

  const modalNext =
    gallery.querySelector<HTMLButtonElement>(
      '[data-gallery-modal-next]'
    );

  const modalClose =
    gallery.querySelector<HTMLButtonElement>(
      '[data-gallery-modal-close]'
    );

  if (
    pages.length === 0 ||
    !prevButton ||
    !nextButton
  ) {
    return;
  }

  let currentPageIndex = 0;
  let currentImageIndex = 0;

  const formatNumber = (
    value: number
  ) =>
    String(value).padStart(
      2,
      '0'
    );

  /* ---------------- PAGE NAVIGATION ---------------- */

  const updateGallery = () => {
    pages.forEach(
      (page, index) => {
        page.style.display =
          index === currentPageIndex
            ? 'grid'
            : 'none';
      }
    );

    prevButton.disabled =
      currentPageIndex === 0;

    nextButton.disabled =
      currentPageIndex ===
      pages.length - 1;

    if (counter) {
      counter.textContent =
        `${formatNumber(
          currentPageIndex + 1
        )} / ${formatNumber(
          pages.length
        )}`;
    }
  };

  const goToPreviousPage = () => {
    if (currentPageIndex <= 0) {
      return;
    }

    currentPageIndex -= 1;

    updateGallery();
  };

  const goToNextPage = () => {
    if (
      currentPageIndex >=
      pages.length - 1
    ) {
      return;
    }

    currentPageIndex += 1;

    updateGallery();
  };

  prevButton.addEventListener(
    'click',
    goToPreviousPage
  );

  nextButton.addEventListener(
    'click',
    goToNextPage
  );

  /* ---------------- MODAL ---------------- */

  const updateModal = () => {
    if (
      !modalImage ||
      !modalCounter ||
      !modalPrev ||
      !modalNext
    ) {
      return;
    }

    const currentButton =
      imageButtons[
        currentImageIndex
      ];

    if (!currentButton) {
      return;
    }

    const src =
      currentButton.dataset.imageSrc;

    const previewImage =
      currentButton.querySelector<HTMLImageElement>(
        'img'
      );

    if (!src) {
      return;
    }

    modalImage.src = src;

    modalImage.alt =
      previewImage?.alt ?? '';

    modalCounter.textContent =
      `${formatNumber(
        currentImageIndex + 1
      )} / ${formatNumber(
        imageButtons.length
      )}`;

    modalPrev.disabled =
      currentImageIndex === 0;

    modalNext.disabled =
      currentImageIndex ===
      imageButtons.length - 1;
  };

  const openModal = (
    imageIndex: number
  ) => {
    if (
      !modal ||
      !modalImage
    ) {
      return;
    }

    currentImageIndex =
      imageIndex;

    updateModal();

    modal.hidden =
      false;

    document.body.classList.add(
      'gallery-modal-open'
    );
  };

  const closeModal = () => {
    if (!modal) {
      return;
    }

    modal.hidden =
      true;

    document.body.classList.remove(
      'gallery-modal-open'
    );

    if (modalImage) {
      modalImage.src = '';
      modalImage.alt = '';
    }
  };

  const goToPreviousImage = () => {
    if (
      currentImageIndex <= 0
    ) {
      return;
    }

    currentImageIndex -= 1;

    updateModal();
  };

  const goToNextImage = () => {
    if (
      currentImageIndex >=
      imageButtons.length - 1
    ) {
      return;
    }

    currentImageIndex += 1;

    updateModal();
  };

  imageButtons.forEach(
    (button, index) => {
      button.addEventListener(
        'click',
        () => {
          openModal(index);
        }
      );
    }
  );

  modalPrev?.addEventListener(
    'click',
    goToPreviousImage
  );

  modalNext?.addEventListener(
    'click',
    goToNextImage
  );

  modalClose?.addEventListener(
    'click',
    closeModal
  );

  modal?.addEventListener(
    'click',
    (event) => {
      if (
        event.target === modal
      ) {
        closeModal();
      }
    }
  );

  /* ---------------- INITIAL STATE ---------------- */

  updateGallery();
});