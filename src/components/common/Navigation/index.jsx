import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import SideMenu from './SideMenu';

import { ReactComponent as BurgerMenuIcon } from '../../../images/icons/burger-menu.svg';

import './navigation.scss'

export default function Navigation(props) {
    const location = useLocation();
    const [isMinifiedView, setMinifiedView] = useState(false);
    const [sideMenuIsOpen, setSideMenuOpenState] = useState(false);

    const handleWindowResize = () => {
        setMinifiedView(window.innerWidth < 1279);
    }

    useEffect(()=>{
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize)
        return ()=>{
            window.removeEventListener('resize', handleWindowResize)
        }
    },[])

    const navLinks = () => {
        return (
            <div className='navigation__links'>
                <div className="navigation__page-links">
                    {isMinifiedView && <Link to="/" className='navigation__link'>Главная</Link>}
                    <Link
                        to="/movies"
                        className={`navigation__link ${location.pathname === '/movies' ? 'navigation__link_active':''}`}
                    >
                        Фильмы
                    </Link>
                    <Link
                        to="/saved-movies"
                        className={`navigation__link ${location.pathname === '/saved-movies' ? 'navigation__link_active':''}`}
                    >
                        Сохранённые фильмы
                    </Link>
                </div>
                <Link to="/profile" className="navigation__link navigation__link_style_rounded">Аккаунт</Link>
            </div>
        )
    }

    return (
        <nav className='navigation'>
            {isMinifiedView ?
            <>
            <button className="icon-button navigation__toggle-side-menu-button" onClick={()=>{setSideMenuOpenState(true)}}>
                <BurgerMenuIcon className='icon-button__icon'/>
            </button>
                <SideMenu isOpen={sideMenuIsOpen} onClose={()=>{setSideMenuOpenState(false)}}>
                    {navLinks()}
                </SideMenu>
            </>

            :
            navLinks()
            }
        </nav>
    )
}
