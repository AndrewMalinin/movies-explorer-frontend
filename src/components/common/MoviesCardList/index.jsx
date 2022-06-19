import React from 'react'
import MoviesCard from './MoviesCard'

import testArray from '../../../tests/restPackets/beatfilm-movies.json'

export default function MoviesCardList() {
  return (
    <section className='movies-card-list'>
        <div className="movies-card-list__content">
            {testArray.slice(0, 9).map((movieData)=>{
                return (<MoviesCard data={movieData}/>)
            })}
        </div>
        <div className="movies-card-list__more">
            <button className="movies-card-list__more-button">Ещё</button>
        </div>
    </section>
  )
}
