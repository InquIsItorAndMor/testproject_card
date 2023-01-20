import React from "react"
import style from './Card.module.css'

type TypeArticles = {
    title: string
    date: string
    author: string
    description: string
    product: string
    visibility: string
    popularity: number
}

export const Card = (props: TypeArticles) => {



    return (
        <div className={style.card} >
            <div></div>
            <div>
                <div>{props.title}</div>
                <div>{props.description}</div>
            </div>
            <div>
                <div>{props.author}</div>
                <div>{props.date}</div>
            </div>
        </div >
    )
}