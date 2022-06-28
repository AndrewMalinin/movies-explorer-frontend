import React, { useEffect, useRef, useState } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import SearchForm from '../common/SearchForm'
import MoviesCardList from '../common/MoviesCardList'

import './savedMovies.scss'
import MessagePopup from '../common/MessagePopup'
import MoviesMessageBlock from '../common/MoviesCardList/MoviesMessageBlock'
import Preloader from '../common/Preloader/Preloader'
import { api } from '../../utils/MainApi'
import MoviesModel from '../../utils/models'
import { useMessagePopup } from '../../utils/hooks'

export default function SavedMovies() {
  const moviesModelRef = useRef(new MoviesModel());
  const [movies, setMovies] = useState([]);
  const [isAwaiting, setAwaiting] = useState(false);
  const [message, setMessage] = useState('Чтобы найти интересующие вас фильмы, воспользуйтесь формой поиска выше.');
  const [onlyShortMovies, shortMoviesSwitch] = useState(localStorage.getItem('saved-movies_onlyShortMovies') === 'true');
  const [queryString, setQueryString] = useState(localStorage.getItem('saved-movies_queryString') || '');
  const {popupControlObject, openMessagePopup} = useMessagePopup();

  useEffect(()=>{
    localStorage.setItem('saved-movies_onlyShortMovies', onlyShortMovies)
  }, [onlyShortMovies])

  useEffect(()=>{
    localStorage.setItem('saved-movies_queryString', queryString)
  }, [queryString])


  useEffect(()=>{
    if(queryString !== '') {
      if (moviesModelRef.current.isEmpty()) {
        fetchMovies()
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

  const fetchMovies = async () => {
    setMessage('')
    setAwaiting(true);
    return api.getMovies()
    .then(async (movies)=>{
      moviesModelRef.current.updateFromMainApiResponse(movies);
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

  const handleDeleteMovie = (movieId) => {
    api.sendDeleteMovieRequest(movieId)
    .then(async()=>{
      await fetchMovies();
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
      return(<MoviesCardList movies={movies} onSave={()=>{}} onDelete={handleDeleteMovie}/>)
    }
  }

  return (
    <>
      <Header/>
      <main className='saved-movies'>
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


