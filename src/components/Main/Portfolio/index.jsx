import React from 'react'

import './portfolio.scss';

export default function Portfolio() {
  return (
    <section className="portfolio">
        <header className="portfolio__header">
            <h2 className="portfolio__title">
                Портфолио
            </h2>
        </header>
        <div className="portfolio__content">
            <ul className="portfolio__links">
              <li className="portfolio__link-wrapper">
                <a href="https://github.com/AndrewMalinin/how-to-learn" target='_blank' rel="noreferrer" className="portfolio__link">
                  <p className="portfolio__link-caption">Статичный сайт</p>
                  <p className="portfolio__link-symbol">↗</p>
                </a>
              </li>
              <li className="portfolio__link-wrapper">
                <a href="https://andrewmalinin.github.io/russian-travel/index.html" target='_blank' rel="noreferrer" className="portfolio__link">
                  <p className="portfolio__link-caption">Адаптивный сайт</p>
                  <p className="portfolio__link-symbol">↗</p>
                </a>
              </li>
              <li className="portfolio__link-wrapper">
                <a href="https://github.com/AndrewMalinin/react-mesto-api-full" target='_blank' rel="noreferrer" className="portfolio__link">
                  <p className="portfolio__link-caption">Одностраничное приложение</p>
                  <p className="portfolio__link-symbol">↗</p>
                </a>
              </li>
            </ul>
        </div>
    </section>
  )
}
