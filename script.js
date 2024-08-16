const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9105b1fd5f485ea0614d6cf95b45d1d5&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=9105b1fd5f485ea0614d6cf95b45d1d5&query=';

const main = document.getElementById("section");  
const searchForm = document.getElementById("search-form");
const searchBar = document.getElementById("search-bar");

returnMovies(APILINK);

function returnMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(function(data) {
            console.log(data.results);
            
            // Create a row container
            let div_row = document.createElement('div');
            div_row.setAttribute('class', 'row');

            data.results.forEach((element, index) => {
                const div_items = document.createElement('div');
                div_items.setAttribute('class', 'items');

                const image = document.createElement('img');
                image.setAttribute('class', 'movie-img');
                image.src = IMG_PATH + element.poster_path;

                const title = document.createElement('h3');
                title.textContent = element.title;

                const center = document.createElement('center');
                center.appendChild(image);

                div_items.appendChild(center);
                div_items.appendChild(title);
                div_row.appendChild(div_items);

                // Append the row to main when it has 5 items, then create a new row
                if ((index + 1) % 5 === 0) {
                    main.appendChild(div_row);
                    div_row = document.createElement('div');
                    div_row.setAttribute('class', 'row');
                }
            });

            // Append any remaining items if the last row wasn't full
            if (div_row.childElementCount > 0) {
                main.appendChild(div_row);
            }
        })
        .catch(function(error) {
            console.error('Error fetching the movies:', error);
        });
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';

    const searchItem = searchBar.value.trim();

    if (searchItem) {
        returnMovies(SEARCHAPI + encodeURIComponent(searchItem));
        searchBar.value = "";
    }
});
