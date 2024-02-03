import React from 'react'
import Hero from '../components/hero/Hero'
import Popular from '../components/popular/Popular'
import Offers from '../components/offers/Offers'
import NewCollections from '../components/NewCollections/NewCollections'
import NewsLetter from '../components/newsLetters/NewsLetter'

const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular category="Popular In Women"/>
      <Offers />
      <NewCollections category="New Collection" />
      <NewsLetter />
    </div>
  )
}

export default Shop