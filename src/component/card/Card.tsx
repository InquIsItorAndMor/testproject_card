import React from 'react'
import style from './Card.module.css'
import { format } from 'date-fns'
import { TypeArticles } from '../../type'

export const Card = (props: TypeArticles) => {
  const formatDate = new Date(props.date)
  return (
    <div className={style.card}>
      <div className={style.column}>
        <div className={style.partners}>Partners</div>
        <img alt="" src="./envelope.png" />
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
