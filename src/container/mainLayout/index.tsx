'use client'

import React, { useEffect, useState } from 'react'
import  style from './mainLayout.module.scss'
import { productData } from './productdata'
import Image from 'next/image'
import Link from 'next/link'
import { getAllProducts } from '@/services/userservices'
import Loader from '@/component/loader/loader'

const MainLayout = () => {
const [productData,setProductData] = useState<any[]>([])
const [loading,setLoading] = useState(true)
const [err,setErr] =useState(false)

  const getProducts =async()=>{
     const data = await getAllProducts()
     if(data?.status === 200){
      setLoading(false)
      setProductData(data.data)
     }else{
      setErr(true)
      setLoading(false)
     }
  }

  useEffect(()=>{
    getProducts()
  },[])

 
  return (
    <>
     {loading && <Loader />}
     <div className={style.main_layout_container}>
     
     {!loading && productData  &&  productData.length > 0 &&
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
     </>
     }
     {err && <h1 className={style.no_avail_div}>No Product Avaialable</h1>}
 </div>
    </>
   
  )
}

export default MainLayout