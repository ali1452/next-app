import React from 'react'
import { productData } from '../mainLayout/productdata'

type Props = {}

const CartComp = (props: Props) => {
    const product = productData[0]
  return (
    <div>
        <p className={''}>Shopping Cart</p>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <table>
         <thead>
         <tr>
         <th>ITEM</th>
         <th>PRICE</th>
         <th>QTY</th>
         <th>SUBTOTAL</th>
         </tr>
         </thead>
       <tbody>
       <tr>
       <td>{product.name}</td>
       <td>{product.price}</td>
       <td>1</td>
       <td>{product.price}</td>
       </tr>
      </tbody>
     </table>
     <div>
        <p>Summary</p>
     </div>
     </div>
    </div>
  )
}

export default CartComp