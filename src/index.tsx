import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App'

export let DBContext: React.Context<any>

async function initDb() {
  let response = await fetch('/db.json')
  let db = await response.json()
  return db
}

async function initApplication() {
  const db = await initDb()
  DBContext = React.createContext(db)
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
  )
  root.render(
    < App />
  )
}

initApplication()
