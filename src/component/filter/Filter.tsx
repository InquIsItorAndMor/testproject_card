import React from 'react'
import style from './Filter.module.css'
import { ListElementFilter } from './ListElementFilter'
import { TypeArticles, TypeDB } from '../../type'

type TypeFilter = {
  filterName: (keyof TypeArticles)[],
  db: TypeDB,
  card: TypeDB,
  setCard: React.Dispatch<React.SetStateAction<TypeDB>>
}

type TypeFilterArticles = {
  filter: string | number,
  checked: boolean
}

export const Filter = function (props: TypeFilter) {
  const getListTypeFilter = (filter: keyof TypeArticles): TypeFilterArticles[] => {
    let response: TypeFilterArticles[] = props.db.data.map(value => { return { filter: value[filter], checked: true } })
    const uniq = new Set(response.map(value => JSON.stringify(value)));
    const res = Array.from(uniq).map(value => JSON.parse(value));
    response = res;
    return response
  }

  const initFilter = function () {
    const filter = props.filterName.map(value => {
      return { typeFilter: value, filterValue: getListTypeFilter(value) }
    })
    return filter
  }
  let filter = initFilter()

  const updateFilter = function (event: EventTarget & HTMLInputElement) {
    const typeFilter = event.attributes.getNamedItem("data-name-filter")?.value;
    const nameFilter = event.attributes.getNamedItem("data-value")?.value;
    filter = filter.map(value => {
      if (typeFilter && value.typeFilter === typeFilter) {
        if (nameFilter) {
          value.filterValue.map(filterValue => {
            if (filterValue.filter === nameFilter) {
              filterValue.checked = event.checked
            }
            return filterValue
          })
        }
      }
      return value
    });

    let filterChildren: TypeArticles[] = [...props.db.data]
    filter.forEach(nextFilter => {
      let filterElement: TypeArticles[] = []
      nextFilter.filterValue.forEach(filterValue => {
        filterElement = [
          ...filterElement,
          ...filterChildren.filter(db => {
            return filterValue.checked && db[nextFilter.typeFilter] === filterValue.filter.toString()
          })]

      })
      filterChildren = filterElement
    })
    props.setCard({ data: [...filterChildren] })
  }

  return (
    <React.Fragment>
      {
        filter.map((value, index) => {
          return (
            <div key={index} className={style.filter}>
              <div className={style.title}>{value.typeFilter}</div>
              <ul>
                {
                  value.filterValue.map((filterValue, index) => {
                    return <ListElementFilter updateFilter={updateFilter} key={index} name={filterValue.filter} checked={filterValue.checked} typeFilter={value.typeFilter} />
                  })
                }
              </ul>
            </div>)
        })
      }
    </React.Fragment>
  )
}
