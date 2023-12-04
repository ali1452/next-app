import React from 'react'
import style from './header.module.scss'
import Link from 'next/link'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
  return (
    <div className={style.header_container}>
        <p>Zeen</p>
        <p>All Your Needs</p>
        <p>
        <Link href='/cart'><span className={style.cart_icon}><ShoppingCartIcon  /></span></Link>
        <Link href='/'><span>Products</span></Link>
        </p>
        </div>
  )
}

export default Header