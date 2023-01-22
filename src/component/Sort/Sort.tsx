import React, { Children, useContext } from 'react'
import { DBContext } from '../..'
import { Card } from '../card/Card'

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

type TypeSort = {
  sortName: [keyof TypeArticles]
  children: JSX.Element[]
}

export const Sort = function (props: TypeSort) {
  const context: TypeDB = useContext(DBContext) as TypeDB

  const clickSort = function (event: Event) {}

  return (
    <div>
      {props.sortName.map((value, index) => (
        <button key={index}>{value}</button>
      ))}
      {props.children}
    </div>
  )
}
