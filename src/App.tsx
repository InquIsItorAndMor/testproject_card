import React, { useContext } from 'react'
import style from './App.module.css'
import { Filter } from './component/filter/Filter'
import { DBContext } from '.'
import { Card } from './component/card/Card'
import { Sort } from './component/Sort/Sort'

type TypeArticles = {
  title: string
  date: string
  author: string
  description: string
  product: string
  visibility: string
  popularity: number
}

type TypeDB = {
  data: TypeArticles[]
}

function App() {
  const contex = useContext(DBContext)
  const card = contex as TypeDB
  return (
    <div className={style.App}>
      <div className={`${style.column} ${style.grid}`}>
        <Filter filterName="product" />
        <Filter filterName="visibility" />
      </div>
      <div className={style.column}>
        <Sort sortName={['product']}>
          {card.data.map((value, index) => (
            <Card key={index} {...value} />
          ))}
        </Sort>
      </div>
    </div>
  )
}

export default App
