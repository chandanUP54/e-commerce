import React from 'react'
import './PageNotFound.css'
const PageNotFound = () => {
  return (
    <div className="page-not-found">
    <h1>! Page not found</h1>
    <p>We're sorry, we couldn't find the page you requested.</p>
    <div className="actions">
      <a href="/mens">Try Mens Wear </a>
      <a href="/womens">Browse our recent Women Sarees</a>
      <a href="/kids">Kids wear </a>
      <a href="#">Contact us</a>
    </div>
  </div>
  )
}

export default PageNotFound