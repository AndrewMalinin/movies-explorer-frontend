import React from 'react'

import './footer.scss'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__sponsors">
        <p className="footer__sponsor">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      </div>
      <div className="footer__divider"></div>
      <article className="footer__bottom">
        <div className="footer__copyright">© 2020</div>
        <ul className="footer__links">
          <li className="footer__link-wrapper">
            <a href="https://practicum.yandex.ru/" className="footer__link">Яндекс.Практикум</a>
          </li>
          <li className="footer__link-wrapper">
            <a href="https://github.com/" className="footer__link">Github</a>
          </li>
          <li className="footer__link-wrapper">
            <a href="https://www.facebook.com/" className="footer__link">Facebook</a>
          </li>
        </ul>
      </article>
    </footer>
  )
}
