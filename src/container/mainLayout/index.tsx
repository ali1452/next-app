// 'use client'
import React from 'react'
import  style from './mainLayout.module.scss'
import Link from 'next/link'

type IProps = {
  productData:any[]
}
const MainLayout = ({productData}:IProps) => {

  return (
    <>
     <div className={style.main_layout_container}>
     
     { productData  &&  productData.length > 0 ?
     <>
     {productData.map((item,i)=>{
       const {url,name,price,sku} = item
       return(
         <div key={"product" + i} className={style.card}>
         <Link href={`/products/${item.product_id}`}><img src={url} alt='Product Image' width='400px' height='500px' /></Link>
         <p className={style.product_name}>{name}</p>
         <p className={style.price}>Rs.{price}</p>
         <span className={style.sku}>
           Size:
         {sku?.map((item:any,index:number)=>{
           return(
             <p key={index+1} style={{textTransform:'uppercase'}}>{item}</p>
           )
         })}
         </span>

         </div>
       )
     })}
     </>:<h1 className={style.no_avail_div}>No Product Avaialable</h1>
     }
     </div>
    </>
   
  )
}

export default MainLayout