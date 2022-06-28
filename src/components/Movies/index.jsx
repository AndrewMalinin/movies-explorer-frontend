import React, { useEffect, useState, useRef } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import SearchForm from '../common/SearchForm'
import MoviesCardList from '../common/MoviesCardList'
import MoviesMessageBlock from '../common/MoviesCardList/MoviesMessageBlock'
import Preloader from '../common/Preloader/Preloader'
import MoviesModel from '../../utils/models'
import { moviesApi } from '../../utils/MoviesApi'

import './movies.scss'
import { api } from '../../utils/MainApi'
import MessagePopup from '../common/MessagePopup'
import { useMessagePopup } from '../../utils/hooks'

export default function Movies() {
  const moviesModelRef = useRef(new MoviesModel());
  const [movies, setMovies] = useState([]);
  const [isAwaiting, setAwaiting] = useState(false);
  const [message, setMessage] = useState('Чтобы найти интересующие вас фильмы, воспользуйтесь формой поиска выше.');
  const [onlyShortMovies, shortMoviesSwitch] = useState(localStorage.getItem('movies_onlyShortMovies') === 'true');
  const [queryString, setQueryString] = useState(localStorage.getItem('movies_queryString') || '');
  const {popupControlObject, openMessagePopup} = useMessagePopup();

  useEffect(()=>{
    localStorage.setItem('movies_onlyShortMovies', onlyShortMovies)
  }, [onlyShortMovies])

  useEffect(()=>{
    localStorage.setItem('movies_queryString', queryString)
  }, [queryString])


  useEffect(()=>{
    if(queryString !== '') {
      if (moviesModelRef.current.isEmpty()) {
        fetchMovie()
        .then(()=>{
          updateMovies();
        })
      }
      else {
        updateMovies();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[queryString, onlyShortMovies])

  const updateMovies=()=> {
    setMovies(moviesModelRef.current.getFiltredArray(queryString, onlyShortMovies));
  }

  const fetchMovie = async () => {
    setMessage('')
    setAwaiting(true);
    return moviesApi.getMovies()
    .then(async (movies)=>{
      moviesModelRef.current.updateFromMoviesApiResponse(movies, moviesApi.getBaseUrl());
      await fetchSavedMovies();
      return Promise.resolve();
    })
    .catch(()=>{
      setMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      return Promise.resolve();
    })
    .finally(()=>{
      setAwaiting(false);
    })
  }

  const fetchSavedMovies = () => {
    return new Promise((resolve, reject)=>{
      api.getMovies()
      .then((savedMovies)=>{
        moviesModelRef.current.setSavedMoviesIds(savedMovies.map((movie)=>movie.movieId));
        resolve();
      })
      .catch(()=>{
        reject();
      })
    })
  }

  const handleSaveMovie = (movieId) => {
    api.sendSaveMovieRequest(MoviesModel.convertMovieToMainApiStructure(moviesModelRef.current.getMovieById(movieId)))
    .then((savedMovie)=>{
      moviesModelRef.current.setSavedMoviesIds([savedMovie.movieId]);
      updateMovies();
    })
    .catch(()=>{
      openMessagePopup('error','Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
    })
  }

  const handleDeleteMovie = (movieId) => {
    api.sendDeleteMovieRequest(movieId)
    .then((savedMovie)=>{
      moviesModelRef.current.removeSavedMoviesIds([savedMovie.movieId]);
      updateMovies();
    })
    .catch((err)=>{
      if (err.statusCode === 403) {
        openMessagePopup('error','Вы не можете удалять фильмы других пользователей');
      }
      else {
        openMessagePopup('error','Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      }
    })
  }


  const getMoviesBody = () => {
    if (isAwaiting) {
      return (<Preloader/>);
    }
    else if (message) {
      return (<MoviesMessageBlock message={message}/>)
    }
    else if (movies.length === 0){
      return (<MoviesMessageBlock message={'Ничего не найдено, попробуйте изменить свой запрос'}/>)
    }
    else {
      return(<MoviesCardList movies={movies} onSave={handleSaveMovie} onDelete={handleDeleteMovie}/>)
    }
  }

  return (
    <>
      <Header/>
      <main className='movies'>
        <SearchForm
          onShortMoviesSwitch={shortMoviesSwitch}
          onlyShortMovies={onlyShortMovies}
          queryString={queryString}
          onSearch={setQueryString}
        />
        {getMoviesBody()}
      </main>
      <Footer/>
      <MessagePopup popupControlObject={popupControlObject}/>
    </>
  )
}
