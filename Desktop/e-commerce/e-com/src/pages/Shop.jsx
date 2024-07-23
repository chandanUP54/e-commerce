import React from 'react'
import Hero from '../components/hero/Hero'
import Popular from '../components/popular/Popular'
import Offers from '../components/offers/Offers'
import KidsOffer from "../components/offers/KidsOffer"
import NewCollections from '../components/NewCollections/NewCollections'
import NewsLetter from '../components/newsLetters/NewsLetter'

const Shop = () => {
  return (
    <div>
      <Hero />

      <Offers />
      <NewCollections category="New Collection" />
      <KidsOffer />
      <Popular category="Popular In Women"/>
      <NewsLetter />
    </div>
  )
}

export default Shop