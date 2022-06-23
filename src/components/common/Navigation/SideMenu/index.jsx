import React from 'react'

import { ReactComponent as CrossIcon } from '../../../../images/icons/cross.svg'

import './sideMenu.scss'

// interface SideMenuProps {
//     isOpen: boolean
//     onClose():void
//     children: ReactChild
// }

export default function SideMenu(props/*:SideMenuProps*/) {
  return (
    <section className={`side-menu-container side-menu-container_${props.isOpen ? 'visible':'hidden'}`}>
      <div className={`side-menu side-menu_${props.isOpen ? 'open':'close'}`}>
        <button className="icon-button side-menu__close-button" onClick={props.onClose}>
          <CrossIcon className='icon-button__icon'/>
        </button>
        <div className="side-menu__content">
        {props.children}
        </div>

      </div>
    </section> 
  )
}
