'use client'

import React from 'react'
import  style from './mainLayout.module.scss'
import { productData } from './productdata'
import Image from 'next/image'
import Link from 'next/link'

const MainLayout = ({data}:any) => {
 
 console.log('data',productData)
    
  return (
    <div className={style.main_layout_container}>
        {/* <h1>Client List</h1>
        {data && data.map((item:any)=>{
            return(
                <p onClick={()=>console.log('hello')} className={style.customer_name} key={item._id}>{item.first_name} {item.last_name}</p>
            )
        })} */}
        {productData  &&  productData.length > 0 ?
        <>
        {productData.map((item,i)=>{
          const {url,name,price,sku} = item
          return(
            <div key={"product" + i} className={style.card}>
            <Link href={`/products/${i+1}`}><img src={url} alt='Product Image' width='400px' height='500px' /></Link>
            <p className={style.product_name}>{name}</p>
            <p className={style.price}>Rs.{price}</p>
            <span className={style.sku}>
              Size:
            {sku.map((item,index)=>{
              return(
                <p key={index+1} style={{textTransform:'uppercase'}}>{item}</p>
              )
            })}
            </span>

            </div>
          )
        })}
        </>
        
        :<h1>No Product Avaialable</h1>}
    </div>
  )
}

export default MainLayout