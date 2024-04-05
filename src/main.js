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

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const query = form.querySelector('input[name="search"]').value.trim();
    if (!query) {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search query.',
            position: 'topCenter'
        });
        return;
    }

    fetchImages(query)
        .then(images => {
            if (images.length === 0) {
                iziToast.warning({
                    title: 'Warning',
                    message: 'Sorry, there are no images matching your search query. Please try again.',
                    position: 'topCenter'
                });
                return;
            }
            renderImages(images);
            lightbox.refresh();
        })
        .catch(error => {
            console.error('Error searching images:', error);
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while searching for images. Please try again later.',
                position: 'topCenter'
            });
        });
});