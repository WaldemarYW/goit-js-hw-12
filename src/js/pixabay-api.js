const API_KEY = '43225123-d236907a3b16930b7c1176894';

export function fetchImages(query) {
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;
    
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data.hits;
        })
        .catch(error => {
            console.error('Error fetching images:', error);
            return [];
        });
}
