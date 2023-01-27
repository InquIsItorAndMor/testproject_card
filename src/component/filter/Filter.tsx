import React from 'react'
import style from './Filter.module.css'
import { ListElementFilter } from './ListElementFilter'
import { TypeArticles, TypeDB } from '../../type'

type TypeFilter = {
  filterName: keyof TypeArticles,
  refObject: React.RefObject<any>,
  context: TypeDB,
  listFilter: (keyof TypeArticles)[]
}

type TypeFilterArticles = {
  filter: string | number,
  checked: boolean
}

export const Filter = function (props: TypeFilter) {
  const getListTypeFilter = (filter: keyof TypeArticles): TypeFilterArticles[] => {
    let response: TypeFilterArticles[] = props.context.data.map(value => { return { filter: value[filter], checked: true } })
    const uniq = new Set(response.map(value => JSON.stringify(value)));
    const res = Array.from(uniq).map(value => JSON.parse(value));
    response = res;
    return response
  }

  const initFilter = function () {
    const filter = { typeFilter: props.filterName, filterValue: getListTypeFilter(props.filterName) }
    return filter
  }
  let filter = initFilter()

  const updateFilter = function (event: EventTarget & HTMLInputElement) {
    const typeFilter = event.attributes.getNamedItem("data-name-filter")?.value;
    const valueFilter = event.attributes.getNamedItem("data-value")?.value;
    if (typeFilter && filter.typeFilter === typeFilter) {
      if (valueFilter) {
        filter.filterValue.map(filterValue => {
          if (filterValue.filter === valueFilter) {
            filterValue.checked = event.checked
          }
          return filterValue
        })
      }
    }

    const object: HTMLDivElement[] = props.refObject.current?.childNodes[1].childNodes;
    object.forEach((value) => {
      let countFalseFilter: number = 0
      const keyCurrentFilter = `filter${props.filterName.substr(0, 1).toUpperCase() + props.filterName.substr(1, props.filterName.length)}`
      const currentFilter = value.dataset[keyCurrentFilter]
      const curentFilterValue = value.dataset[props.filterName]
      if (currentFilter !== undefined && curentFilterValue === valueFilter) {
        !currentFilter ? value.setAttribute(`data-filter-${props.filterName}`, "1") : value.setAttribute(`data-filter-${props.filterName}`, "")
      }
      const attributes = value.dataset
      props.listFilter.forEach(lvalue => {
        const key = lvalue.substr(0, 1).toUpperCase() + lvalue.substr(1, lvalue.length)
        if (attributes[`filter${key}`] !== undefined && !attributes[`filter${key}`]) {
          countFalseFilter++
        }
      })
      if (countFalseFilter > 0) {
        value.style.display = "none"
      } else {
        value.style.display = ""
      }
    })
  }

  return (
    <React.Fragment>
      <div className={style.filter}>
        <div className={style.title}>{filter.typeFilter}</div>
        <ul>
          {
            filter.filterValue.map((filterValue, index) => {
              return <ListElementFilter updateFilter={updateFilter} key={index} name={filterValue.filter} checked={filterValue.checked} typeFilter={filter.typeFilter} />
            })
          }
        </ul>
      </div>
    </React.Fragment>
  )
}
