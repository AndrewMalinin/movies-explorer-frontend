import React from 'react'
import MoviesCard from './MoviesCard'
import { useLocation } from "react-router-dom";

import './moviesCardList.scss';

import testArray from '../../../tests/restPackets/beatfilm-movies.json'

export default function MoviesCardList() {
  const location = useLocation();
  return (
    <section className='movies-card-list'>
        <div className="movies-card-list__content">
            {testArray.slice(0, 9).map((movieData)=>{
                return (
                  <MoviesCard 
                    data={movieData} 
                    deletable={location.pathname === '/saved-movies'}
                    onDelete={()=>{}}
                  />)
            })}
        </div>

        <div className="movies-card-list__more">
        {location.pathname === '/movies' &&
            <button className="button movies-card-list__more-button">Ещё</button>
          }
        </div>

    </section>
  )
}
