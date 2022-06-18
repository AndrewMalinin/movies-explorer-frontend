import React from 'react'

import './header.scss';

import { ReactComponent as Logo} from '../../../images/icons/logo.svg';

export default function Header() {
  return (
    <header className="header">
      <Logo className="logo logo_place_header"/>
      <div className="header__buttons-container">
        <button className="button header__button">Регистрация</button>
        <button className="button button_style_accent header__button">Войти</button>
      </div>
    </header>
  )
}
