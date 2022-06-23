import React from 'react'
import NavTab from '../NavTab'

import './promo.scss'


export default function Promo() {
  return (
    <section className="promo">
        <div className="promo__background">
            <h1 className="promo__title">
                Учебный проект студента факультета Веб-разработки.
            </h1>
            <div className="promo__nav-container">
                <NavTab/>
        </div>
        </div>
    </section>
  )
}
