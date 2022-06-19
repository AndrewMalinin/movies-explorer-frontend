import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import SearchForm from '../common/SearchForm'
import MoviesCardList from '../common/MoviesCardList'

export default function Movies() {
  return (
    <>
      <Header isLogged={true}/>
      <SearchForm/>
      <MoviesCardList/>
      <Footer/>
    </>
  )
}
