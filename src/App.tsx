import React, { useContext, useState } from 'react'
import style from './App.module.css'
import { Filter } from './component/filter/Filter'
import { DBContext } from '.'
import { Card } from './component/card/Card'
import { Sort } from './component/Sort/Sort'
import { TypeArticles } from './type'

export const App = () => {
  const context = useContext(DBContext)
  const [card, setCard] = useState({ data: [...context.data] })
  const sort: (keyof TypeArticles)[] = ['product', 'date']


  return (
    <div className={style.App}>
      <div className={`${style.column} ${style.grid}`}>
        <Filter filterName={["product", "visibility"]} db={context} card={card} setCard={setCard} />
      </div>
      <div className={style.column}>
        <Sort sortName={sort}>
          {[...card.data.map((value, index) => (
            <Card key={index} {...value} />
          ))]}
        </Sort>
      </div>
    </div>
  )
}
