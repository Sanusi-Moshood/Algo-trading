import React from 'react'
import { Link } from 'react-router-dom'
const PageNotFound = () => {
  return (
    <div>
      <h1>ERROR 404
      </h1> <br />
      <h4>PAGE NOT FOUND</h4>
      <Link to={'/'}> Back to homepage</Link>
      
    </div>
  )
}

export default PageNotFound
