import React, { useState } from 'react'

import { ReactComponent as CheckMarkIcon} from '../../../../images/icons/saved.svg'

import './moviesCard.scss'

// interface IMoviesCardProps {
//     required data: {
//         id: number
//         nameRU: string
//         nameEN: string
//         director: string
//         country: string
//         year: string
//         duration: number
//         description: string
//         trailerLink: string
//         image: {
//             url: string
//         }
//     }
// }

export default function MoviesCard(props/*:IMoviesCardProps*/) {
    const [testValue, setTestValue] = useState(Math.random() < 0.5);

    function getDurationString (duration/*:number*/) {
        if (duration === undefined) return '--';
        else if (duration === 0) return '0м';
        const hours = parseInt(duration / 60);
        const minutes = (duration - hours * 60);
        return (hours !== 0 ? `${hours}ч `: '') + (minutes !== 0 ? `${minutes}м`: '');
    }
    
    return (
        <article className="movies-card">
            <img 
                src={'https://api.nomoreparties.co' + props.data.image.url} 
                alt={props.data.nameRU} 
                className="movies-card__cover"
            />
            <div className="movies-card__buttons-container">
                {testValue ? 
                    <button className="button movies-card__save-button" onClick={()=>{setTestValue(false)}} >Сохранить</button>
                    :
                    <button className="icon-button icon-button_style_no-padding movies-card__delete-button" onClick={()=>{setTestValue(true)}}>
                        <CheckMarkIcon className='icon-button__icon'/>
                    </button>
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
