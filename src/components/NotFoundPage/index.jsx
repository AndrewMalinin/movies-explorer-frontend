import React from 'react'
import { useNavigate } from 'react-router-dom';

import './notFoundPage.scss'

export default function NotFoundPage() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    }

  return (
    <div className="not-found">
        <article className="not-found__description">
            <h1 className="not-found__status-code">404</h1>
            <p className="not-found__caption">Страница не найдена</p>
        </article>
        <button className="button not-found__back-button" onClick={handleBackClick}>Назад</button>
    </div>
  )
}
