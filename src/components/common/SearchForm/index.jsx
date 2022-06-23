import React from 'react'

import { ReactComponent as SearchIcon } from '../../../images/icons/search.svg'
import FilterSwitcher from './FilterSwitcher';
// import Preloader from '../Preloader/Preloader';

import './searchForm.scss'

export default function SearchForm() {

    const handleFormSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <section className='search-form'>
            <form action="#" className="search-form__form" onSubmit={handleFormSubmit}>
                <div className="search-form__input-container">
                    <input type="text" className="search-form__input" placeholder='Фильм' required tabIndex="0"/>
                    <button type="submit" className="search-form__submit-button icon-button icon-button_style_second-accent icon-button_style_rounded">
                        <SearchIcon className='icon-button__icon'/>
                    </button>
                </div>
                <div className="search-form__filters">
                    <FilterSwitcher caption='Короткометражки' onChange={()=>{}}/>
                </div>
            </form>
        </section>
    )
}
