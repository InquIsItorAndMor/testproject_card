import React, { useEffect, useRef } from 'react'
import style from './Card.module.css'
import { format } from 'date-fns'
import { TypeArticles } from '../../type'

interface TypeCard {
  articles: TypeArticles,
  filter: (keyof TypeArticles)[]
}

export const Card = (props: TypeCard) => {
  const formatDate = new Date(props.articles.date)
  const refCard = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let nameFilter: keyof TypeArticles
    for (let filter in props.filter) {
      nameFilter = props.filter[filter]
      refCard.current?.setAttribute(`data-filter-${nameFilter}`, "1")
      refCard.current?.setAttribute(`data-${props.filter[filter]}`, `${props.articles[nameFilter]}`)
    }
  })

  return (
    <div className={style.card} ref={refCard}>
      <div className={style.column}>
        <div className={style.partners}>Partners</div>
        <img alt="" src="./envelope.png" />
      </div>
      <div>
        <h3>{props.articles.title}</h3>
        <div className={style.description}>{props.articles.description}</div>
      </div>
      <div className={style.column}>
        <div className={style.date_author}>
          <div>{props.articles.author}</div>
          <div>{`${format(formatDate, 'MMM dd')}th ${format(
            formatDate,
            'yy',
          )}`}</div>
        </div>
      </div>
    </div>
  )
}
