import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'
import { productData } from '../mainLayout/productdata'
import style from './cart.module.scss'


type Props = {}

const CartComp = (props: Props) => {
    const product = productData[0]
  return (
    <div className={style.cart_container} >
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
        <p><span className={style.bold_text}>Size:</span> Meduim</p>
        <p><span className={style.bold_text}>quantity:</span> 1</p>
        <p className={style.edit_btn}>edit</p>
        </div>
        </td>
       <td className={style.price}>
        <span>{product.price}</span>
        </td>
       <td className={style.qty}>1</td>
       <td className={style.sub_total}>{product.price}</td>
       </tr>
       
       </tbody>
     
     </table>
     <div className={style.icons_btn}>
       <p><CreateIcon /></p>
       <p><DeleteIcon /></p>
       </div>
       <div className={style.share_box}>
        <p className={style.share_btn}>share cart</p>
        <p className={style.continue_btn}>continue Shopping</p>
       </div>
       <div className={style.discount_box}>
      <p className={style.discount_heading}>Apply discount code</p>
      <input className={style.code_input} type='text' placeholder='enter your promo code' />
      <button className={style.code_btn}>Apply Discount</button>
     </div>
     </div>
    <div className={style.summary_box}>
    <p className={style.summary_heading}>Summary</p>
    <div className={style.flex_box}>
      <p>subtotal</p>
      <p>Rs.3000</p>
    </div>
    <div className={style.flex_box}>
      <p>shipping (domestic - shipping)</p>
      <p>Rs.100</p>
    </div>
    <div className={style.total_box}>
      <p>Order Total</p>
      <p>Rs.3100</p>
    </div>
    <p className={style.checkout_btn}>go to checkout</p>
    </div>
    </div>
  )
}

export default CartComp