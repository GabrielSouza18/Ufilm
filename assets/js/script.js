let movieContainer = document.querySelector(".conteudo-filme");
let bannerMovie = document.querySelector('#banner-filme');
let movieTitle = document.querySelector('#titulo-filme');
let movieDescription = document.querySelector('#descricao');
let movieButton = document.querySelector('#encontrar-filme');

const API_KEY = 'e0d7645efbcad4ba43a36c7259e18592';
const language = 'pt-BR';

movieButton.addEventListener('click', async () => {
    const randomIDMovie = randomNumber();
    const movie = await getMovie(randomIDMovie);
    renderMovie(movie);
});

const randomNumber = () => Math.floor(Math.random() * 5000);

async function getMovie(id) {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=${language}`)
    return response.data;
}

function renderMovie(movie) {
    try {
        movieContainer.style.display = 'flex';
        movieTitle.style.fontFamily = 'Poppins, sans-serif';
        movieTitle.style.fontSize = '24px';
        movieTitle.style.fontWeight = 'bold';
        movieTitle.style.marginLeft = '25px';
        bannerMovie.style.height = '400px';

   

        bannerMovie.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieTitle.textContent = movie.title;
        movieDescription.textContent = movie.overview;
    } catch (error) {
        const errorMessage = "Erro 404 :( Tente novamente";
        movieTitle.textContent = errorMessage;
        bannerMovie.style.display = 'none';
        movieDescription.textContent = ""; 
    }
}
