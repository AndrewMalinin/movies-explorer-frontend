import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import SearchForm from '../common/SearchForm'
import MoviesCardList from '../common/MoviesCardList'

import './savedMovies.scss'

export default function SavedMovies() {
  return (
    <>
      <Header/>
      <main className='saved-movies'>
        <SearchForm/>
        <MoviesCardList/>
      </main>
      <Footer/>
    </>
  )
}
