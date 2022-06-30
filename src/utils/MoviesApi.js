import { moviesApiURL } from "./constants";
import NetworkError from "./NetworkError";

export class MoviesApi {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  _sendRequest(relativePath, method = 'GET', bodyObject = {}) {
    const options = {
      'method': method,
      headers: {
        'Content-Type': 'application/json'
      },
      mode: "cors",
    };
    const url = this._baseUrl + relativePath;

    if (Object.keys(bodyObject).length !== 0) {
      options.body = JSON.stringify(bodyObject);
    }

    return fetch(url, options)
      .then((res) => {
        if(res.ok) {
          return Promise.resolve(res.json());
        }
        else {
          return Promise.reject(new NetworkError(res.status, 'На сервере произошла неизвестная ошибка.'));
        }
      })
  }

  getMovies() {
    return new Promise((resolve, reject)=>{
      this._sendRequest('/beatfilm-movies')
      .then((movies)=>{
        resolve(movies);
      })
      .catch((err)=>{
        reject(err);
      })
    })
  }

  getBaseUrl() {
    return this._baseUrl;
  }
}

export const moviesApi = new MoviesApi({
  baseUrl : moviesApiURL
});
