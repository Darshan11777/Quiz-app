// import React from 'react'
import { Link } from 'react-router-dom'
// import "../index.css"

export default function Openpage() {
  return (
    <div className="open-screen-content">
      <h1 className="header">Quizzical</h1>
      <p className="description">Some description</p>
      <Link to="/home" className="start-btn btn" >Start Quiz</Link>
    </div>
  )
}
