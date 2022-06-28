import React, { useEffect, useState } from 'react'
import MoviesCard from './MoviesCard'
import { useLocation } from "react-router-dom";

import './moviesCardList.scss';
import MoviesMessageBlock from './MoviesMessageBlock';
import { useMemo } from 'react';

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
      if (clientWidth >= 1280) {
        setDisplayedCards(props.movies.slice(0,12))
      }
      else if (clientWidth < 1280 && clientWidth >= 768) {
        setDisplayedCards(props.movies.slice(0, 8))
      }
      else if (clientWidth <= 767) {
        setDisplayedCards(props.movies.slice(0, 5))
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
    if (clientWidth >= 1280) {
      if (countOfDisplayedCards % 3 > 0) {
        newCountOfCards += 3 - countOfDisplayedCards % 3
      }
      else {
        newCountOfCards +=3;
      }
    }
    else if (clientWidth < 1280 && clientWidth >= 768) {
      if (countOfDisplayedCards % 2 > 0) {
        newCountOfCards += 1
      }
      else {
        newCountOfCards +=2;
      }
    }
    else {
      newCountOfCards +=2;
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
