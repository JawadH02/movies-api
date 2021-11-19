$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        $('.display__search--header').text('Search results for ' + '"' + searchText + '"');
        e.preventDefault();
    })
});

$(document).ready(() => {
    $('.btn--submit').on('click', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        $('.display__search--header').text('Search results for ' + '"' + searchText + '"');
        e.preventDefault();
    })
});

function getMovies(searchText) {
    axios.get('https://www.omdbapi.com/?apikey=957dcbb0&s=' + searchText + '/')
        .then((res) => {
            console.log(res);
            let movies = res.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                console.log(movie.Poster);
                if (movie.Poster !== "N/A") {
                    output += `
            <div class="movie">
                <figure class="movie__img--wrapper">
                    <img src="${movie.Poster}" alt="" class="movie__img">
                </figure>
                <h5 class="movie__title">${movie.Title}</h5>
                <a href="#" class="btn" onclick="movieSelected('${movie.imdbID}')">Movie Details</a>
            </div>
            `;
                }
            })
            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        })
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('https://www.omdbapi.com/?apikey=957dcbb0&i=' + movieId +'/')
        .then((res) => {
            console.log(res);
            let movie = res.data;

            let output = `
                <div class="showcase-movie__about-section">
                    <figure class="showcase-movie__img--wrapper">
                        <img src="${movie.Poster} class="movie__img-thumbnail" alt="">
                    </figure>
                    <div class="showcase-movie__about">
                        <h2 class="showcase-movie__about--title">${movie.Title}</h2>
                        <ul class="showcase-movie__lists">
                            <li class="showcase-movie__list">
                                <Strong>Genre:</Strong> ${movie.Genre}
                            </li>
                            <li class="showcase-movie__list">
                                <Strong>Released:</Strong> ${movie.Released}
                            </li>
                            <li class="showcase-movie__list">
                                <Strong>Rated:</Strong> ${movie.Rated}
                            </li>
                            <li class="showcase-movie__list">
                                <Strong>IMDB Rating:</Strong> ${movie.imdbRating}
                            </li>
                            <li class="showcase-movie__list">
                                <Strong>Director:</Strong> ${movie.Director}
                            </li>
                            <li class="showcase-movie__list">
                                <Strong>Writer:</Strong> ${movie.Writer}
                            </li>
                            <li class="showcase-movie__list">
                                <Strong>Actors:</Strong> ${movie.Actors}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="showcase-movie__description">
                <div class="showcase-movie__description--para">
                    <h3 class="showcase-movie__description--title">Plot</h3>
                    ${movie.Plot}
                    <hr />
                    <div class="showcase-movie__links--list">
                        <a class="showcase-movie__link click" href="http://imdb.com/title/${movie.imdbID}" target="_blank">View IMDB</a>
                        <a class="showcase-movie__link click" href="index.html">Go Back to Search</a>
                    </div>
                </div>
            </div>

            `;

            $('#showcase-movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        })
}






function openMenu() {
    document.body.classList += " menu--open";
}

function closeMenu() {
    document.body.classList.remove("menu--open");
}