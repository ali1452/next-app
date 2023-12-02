import React from 'react'
import style from './header.module.scss'
import Link from 'next/link'

const Header = () => {
  return (
    <div className={style.header_container}>
        <p>Zeen</p>
        <p>All Your Needs</p>
        <Link href='/'><p>Products</p></Link>
        </div>
  )
}

export default Header