import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";

import './header.scss';

import { ReactComponent as Logo} from '../../../images/icons/logo.svg';
import Navigation from '../Navigation';

// interface IHeaderProps {
//   isLogged: boolean
// }

export default function Header(props/*:IHeaderProps*/) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <header className="header">
      <a href="/" className="header__main-link">
        <Logo className="logo logo_place_header"/>
      </a>
      {(location.pathname === '/' && !props.isLogged) ?
        <div className="header__buttons-container">
          <button className="button header__button" onClick={()=>{navigate('/signup')}}>Регистрация</button>
          <button className="button button_style_accent header__button" onClick={()=>{navigate('/signin')}}>Войти</button>
        </div>
      :
        <Navigation/>
      }
    </header>
  )
}
