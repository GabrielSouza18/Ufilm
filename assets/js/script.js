let movieContainer = document.querySelector('.conteudo-filme');
let bannerMovie = document.querySelector('#banner-filme');
let movieTitle = document.querySelector('#titulo-filme');
let movieDescription = document.querySelector('#descricao');
let movieButton = document.querySelector('#encontrar-filme');
let movieButtonSinopse = document.querySelector('.ver-sinopse');
let closeModalButton = document.querySelector('#closeModalButton');
let modal = document.querySelector('#myModal');
let titleMovieModal = document.querySelector('.title-movie-modal');
let descriptionMovieModal = document.querySelector('#description-movie-modal');
let pMobile = document.querySelector('.p-mobile');

const API_KEY = 'e0d7645efbcad4ba43a36c7259e18592';
const language = 'pt-BR';

const randomNumber = () => Math.floor(Math.random() * 5000);

async function getMovie(id) {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=${language}`)
    return response.data;
}
movieButton.addEventListener('click', async () => {
    const randomIDMovie = randomNumber();
    try {
        const movie = await getMovie(randomIDMovie);
        renderMovie(movie);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            const errorMessage = "Filme não encontrado :(";
            movieTitle.textContent = errorMessage;
            movieDescription.textContent = "";
            movieButtonSinopse.style.display = 'none';
        } else {
            console.error(error);
        }
    }
});

function renderMovie(movie) {
    movieContainer.style.display = 'flex';
    movieButtonSinopse.style.display = 'block';
    pMobile.style.display = 'none'
    bannerMovie.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    // console.log(movie.poster_path)
    movieTitle.textContent = movie.title;
    movieDescription.textContent = movie.overview;
    titleMovieModal.textContent = movie.title;
    // console.log("Descrição do filme:", movie.overview);
    descriptionMovieModal.textContent = movie.overview;
    if (window.innerWidth <= 480) {
        movieButtonSinopse.style.display = 'block';
    } else {
        movieButtonSinopse.style.display = 'none';
    }
}


movieButtonSinopse.addEventListener("click", () => {
    modal.style.display = "block";
});


closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
});
