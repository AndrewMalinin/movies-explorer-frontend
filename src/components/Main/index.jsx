import React, { useEffect } from 'react'
import { api } from '../../utils/MainApi'
import Footer from '../common/Footer'
import Header from '../common/Header'
import AboutMe from './AboutMe'
import AboutProject from './AboutProject'

import './main.scss'
import Portfolio from './Portfolio'
import Promo from './Promo'
import Techs from './Techs'

// interface IMainProps {
//   isLogged: boolean
// }

export default function Main(props/*:IMainProps*/) {
  useEffect(() => {
    api.getMovies()
  }, []);
  return (
    <>
      <Header isLogged={props.isLogged}/>
      <main className="main">
        <Promo/>
        <AboutProject/>
        <Techs/>
        <AboutMe/>
        <Portfolio/>
      </main>
      <Footer/>
    </>
  )
}
