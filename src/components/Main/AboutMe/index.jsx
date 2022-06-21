import React from 'react'

import './aboutMe.scss'

import studentPhoto from '../../../images/student.jpg'

export default function AboutMe() {
  return (
    <section className="about-me" id="AboutMe">
        <header className="about-me__header">
            <h2 className="about-me__title">
                Студент
            </h2>
        </header>
        <div className="about-me__content">
          <div className="about-me__description-container">
            <article className="about-me__description">
                <h3 className="about-me__name">Михаил</h3>
                <p className="about-me__life-status">Фронтенд-разработчик, 30 лет</p>
                <p className="about-me__biography">
                  Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. 
                  Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
                  С 2015 года работал в компании «СКБ Контур». 
                  После того, как прошёл курс по веб-разработке, 
                  начал заниматься фриланс-заказами и ушёл с постоянной работы.
                </p>
              </article>  
              <ul className="about-me__links">
                <li className="about-me__link-wrapper">
                  <a href="https://www.facebook.com/" className="about-me__link">Facebook</a>
                </li>
                <li className="about-me__link-wrapper">
                  <a href="https://github.com/" className="about-me__link">Github</a>
                </li>
              </ul>
          </div>
          <img src={studentPhoto} alt="Фотография студента" className="about-me__photo" />
        </div>
    </section>
  )
}
