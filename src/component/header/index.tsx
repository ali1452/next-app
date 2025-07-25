'use client'
import React, { useEffect, useState } from 'react'
import style from './header.module.scss'
import Link from 'next/link'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import SearchBox from '../searcrch-box/search-box-index';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const Header = () => {
  const [loading,setLoading]  = useState(true)
  const count= useSelector((item:any)=>item.cart.cart)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const selector = useSelector(state=>state)
  console.log('selector',selector)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  let total_item = 0
  const calc_cartItem =(num:Number)=>{
    count.map((item:any)=>total_item += item.qty)
    return  total_item
  }
  calc_cartItem(total_item)
  useEffect(()=>{setLoading(false)},[])

  if(loading){
    return null
  }

  return (
    <div className={style.header_container}>
         <Link href='/'><p>M&B</p></Link>
        <p className={style.header_text}>All Your Fashion Needs</p>
        <div className={style.icon_wrap} >
        <p className={style.search_icon}>
          <SearchBox />
          </p>
        <>
        <Link href='/cart'>
          <>
          <span className={style.cart_icon} aria-describedby={id} onClick={handleClick}><ShoppingCartIcon  />
          {total_item >0?<span className={style.count}>{total_item}</span>:""}
          </span>
          <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
          </>
          </Link>
        </>
        </div>
        </div>
  )
}

export default Header