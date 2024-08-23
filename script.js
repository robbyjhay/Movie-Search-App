/*
    document.getElementById('search-button').addEventListener('click', () => {
        const query = document.getElementById('search-input').value;
        fetch(`http://www.omdbapi.com/?i=${query}&apikey=b24b729`)
            .then(response => response.json())
            .then(data => {
                let movieList = document.getElementById('movie-list');
                movieList.innerHTML = '';
                data.Search.forEach(movie => {
                    const movieItem = `
                        <div class="movie-item">
                            <img src="${movie.Poster}" alt="${movie.Title}">
                            <h3>${movie.Title}</h3>
                            <p>${movie.Year}</p>
                        </div>
                    `;
                    movieList.innerHTML += movieItem;
                });
            });
    });
*/

// // http://www.omdbapi.com/?i=tt3896198&apikey=b24b729
/*
          Normal 
    document.getElementById('search-button').addEventListener('click', () => {
        const query = document.getElementById('search-input').value.trim();
        if (!query) {
        alert('Please enter a search query');
        return;
        }
    
        const apiKey = 'b24b729'; // store API key securely
        const apiUrl = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
    
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (!data.Search || data.Search.length === 0) {
            alert('No search results found');
            return;
            }
    
            const movieList = document.getElementById('movie-list');
            movieList.innerHTML = '';
    
            data.Search.forEach(movie => {
            const movieItem = `
                <div class="movie-item">
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
                <p>${movie}
                </div>
            `;
            movieList.innerHTML += movieItem;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error occurred while searching for movies');
        });
    });
*/

//   Updated code with a dropdown serach items

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const movieList = document.getElementById('movie-list');
const suggestionList = document.getElementById('suggestion-list');

searchInput.addEventListener('input', debounce(fetchSuggestions, 500));

function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

function fetchSuggestions() {
  const query = searchInput.value.trim();
  if (!query) {
    suggestionList.innerHTML = '';
    return;
  }

  const apiKey = 'b24b729'; // store API key securely
  const apiUrl = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (!data.Search || data.Search.length === 0) {
        suggestionList.innerHTML = '';
        return;
      }

      const suggestions = data.Search.slice(0, 5); // show only 5 suggestions
      suggestionList.innerHTML = '';

      suggestions.forEach(movie => {
        const suggestionItem = `
          <li>
            <span>${movie.Title} (${movie.Year})</span>
          </li>
        `;
        suggestionList.innerHTML += suggestionItem;
      });
    })
    .catch(error => {
      console.error('Error:', error);
      suggestionList.innerHTML = '';
    });
}

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (!query) {
    alert('Please enter a search query');
    return;
  }

  const apiKey = 'b24b729'; // store API key securely
  const apiUrl = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (!data.Search || data.Search.length === 0) {
        alert('No search results found');
        return;
      }

      movieList.innerHTML = '';

      data.Search.forEach(movie => {
        const movieItem = `
          <div class="movie-item">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
          </div>
        `;
        movieList.innerHTML += movieItem;
      });
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error occurred while searching for movies, check your connection and try again!');
    });
});

suggestionList.addEventListener('click', event => {
  if (event.target.tagName === 'LI') {
    const movieTitle = event.target.textContent;
    searchInput.value = movieTitle;
    suggestionList.innerHTML = '';
  }
});