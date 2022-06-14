import React from 'react'

import './navtab.scss'

export default function NavTab() {
  return (
    <nav className="nav-tab">
        <ul className='nav-tab__links'>
            <li className='nav-tab__link-wrapper'><a className='nav-tab__link' href="#AboutProject">О проекте</a></li>
            <li className='nav-tab__link-wrapper'><a className='nav-tab__link' href="#Techs">Технологии</a></li>
            <li className='nav-tab__link-wrapper'><a className='nav-tab__link' href="#AboutMe">Студент</a></li>
        </ul>
    </nav>
  )
}
