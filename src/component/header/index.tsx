'use client'
import React from 'react'
import style from './header.module.scss'
import Link from 'next/link'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';

const Header = () => {
  const count= useSelector((item:any)=>item.cart.cart)
  let total_item = 0
  const calc_cartItem =(num:Number)=>{
    count.map((item:any)=>total_item += item.qty)
    return  total_item
  }
  calc_cartItem(total_item)

  return (
    <div className={style.header_container}>
         <Link href='/'><p>M&B</p></Link>
        <p>All Your Needs</p>
        <p>
        <Link href='/cart'>
          <span className={style.cart_icon}><ShoppingCartIcon  />
          {total_item >0?<span className={style.count}>{total_item}</span>:""}
          </span></Link>
        </p>
        </div>
  )
}

export default Header