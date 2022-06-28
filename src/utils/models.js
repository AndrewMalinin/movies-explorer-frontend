import { isValidHttpUrl } from "./validators";

export default class MoviesModel {
  constructor() {
    this._moviesArr = [];
  }

  updateFromMoviesApiResponse(moviesApiResponse, baseMoviesApiUrl) {
    this._moviesArr = [];
    if (moviesApiResponse.length === 0) return;
    moviesApiResponse.forEach((movie)=>{
      this._moviesArr.push(this._parseMoviesApiMovie(movie, baseMoviesApiUrl));
    })
  }

  updateFromMainApiResponse(moviesApiResponse) {
    this._moviesArr = [];
    if (moviesApiResponse.length === 0) return;
    moviesApiResponse.forEach((movie)=>{
      this._moviesArr.push(this._parseMainApiMovie(movie));
    })
  }

  getMoviesArray() {
    return this._moviesArr;
  }

  getMovieById (movieId) {
    return this._moviesArr.find((movie)=>movie.movieId === movieId);
  }

  isEmpty() {
    return this._moviesArr.length === 0;
  }

  getFiltredArray(filterStr, onlyShortMovies = false) {
    return this._moviesArr.filter((movie)=>{
      if (-1 !== movie.nameRU.toLowerCase().indexOf(filterStr.toLowerCase())) {
        if (onlyShortMovies) {
          return movie.duration <= 40;
        }
        return true;
      }
      return false;
    });
  }

  setSavedMoviesIds(ids) {
    this._moviesArr.forEach((movie)=>{
      if (-1 !== ids.indexOf(movie.movieId)) {
        movie.isSaved = true;
      }
    })
  }

  removeSavedMoviesIds(ids) {
    this._moviesArr.forEach((movie)=>{
      if (-1 !== ids.indexOf(movie.movieId)) {
        movie.isSaved = false;
      }
    })
  }

  getIds() {
    return this._moviesArr.map((movie)=>{return movie.movieId})
  }

  _parseMainApiMovie(movie) {
    return {...movie, isSaved: true};
  }

  _parseMoviesApiMovie(movie, baseMoviesApiUrl) {
    let imageUrl = null;
    let thumbnailUrl = null;

    if (movie.image) {
      if(movie.image.url) {
        imageUrl = baseMoviesApiUrl + movie.image.url;
      }
      if (movie.image.formats && movie.image.formats.thumbnail) {
        thumbnailUrl = baseMoviesApiUrl + movie.image.formats.thumbnail.url;
      }
    }

    return {
      movieId: movie.id,
      isSaved: false,
      country: movie.country || "Неизвестно",
      director: movie.director || "Неизвестно",
      duration: movie.duration || undefined,
      year: movie.year || "Неизвестно",
      description: movie.description || "Нет описания",
      thumbnail: isValidHttpUrl(thumbnailUrl) ? thumbnailUrl : "https://krd.tehnocentr.ru/item-litebox-img.php?big=true&speed_img=yes&img=0&art=180-0403",
      image: isValidHttpUrl(imageUrl) ? imageUrl : "https://krd.tehnocentr.ru/item-litebox-img.php?big=true&speed_img=yes&img=0&art=180-0403",
      trailerLink: isValidHttpUrl(movie.trailerLink) ? movie.trailerLink : 'https://ya.ru',
      nameRU: movie.nameRU || "Неизвестно",
      nameEN: movie.nameEN || "Unknown",
    }
  }

  static convertMovieToMainApiStructure(movie) {
    delete movie.isSaved;
    return movie;
  }
}
