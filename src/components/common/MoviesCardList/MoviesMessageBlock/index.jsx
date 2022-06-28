import React from 'react'

import './moviesMessageBlock.scss'

export default function MoviesMessageBlock(props) {
  return (
    <article className='movies-message-block'>
      <p className="movies-message-block__description">
        {props.message}
      </p>
    </article>
  )
}
