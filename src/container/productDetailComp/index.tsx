"use client"
import React, { useEffect, useState } from 'react'
import { productData } from '../mainLayout/productdata'
import style from './productDetail.module.scss'
import Link from 'next/link'
import Loader from '@/component/loader/loader'
import { addCart,addItemQty } from '@/redux/slice/cartSlice'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
  id:string,
}

const ProductDetail = ({id}: Props) => {

  const[seletedProduct, setSelectedProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const  [selectedSize,setSelectedSize] = useState('')
  const [error, setError] =useState('')
  const productId = +id
  const product=productData[productId-1]
  const dispatch = useDispatch()
  const selector = useSelector((item:any)=>item.cart)

  useEffect(()=>{
    setSelectedProduct(product)
    setLoading(false)
    
  },[product])
  
const add_Cart_item =(value:any)=>{
  let added = true
  const tempVal = {...value}
  if(selectedSize !== ''){
    setError('')
    tempVal.size = selectedSize
    const stateItem = selector.cart
    stateItem.filter((item:any,index:number)=>{
  if((item.product_id == tempVal.product_id) && (item.size == tempVal.size)){
    if(stateItem[index].qty < 5){
      dispatch(addItemQty(index))
    }
    added = false
  }
    })
    if(added){
      dispatch(addCart(tempVal))
    }

  }else{
    setError('Please Select Size First.')
  }
 
}

const selectOption=(e: any)=>{
setSelectedSize(e.target.value)
}

  return (
    <>
    {loading && <Loader />}
    {!loading && product && <div className={style.productDetail_container}>
      <p className={style.err}>{error}</p>
      <p className={style.product_heading}>Product Detail</p>
      <div className={style.product_card}>
      <p className={style.product_name}>{seletedProduct.name}</p>
      <span className={style.img_container}>
      <img src={`/${seletedProduct.url}`} width='500px' height='auto' />
      <div>
      <div  className={style.size_container}>
      Size:  
        <select value={selectedSize ==  null ? '':selectedSize} onChange={(e)=>selectOption(e)}>
        <option value=''>Select</option>
          {seletedProduct.sku?.map((size:string)=>{
                return(
                  <option key={size} value={size}>{size}</option>
                )
              })} 
          
        </select>
      </div>
      <p>Category: <span>{seletedProduct.category}</span></p>
      <p>Brand: <span>{seletedProduct.brand}</span></p>
      <p>{seletedProduct.description}</p>
      <p className={style.price}>Price:  <span>{seletedProduct.price}</span></p>
      </div>
      </span>
      <div className={style.btn_container}>
      <p onClick={()=>add_Cart_item(seletedProduct)} className={style.add_cart_btn}>Add to Cart</p>
      <p  className={style.shop_btn}>Shop Now</p>
      </div>
      </div>
      
      </div>}
      </>
  )
}

export default ProductDetail