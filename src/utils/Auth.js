import { mainApiURL } from "./constants";
import NetworkError from './NetworkError'

export default class Auth {
  static register(name, email, password) {
    return new Promise((resolve, reject)=>{
      fetch(`${mainApiURL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password, email }),
        mode: 'cors'
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          resolve(response.json());
        }
        else if (response.status === 409) {
          reject(new NetworkError(409, 'Пользователь с таким E-mail уже существует.'));
        }
        else if (response.status === 400) {
          reject(new NetworkError(400, 'Данные имеют неверный формат.'));
        }
        else {
          reject(new NetworkError(500, 'На сервере произошла неизвестная ошибка.'));
        }
      })
      .catch((err) => {
        reject(new NetworkError(1000, 'Отсутствует связь с сервером, попробуйте выполнить запрос позднее'));
      });
    })

  }

  static authorize(email, password) {
    return new Promise((resolve, reject)=>{
      fetch(`${mainApiURL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
        mode: "cors",
      })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        else if (response.status === 400) {
          reject(new NetworkError(400, 'Данные имеют неверный формат.'));
        }
        else if (response.status === 401) {
          reject(new NetworkError(401, 'E-mail или пароль введены неверно.'));
        }
        else {
          reject(new NetworkError(500, 'На сервере произошла неизвестная ошибка.'));
        }
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          resolve(data);
        }
      })
      .catch((err) => {
        reject(new NetworkError(1000, 'Отсутствует связь с сервером, попробуйте выполнить запрос позднее'));
      });
    });
  }

  get
}
