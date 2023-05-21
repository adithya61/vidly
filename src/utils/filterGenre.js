export function filterGenre(movies, currentGenre){

    if(currentGenre == "All Genres") return movies;

    return movies.filter((movie) => movie.genre.name == currentGenre);

}