import React from 'react'
import style from './Card.module.css'
import { format } from 'date-fns'

type TypeArticles = {
  title: string
  date: string
  author: string
  description: string
  product: string
  visibility: string
  popularity: number
}

export const Card = (props: TypeArticles) => {
  const formatDate = new Date(props.date)
  return (
    <div className={style.card}>
      <div className={style.column}>
        <div className={style.partners}>Partners</div>
        <img src="./envelope.png" />
      </div>
      <div>
        <h3>{props.title}</h3>
        <div className={style.description}>{props.description}</div>
      </div>
      <div className={style.column}>
        <div className={style.date_author}>
          <div>{props.author}</div>
          <div>{`${format(formatDate, 'MMM dd')}th ${format(
            formatDate,
            'yy',
          )}`}</div>
        </div>
      </div>
    </div>
  )
}
