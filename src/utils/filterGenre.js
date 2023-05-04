export function filterGenre(movies, currentGenre){

    if(currentGenre == "All") return movies;

    return movies.filter((movie) => movie.genre.name == currentGenre);

}