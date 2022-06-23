import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import SearchForm from '../common/SearchForm'
import MoviesCardList from '../common/MoviesCardList'

import './movies.scss'

export default function Movies() {
  return (
    <>
      <Header/>
      <main className='movies'>
        <SearchForm/>
        <MoviesCardList/>
      </main>
      <Footer/>
    </>
  )
}
