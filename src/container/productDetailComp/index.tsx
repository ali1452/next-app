"use client"
import React, { useEffect, useState } from 'react'
import { productData } from '../mainLayout/productdata'
import style from './productDetail.module.scss'
import Link from 'next/link'

type Props = {
  id:string,
}

const ProductDetail = ({id}: Props) => {

  const[seletedProduct, setSelectedProduct] = useState<any>({})
  const productId = +id
  const product=productData[productId-1]

  useEffect(()=>{
    setSelectedProduct(product)
    
  },[product])
  console.log('product', product)
  return (
    <div className={style.productDetail_container}>
      <p className={style.product_heading}>Product Detail</p>
      <div className={style.product_card}>
      <p className={style.product_name}>{seletedProduct.name}</p>
      <span className={style.img_container}>
      <img src={`/${seletedProduct.url}`} width='500px' height='auto' />
      <div>
      <div  className={style.size_container}>
      Size:  
      {seletedProduct.sku?.map((size:string)=>{
        return(
          <p key={size}>{size}</p>
        )
      })}
      </div>
      <p>Category: <span>{seletedProduct.category}</span></p>
      <p>Brand: <span>{seletedProduct.brand}</span></p>
      <p>{seletedProduct.description}</p>
      <p className={style.price}>Price:  <span>{seletedProduct.price}</span></p>
      </div>
      </span>
      <div className={style.btn_container}>
      <Link href='/cart'><p className={style.add_cart_btn}>Add to Cart</p></Link>
      <p  className={style.shop_btn}>Shop Now</p>
      </div>
      </div>
      
      </div>
  )
}

export default ProductDetail