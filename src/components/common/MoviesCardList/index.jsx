import React, { useEffect, useState } from 'react'
import MoviesCard from './MoviesCard'
import { useLocation } from "react-router-dom";

import './moviesCardList.scss';
import { useMemo } from 'react';
import { DEFAULT_DESKTOP_MOVIES_COUNT,
         DEFAULT_MOBILE_MOVIES_COUNT,
         DEFAULT_TABLET_MOVIES_COUNT,
         DESKTOP_RES_JUMP_POINT,
         MORE_DESKTOP_MOVIES_LOAD,
         MORE_MOBILE_MOVIES_LOAD,
         MORE_TABLET_MOVIES_LOAD,
         TABLET_RES_JUMP_POINT
        } from '../../../utils/constants';

// interface IMoviesCardListProps {
//   movies: IMovie[]
// }

export default function MoviesCardList(props/*:IMoviesCardListProps*/) {
  const [displayedCards, setDisplayedCards] = useState([]);
  const countOfDisplayedCards = useMemo(()=>displayedCards.length,[displayedCards]);
  const [clientWidth, setClientWidth] = useState(window.innerWidth);
  const location = useLocation();

  useEffect(()=>{
    if (location.pathname === '/movies') {
      window.addEventListener('resize', handleResize);
      return ()=>{
        window.removeEventListener('resize', handleResize);
      }
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{
    if (location.pathname === '/movies') {
      if (clientWidth >= DESKTOP_RES_JUMP_POINT) {
        setDisplayedCards(props.movies.slice(0, DEFAULT_DESKTOP_MOVIES_COUNT))
      }
      else if (clientWidth < DESKTOP_RES_JUMP_POINT && clientWidth >= TABLET_RES_JUMP_POINT) {
        setDisplayedCards(props.movies.slice(0, DEFAULT_TABLET_MOVIES_COUNT))
      }
      else if (clientWidth < TABLET_RES_JUMP_POINT) {
        setDisplayedCards(props.movies.slice(0, DEFAULT_MOBILE_MOVIES_COUNT))
      }
    }
    else {
      setDisplayedCards(props.movies);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.movies.length])

  const handleResize = () => {
    setClientWidth(window.innerWidth);
  }

  const handleLoadMoreCards = () => {
    let newCountOfCards = countOfDisplayedCards;
    if (clientWidth >= DESKTOP_RES_JUMP_POINT) {
      if (countOfDisplayedCards % MORE_DESKTOP_MOVIES_LOAD > 0) {
        newCountOfCards += MORE_DESKTOP_MOVIES_LOAD - countOfDisplayedCards % MORE_DESKTOP_MOVIES_LOAD
      }
      else {
        newCountOfCards += MORE_DESKTOP_MOVIES_LOAD;
      }
    }
    else if (clientWidth < DESKTOP_RES_JUMP_POINT && clientWidth >= TABLET_RES_JUMP_POINT) {
      if (countOfDisplayedCards % MORE_TABLET_MOVIES_LOAD > 0) {
        newCountOfCards += MORE_TABLET_MOVIES_LOAD - 1
      }
      else {
        newCountOfCards += MORE_TABLET_MOVIES_LOAD;
      }
    }
    else {
      newCountOfCards += MORE_MOBILE_MOVIES_LOAD;
    }
    setDisplayedCards(props.movies.slice(0, newCountOfCards))
  }

  return (
    <section className='movies-card-list'>
      <div className="movies-card-list__content">
        {displayedCards.map((movieData)=>{
            return (
              <MoviesCard
                data={movieData}
                deletable={location.pathname === '/saved-movies'}
                onDelete={props.onDelete}
                onSave={props.onSave}
                key={movieData.movieId}
              />)
        })}
      </div>

      <div className="movies-card-list__more">
      {(location.pathname === '/movies' && countOfDisplayedCards < props.movies.length) &&
          <button className="button movies-card-list__more-button" onClick={handleLoadMoreCards}>Ещё</button>
      }
      </div>
    </section>
  )
}
