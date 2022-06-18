import React from 'react'

import './techs.scss'

export default function Techs() {
  return (
    <section className="techs">
      <header className="techs__header">
          <h2 className="techs__title">
              Технологии
          </h2>
      </header>
      <div className="techs__content">
          <article className="techs__description">
            <h3 className="techs__description-title">
              7 технологий
            </h3>
            <p className="techs__description-subtitle">
              На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
            </p>
          </article>   
          <ul className="techs__cards">
            <li className="techs__card">HTML</li>
            <li className="techs__card">CSS</li>
            <li className="techs__card">JS</li>
            <li className="techs__card">React</li>
            <li className="techs__card">Git</li>
            <li className="techs__card">Express.js</li>
            <li className="techs__card">mongoDB</li>
          </ul>  
      </div>
    </section>
  )
}
