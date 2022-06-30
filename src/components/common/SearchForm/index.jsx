import React, { useState } from 'react'

import { ReactComponent as SearchIcon } from '../../../images/icons/search.svg'
import { useMessagePopup } from '../../../utils/hooks';
import MessagePopup from '../MessagePopup';
import FilterSwitcher from './FilterSwitcher';
// import Preloader from '../Preloader/Preloader';

import './searchForm.scss'

export default function SearchForm(props) {
  const [queryString, setQueryString] = useState(props.queryString);
  const {popupControlObject, openMessagePopup} = useMessagePopup();

    const handleFormSubmit = (e) => {
      e.preventDefault();
      if (queryString.trim() === '') {
        openMessagePopup('error', 'Ошибка! Введите запрос.')
      }
      else {
        props.onSearch(queryString.trim());
      }
    }

    return (
        <section className='search-form'>
            <form action="#" className="search-form__form" onSubmit={handleFormSubmit}>
                <div className="search-form__input-container">
                    <input type="text" className="search-form__input" placeholder='Фильм' required value={queryString} onInput={(e)=>{setQueryString(e.target.value)}}/>
                    <button type="submit" className="search-form__submit-button icon-button icon-button_style_second-accent icon-button_style_rounded" disabled={queryString === ''}>
                        <SearchIcon className='icon-button__icon'/>
                    </button>
                </div>
                <div className="search-form__filters">
                    <FilterSwitcher caption='Короткометражки' onChange={props.onShortMoviesSwitch} value={props.onlyShortMovies}/>
                </div>
            </form>
            <MessagePopup popupControlObject={popupControlObject}/>
        </section>
    )
}
