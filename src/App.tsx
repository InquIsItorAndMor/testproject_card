import React, { useContext, useEffect, useRef } from 'react'
import style from './App.module.css'
import { Filter } from './component/filter/Filter'
import { DBContext } from '.'
import { Card } from './component/card/Card'
import { Sort } from './component/Sort/Sort'
import { TypeArticles, TypeDB } from './type'

export const App = () => {
  const context = useContext(DBContext) as TypeDB
  const sort: (keyof TypeArticles)[] = ['product', 'date']

  const sortRef = useRef<HTMLDivElement>(null)
  const listFilter: (keyof TypeArticles)[] = ["product", "visibility", "popularity"]

  useEffect(() => {
    console.log(sortRef)
  }, [])

  return (
    <div className={style.App}>
      <div className={`${style.column} ${style.grid}`}>
        {
          listFilter.map((value, index) => {
            return <Filter key={index} filterName={value} refObject={sortRef} context={context} listFilter={listFilter} />
          })
        }
      </div>
      <div className={style.column}>
        <Sort sortName={sort} sortDOM={sortRef}>
          {[...context.data.map((value, index) => (
            <Card key={index} articles={{ ...value }} filter={listFilter} />
          ))]}
        </Sort>
      </div>
    </div>
  )
}
