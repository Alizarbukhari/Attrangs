import React from 'react'
import Navbar2 from '../components/navbar2'
import Productheader from './component/productheader'
import Navebar1 from '../components/navbar1'
import Footer from '../components/footer'
import Wishlist from '../components/Wishlist/Wishlist'
import Header1 from '../components/Header/Header'

function Product() {
  return (
    <div>
        <Navebar1/>
        <Navbar2/>
        <Header1/>
        <Productheader/>
        <Wishlist/>
        
        <Footer/>


    </div>
  )
}

export default Product