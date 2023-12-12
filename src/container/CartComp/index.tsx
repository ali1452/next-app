'use client'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react'
import { productData } from '../mainLayout/productdata'
import style from './cart.module.scss'
import { useRouter } from 'next/navigation';
import DeleteModal from './deleteModal/deleteModal';


type Props = {}

const CartComp = (props: Props) => {
  const [edit,setEdit] = useState<boolean>(false)
  const [product,setProduct] = useState({})
  const [discountCode, setDiscountCode] = useState<string>('')
  const [applyCode, setApplyCode] = useState<boolean>(false)
  const [codeAmt, setCodeAmt] = useState<number>(0)
  const [errMsg, setErrMsg] = useState('')
  const [modal,setModal] = useState<boolean>(false)
  const route = useRouter()
    useEffect(()=>{
      setProduct(productData[0])

    },[])

    const changeQty=(e: string)=>{
      const temp_element = {...product}
      if(+e >= 0 && +e <= 5 ){
        temp_element.qty = +e
        setProduct(temp_element)
      }
    }

    const applyDiscount=()=>{
      if(discountCode === "welcome"){
        setApplyCode(true)
        setCodeAmt(100)
      }else{
        setErrMsg('This code is invalid!')
        setTimeout(()=>{
          setErrMsg('')
        },2000)
      }

    }
  return (
    <div className={style.cart_container} >
      {product.name !== undefined  ?
      <>
      <div className={style.detail_container}>
        <p className={style.cart_heading}>Shopping Cart</p>
      <table>
       <thead>
       <tr style={{borderBottom:'1px solid #000', marginBottom:'10px'}}>
       <th>ITEM</th>
       <th>PRICE</th>
       <th>QTY</th>
       <th>SUBTOTAL</th>
       </tr>
       </thead>
     <tbody>
     <tr>
     <td className={style.item_container}>
      <div>
      <p style={{width:'120px'}}><img src={product.url} /></p>
      </div>
      <div className={style.detail_box}>
      <p className={style.bold_text}>{product.name}</p>
      {!edit ?<p><span className={style.bold_text}>Size:</span> Meduim</p>:
      <p>
         <select className={style.select_input} name="size" id="size">
          <option value="small">small</option>
          <option value="medium">medium</option>
          <option value="large">large</option>
         </select>
        </p>}
      {!edit ? <p><span className={style.bold_text}>quantity:</span> 1</p>:
      <>
      <label>QTY</label>
      <p><input className={style.select_input} value={product.qty}  type="number" onChange={(e)=>changeQty(e.target.value)}  /></p>
      </>}
      {!edit && <p onClick={()=>{setEdit(true)}} className={style.edit_btn}>edit</p>}
      {edit && <p onClick={()=>{setEdit(false)}} className={style.edit_btn}>Save</p>}
      </div>
      </td>
     <td className={style.price}>
      <span>{product.price}</span>
      </td>
     <td className={style.qty}>{product.qty}</td>
     <td className={style.sub_total}>{product.price*product.qty}</td>
     </tr>
     </tbody>
   </table>
   <div className={style.icons_btn}>
     <p><CreateIcon /></p>
     <p onClick={()=>{setModal(true)}} ><DeleteIcon /></p>
     </div>
     <div className={style.share_box}>
      <p className={style.share_btn}>share cart</p>
      <p className={style.continue_btn} onClick={()=>route.push('/')}>continue Shopping</p>
     </div>
     <div className={style.discount_box}>
    <p className={style.discount_heading}>Apply discount code</p>
    {<p style={{color:'red'}}>{errMsg}</p>}
    <input disabled={applyCode} className={style.code_input} onChange={(e)=>setDiscountCode(e.target.value)} type='text' placeholder='enter your promo code' />
    <button disabled={applyCode}  className={style.code_btn} onClick={()=>applyDiscount()} >Apply Discount</button>
   </div>
   </div>
  <div className={style.summary_box}>
  <p className={style.summary_heading}>Summary</p>
  <div className={style.flex_box}>
    <p>subtotal</p>
    <p>Rs.{product.price * product.qty}</p>
  </div>
  <div className={style.flex_box}>
    <p>shipping (domestic - shipping)</p>
    <p>Rs.100</p>
  </div>
  {applyCode? <div className={style.flex_box}>
    <p>Promo Code</p>
    <p>Rs.{codeAmt}</p>
  </div>:''}
  <div className={style.total_box}>
    <p>Order Total</p>
    <p>Rs.{product.price * product.qty + 100 - codeAmt}</p>
  </div>
  <p className={style.checkout_btn}>go to checkout</p>
  </div>
  <DeleteModal modal={modal} setModal={(modal:boolean)=>setModal(modal)} setProduct={(item:any)=>setProduct(item)} />
  </>
      :<p>Cart is Empty</p>}
      
    </div>
  )
}

export default CartComp