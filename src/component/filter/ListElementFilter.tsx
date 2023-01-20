import React, { useState } from "react"

type TypeListElementFilter = {
    name: string | number,
    stateChecked: boolean
}

export const ListElementFilter = function (props: TypeListElementFilter) {

    const [checked, setChecked] = useState(props.stateChecked)

    const handlerChange = () => {
        setChecked(!checked)
    }

    return (
        <React.Fragment>
            <li>
                <input onChange={handlerChange} type="checkbox" checked={checked} />
                <label >{props.name}</label>
            </li>
        </React.Fragment>
    )
} 