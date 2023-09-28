let movieContainer = document.querySelector(".conteudo-filme");
let bannerMovie = document.querySelector('#banner-filme');
let movieTitle = document.querySelector('#titulo-filme');
let movieDescription = document.querySelector('#descricao');
let movieButton = document.querySelector('#encontrar-filme');
let movieButtonSinopse = document.querySelector('.ver-sinopse');
let closeModalButton = document.querySelector('#closeModalButton');
let modal = document.querySelector('#myModal');

const API_KEY = 'e0d7645efbcad4ba43a36c7259e18592';
const language = 'pt-BR';

movieButton.addEventListener('click', async () => {
    const randomIDMovie = randomNumber();
    const movie = await getMovie(randomIDMovie);
    renderMovie(movie);
});

// Abrir o modal quando o botão for clicado
movieButtonSinopse.addEventListener("click", () => {
    modal.style.display = "block";
});

// Fechar o modal quando o botão de fechar for clicado
closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
});

const randomNumber = () => Math.floor(Math.random() * 5000);

async function getMovie(id) {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=${language}`)
    return response.data;
}

function renderMovie(movie) {
    try {
        // Se você encontrou um filme, mostre o conteúdo do filme
        movieContainer.style.display = 'flex';



        // Use JavaScript para controlar a visibilidade do botão ou outros elementos
        movieButtonSinopse.style.display = 'block';

        bannerMovie.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieTitle.textContent = movie.title;
        movieDescription.textContent = movie.overview;
    } catch (error) {
        const errorMessage = "Erro 404 :( Tente novamente";
        movieTitle.textContent = errorMessage;
        bannerMovie.style.display = 'none';
        movieDescription.textContent = "";

        // Use JavaScript para controlar a visibilidade do botão ou outros elementos
        movieButtonSinopse.style.display = 'none';
    }
}
