import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryRef = document.querySelector(".gallery");

function addGalleryMarkup(images) {
  const markup = images.map((image) => createGalleryMarkup(image)).join("");

  return (galleryRef.innerHTML = markup);
}

function createGalleryMarkup(image) {
  const { original, preview, description } = image;

  return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
}

addGalleryMarkup(galleryItems);

galleryRef.addEventListener("click", onImageClick);

function onImageClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  openModal(event);
}

function openModal(event) {
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modalContent.innerHTML = `<img src="${event.target.dataset.source}">`;

  const modal = basicLightbox.create(modalContent, {
    onClose: () => {
      document.removeEventListener("keydown", onEscKeyPress);
    },
  });

  modal.show();

  // додати 'esc' для закриття модалки
  function onEscKeyPress(event) {
    if (event.code === "Escape") {
      modal.close();
    }
  }

  document.addEventListener("keydown", onEscKeyPress);
}
