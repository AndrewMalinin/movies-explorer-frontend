import React from 'react'

import './aboutProject.scss'

export default function AboutProject() {
  return (
    <section className="about-project" id="AboutProject">
        <header className="about-project__header">
            <h2 className="about-project__title">
                О Проекте
            </h2>
        </header>
        <div className="about-project__content">
            <article className="about-project__descriptions">
                <article className="description">
                    <h3 className="description__title">
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className="description__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </article>
                <article className="description">
                    <h3 className="description__title">
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className="description__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </article>
            </article>   
            <article className="about-project__track track">
                    <div className="track__part track__part_color_accent track__part_width_one-week">
                        <p className="track__part-title">1 неделя</p>
                        <p className="track__part-caption">Back-end</p>
                    </div>
                    <div className="track__part track__part_width_four-week">
                        <p className="track__part-title">4 недели</p>
                        <p className="track__part-caption">Front-end</p>
                    </div>
            </article>  
        </div>
    </section>
  )
}
