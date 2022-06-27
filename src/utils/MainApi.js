import { mainApiURL } from "./constants";
import NetworkError from "./NetworkError";

export class Api {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  _sendRequest(relativePath, method = 'GET', bodyObject = {}) {
    const token = localStorage.getItem("token");
    if (!token) return Promise.reject(401);
    const options = {
      'method': method,
      headers: {
        authorization: 'Bearer ' + token,
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
          if (res.status === 400) {
            return Promise.reject(new NetworkError(400, 'Данные имеют неверный формат.'));
          }
          else if (res.status === 401) {
            return Promise.reject(new NetworkError(401, 'Ошибка авторизации.'));
          }
          else if (res.status === 403) {
            return Promise.reject(new NetworkError(403, 'У вас нет доступа к данному ресурсу.'));
          }
          else if (res.status === 404) {
            return Promise.reject(new NetworkError(404, 'Данный путь не существует, или был перемещён.'));
          }
          else {
            return Promise.reject(new NetworkError(res.status, 'На сервере произошла неизвестная ошибка.'));
          }
        }
      })
      .catch((e)=>{
        return Promise.reject(new NetworkError(1000, 'Отсутствует связь с сервером, попробуйте выполнить запрос позднее'));
      })
  }

  getUserInfo() {
    return this._sendRequest('/users/me');
  }

  getMovies() {
    return this._sendRequest('/movies');
  }

  sendEditProfileRequest({name, email}) {
    return this._sendRequest('/users/me', 'PATCH', {
        'name': name,
        'email': email
      });
  }

  sendSaveMovieRequest(movieData/*: IMovieDTO*/) {
    return this._sendRequest('/movies', 'POST', movieData);
  }

  sendDeleteMovieRequest(movieId) {
    return this._sendRequest(`/movies/${movieId}`, 'DELETE');
  }
}

export const api = new Api({
  baseUrl : mainApiURL
});
