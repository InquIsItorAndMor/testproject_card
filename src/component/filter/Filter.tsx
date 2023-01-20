import React, { useContext } from 'react'
import { DBContext } from '../..'
import style from './Filter.module.css'
import { ListElementFilter } from './ListElementFilter'

type TypeFilter = {
  filterName: keyof TypeArticles
}

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

type TypeFilterArticles = {
  filter: string | number
}

export const Filter = function (props: TypeFilter) {
  const filterName = props.filterName
  const context: TypeDB = useContext(DBContext)

  const getListTypeFilter = (): TypeFilterArticles[] => {
    let response: TypeFilterArticles[] = context.data.map(value => { return { filter: value[filterName] } })
    const uniq = new Set(response.map(value => JSON.stringify(value)));
    const res = Array.from(uniq).map(value => JSON.parse(value));
    response = res;
    return response
  }

  return (
    <React.Fragment>
      <div className={style.filter}>
        <div className={style.title}>{filterName}</div>
        <ul>
          {getListTypeFilter().map((value, index) => (
            <ListElementFilter key={index} name={value.filter} stateChecked={true} />
          ))}
        </ul>
      </div>
    </React.Fragment>
  )
}
