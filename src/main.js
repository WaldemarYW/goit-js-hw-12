import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';

const form = document.getElementById('search-form');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const galleryElement = document.getElementById('gallery');
const loadMoreButton = document.getElementById('load-more');
const loader = document.getElementById('loader');
let searchTerm = '';
let page = 1;
let allImages = [];

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  galleryElement.innerHTML = '';
  allImages = [];
  page = 1;

  searchTerm = form.querySelector('input[name="search"]').value.trim();
  if (!searchTerm) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
      position: 'topCenter',
    });
    return;
  }

  try {
    const images = await fetchImages(searchTerm, page);
    if (images.length === 0) {
      iziToast.warning({
        title: 'Warning',
        message:
          'Sorry, there are no images matching your search query. Please try again.',
        position: 'topCenter',
      });
      return;
    }
    allImages.push(...images);
    renderImages(allImages);
    lightbox.refresh();

    const cardHeight =
      galleryElement.firstElementChild.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (images.length >= 15) {
      loadMoreButton.style.display = 'block';
    } else {
      loadMoreButton.style.display = 'none';
    }
  } catch (error) {
    console.error('Error searching images:', error);
    iziToast.error({
      title: 'Error',
      message:
        'An error occurred while searching for images. Please try again later.',
      position: 'topCenter',
    });
  }
});

loadMoreButton.addEventListener('click', async function () {
  loader.style.display = 'block';
  try {
    page++;
    const images = await fetchImages(searchTerm, page);
    allImages.push(...images);
    renderImages(allImages);
    lightbox.refresh();
    loader.style.display = 'none';
    if (images.length < 15) {
      loadMoreButton.style.display = 'none';
    }

    const cardHeight =
      galleryElement.lastElementChild.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.error('Error loading more images:', error);
    iziToast.error({
      title: 'Error',
      message:
        'An error occurred while loading more images. Please try again later.',
      position: 'topCenter',
    });
    loader.style.display = 'none';
  }
});
