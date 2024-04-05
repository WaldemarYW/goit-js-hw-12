export function renderImages(images) {
  const galleryElement = document.getElementById('gallery');
  galleryElement.innerHTML = '';

  images.forEach(image => {
    const card = `
        <div class="card">
          <a href="${image.largeImageURL}" data-lightbox="gallery-item">
            <img src="${image.webformatURL}" alt="${image.tags}" data-src="${image.largeImageURL}">
          </a>
          <div class="card-info">
            <span>Likes: ${image.likes}</span>
            <span>Views: ${image.views}</span>
            <span>Comments: ${image.comments}</span>
            <span>Downloads: ${image.downloads}</span>
          </div>
        </div>
      `;
    galleryElement.innerHTML += card;
  });
}
