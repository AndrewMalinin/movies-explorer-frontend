import React from 'react'
import Footer from '../common/Footer'
import Header from '../common/Header'
import AboutMe from './AboutMe'
import AboutProject from './AboutProject'

import './main.scss'
import Portfolio from './Portfolio'
import Promo from './Promo'
import Techs from './Techs'

export default function Main() {
  return (
    <main className="main">
      <Header/>
      <Promo/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
      <Footer/>
    </main>
  )
}
