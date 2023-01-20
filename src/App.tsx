import React, { useContext } from 'react'
import './App.css'
import { Filter } from './component/filter/Filter'
import { DBContext } from '.'
import { Card } from './component/card/Card'

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
    <div className="App">
      <div className='column'>
        <Filter filterName="product" />
        <Filter filterName="visibility" />
      </div>
      <div className='column'>
        {card.data.map((value, index) => <Card key={index} {...value} />)}
      </div>
    </div>
  )
}

export default App
