import React, { useState } from 'react'

import { ReactComponent as CheckMarkIcon} from '../../../../images/icons/saved.svg'
import { ReactComponent as CrossIcon} from '../../../../images/icons/delete-card.svg'

import './moviesCard.scss'

// interface IMoviesCardProps {
//     deletable: boolean
//     isSaved: boolean
//     required data: {
//                movieId: number,
//                country: string,
//                director: string,
//                duration: number | undefined,
//                year: string,
//                description: string,
//                thumbnail: string,
//                image: string,
//                trailerLink: string | null,
//                nameRU: string,
//                nameEN: string,
//     }
// }

export default function MoviesCard(props/*:IMoviesCardProps*/) {

    function getDurationString (duration/*:number*/) {
        if (duration === undefined) return '--';
        else if (duration === 0) return '0м';
        const hours = parseInt(duration / 60);
        const minutes = (duration - hours * 60);
        return (hours !== 0 ? `${hours}ч `: '') + (minutes !== 0 ? `${minutes}м`: '');
    }
    return (
        <article className="movies-card">
            <div className="movies-card__cover-aspect-ratio-box">
                <img
                    src={props.data.image}
                    alt={props.data.nameRU}
                    className="movies-card__cover"
                />
            </div>

            <div className="movies-card__buttons-container">
                {props.deletable ?
                  <button className="icon-button icon-button_style_no-padding movies-card__delete-button movies-card__button movies-card__button_hoverable" onClick={()=>{props.onDelete(props.data.movieId)}}>
                      <CrossIcon className='icon-button__icon'/>
                  </button>
                :
                <>
                {props.data.isSaved ?
                  <button className="icon-button icon-button_style_no-padding movies-card__button movies-card__delete-button" onClick={()=>{props.onDelete(props.data.movieId)}}>
                    <CheckMarkIcon className='icon-button__icon'/>
                  </button>
                  :
                  <button className="button movies-card__save-button movies-card__button movies-card__button_hoverable" onClick={()=>{props.onSave(props.data.movieId)}}>Сохранить</button>
                }
                </>
                }

            </div>
            <div className="movies-card__info">
                <h2 className="movies-card__title">{props.data.nameRU}</h2>
                <div className="movies-card__duration">
                    {getDurationString(props.data.duration)}
                </div>
            </div>
        </article>
    )
}
