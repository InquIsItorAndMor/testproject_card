import React, { useState } from 'react'
import style from './Sort.module.css'

type TypeArticles = {
  title: string
  date: string
  author: string
  description: string
  product: string
  visibility: string
  popularity: number
}

type TypeSort = {
  sortName: (keyof TypeArticles)[]
  children: JSX.Element[]
}

export const Sort = function (props: TypeSort) {
  const [sortchildren, setSortchildren] = useState({
    children: props.children,
    sort: props.sortName.map((value) => {
      return { name: value, direction: false }
    }),
  })

  const sortDecreasing = (
    n1: JSX.Element,
    n2: JSX.Element,
    sortName: keyof TypeArticles,
  ) => {
    if (n1.props[sortName] < n2.props[sortName]) {
      return 1
    }

    if (n1.props[sortName] > n2.props[sortName]) {
      return -1
    }

    return 0
  }
  const sortIncreasing = (
    n1: JSX.Element,
    n2: JSX.Element,
    sortName: keyof TypeArticles,
  ) => {
    if (n1.props[sortName] > n2.props[sortName]) {
      return 1
    }

    if (n1.props[sortName] < n2.props[sortName]) {
      return -1
    }

    return 0
  }
  const sortDb = function (
    card: JSX.Element[],
    sortName: keyof TypeArticles,
  ): JSX.Element[] {
    const directionSort = sortchildren.sort.filter((value) => {
      return value.name === sortName
    })[0]
    const sort: JSX.Element[] = card.sort((n1, n2) => {
      if (directionSort.direction) {
        return sortIncreasing(n1, n2, sortName)
      } else {
        return sortDecreasing(n1, n2, sortName)
      }
    })

    return sort
  }

  const clickSort = function (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void {
    const stateSort = {
      children: [
        ...sortDb(
          [...sortchildren.children],
          event.currentTarget.value as keyof TypeArticles,
        ),
      ],
      sort: sortchildren.sort.map((value) => {
        if (value.name === event.currentTarget.value) {
          value.direction = !value.direction
        }
        return value
      }),
    }
    setSortchildren({ ...stateSort })
  }

  return (
    <div className={style.sort}>
      <div className={style.buttonSort}>
        {props.sortName.map((value, index) => (
          <button key={index} onClick={clickSort} value={value}>
            {value}
          </button>
        ))}
      </div>
      {sortchildren.children}
    </div>
  )
}
