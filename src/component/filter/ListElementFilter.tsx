import React, { useState } from "react"

type TypeListElementFilter = {
    name: string | number,
    checked: boolean,
    updateFilter: Function,
    typeFilter: string
}

export const ListElementFilter = function (props: TypeListElementFilter) {

    const [checked, setChecked] = useState(props.checked)

    const handlerChange = function (event: React.FormEvent<HTMLInputElement>) {
        setChecked(!checked)
        props.updateFilter(event.currentTarget)
    }

    return (
        <React.Fragment>
            <li>
                <input onChange={handlerChange} type="checkbox" checked={checked} data-name-filter={props.typeFilter} data-value={props.name} />
                <label >{props.name}</label>
            </li>
        </React.Fragment>
    )
} 