"use client"

import React, { useState } from 'react'
import style  from'./checkoutLayout.module.scss'
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useSelector } from 'react-redux';

const CheckoutLayout = () => {

  const [defaultAddress, setDefaultAddress]  = useState(true)
  const [isPayment, setIspayment] = useState(true)
  const [customerInfo, setCustomerInfo] = useState({
    email:'',
    first_name:'',
    last_name:'',
    shippingAddress:'',
    country:'pakistan',
    province:'',
    city:'',
    area:'',
    zip_code:'',
    mobile_num:'',
  })

  const [err, setErr]= useState({
    email_err:false,
    first_name_err:false,
    last_name_err:false,
    shippingAddress_err:false,
    province_err:false,
    city_err:false,
    area_err:false,
    zip_err:false,
    mobile_num_err:false
  })
  const selector:any = useSelector(state=>state)
  const cartData = selector.cart.cart
  const cartItems = cartData.length

  const cartTotal =()=> {
  let totalAmt = 0
  cartData.forEach((item:any)=>{
  const {price} = item
  totalAmt += +price
  })
  return totalAmt
}

const changeCustomerInfo =(e: React.ChangeEvent<HTMLInputElement>)=>{
  setCustomerInfo({...customerInfo,[e.target.name]:e.target.value})

}

const validateField=(e: React.FocusEvent<HTMLInputElement, Element>)=>{
  if(e.target.name== 'email'){
    const check =e.target.value.includes('@')
    if(e.target.value.includes('@')){
      setErr({...err, email_err:false})
    }else{
      setErr({...err, email_err:true})
    }
  }
  if(e.target.name == 'first_name'){
    if(e.target.value.length < 3){
      setErr({...err, first_name_err:true})
    }else{
      setErr({...err, first_name_err:false})
    }
  }
}

const placeOrder =()=>{
  let checkErr = true
  let emptyStr = true
  Object.values(err).map((item)=>{
    if(item == true){
      checkErr= false
    }
  })

  Object.values(customerInfo).map((item)=>{
    if(item == ''){
      emptyStr = false
    }
  })
  if(checkErr && emptyStr){
    console.log('submitted form sucessfully')
  }else{
    console.log('show error')
  }

  
  
 
}

  return (
    <div className={style.checkout_container}>
        <div className={style.detail_box}>
        <form>
        <label className={style.heading} >Contact Information</label><br/>
        <input  className={style.full_input} value={customerInfo.email} type="email" placeholder='Email Address' id="constact" name="email" onChange={(e)=>changeCustomerInfo(e)} onBlur={(e)=>validateField(e)} /><br/>
        {err.email_err &&<p className={style.err_msg}>Invalid email address</p>}
        <div className={style.flex_box}>
        <input className={style.name_input} value={customerInfo.first_name} type="text" placeholder='First Name' id="first_name" name="first_name" onChange={(e)=>changeCustomerInfo(e)} onBlur={(e)=>validateField(e)}/>
        {/* {err.first_name_err &&<p>First name should be more than 3 letters</p>} */}
        <input className={style.name_input} type="text" placeholder='Last Name' id="last_name" name="last_name"/>
        </div>
        <label className={style.heading} >Shipping Address</label><br/>
        <input className={style.full_input} type="text" placeholder='Street Address' id="constact" name="contact" /><br/>
        <div className={style.flex_box}>
        <select className={style.select_input}>
        <option value="Pakistan">Pakistan</option>
        {/* <option value="India">India</option> */}
        </select>
        <select className={style.select_input}>
        <option value="sindh">Sindh</option>
        <option value="Punjab">Punjab</option>
        <option value="KPK">KPK</option>
        <option value="balochistan">Balochistan</option>
        </select>
        </div>
        <div className={style.flex_box}>
        <select className={style.select_input}>
        <option value="karachi">Karachi</option>
        <option value="islamabad">Islamabad</option>
        <option value="lahore">Lahore</option>
        <option value="peshawar">Peshawar</option>
        <option value="quetta">Quetta</option>
        </select>
        <select className={style.select_input}>
        <option value="sindh">Malir</option>
        <option value="Punjab">Gulshan-e-Iqbal</option>
        <option value="KPK">Nazimaabad</option>
        <option value="balochistan">Defence</option>
        <option value="balochistan">Clifton</option>
        <option value="balochistan">Gulburg</option>
        <option value="balochistan">F.B Area</option>
        </select>
        </div>
        <div className={style.flex_box}>
        <input className={style.name_input} placeholder='Zip Code' />
        <input className={style.name_input} placeholder='Mobile Number' />
        </div>
        <input className={style.check_box} type='checkbox' /><label>Create account</label><br/>
        <input checked={defaultAddress} onChange={()=>{setDefaultAddress(!defaultAddress)}} className={style.check_box} type='checkbox' /><label>My billing and shipping address are same</label>
        </form>
        {!defaultAddress ?<form>
        <label >Contact Information</label><br/>
        <input  className={style.full_input} type="text" placeholder='Email Address' id="constact" name="contact" /><br/>
        <div className={style.flex_box}>
        <input className={style.name_input} type="text" placeholder='First Name' id="first_name" name="first_name"/>
        <input className={style.name_input} type="text" placeholder='Last Name' id="last_name" name="last_name"/>
        </div>
        <label >Shipping Address</label><br/>
        <input className={style.full_input} type="text" placeholder='Street Address' id="constact" name="contact" /><br/>
        <div className={style.flex_box}>
        <select className={style.select_input}>
        <option value="Pakistan">Pakistan</option>
        <option value="India">India</option>
        </select>
        <select className={style.select_input}>
        <option value="sindh">Sindh</option>
        <option value="Punjab">Punjab</option>
        <option value="KPK">KPK</option>
        <option value="balochistan">Balochistan</option>
        </select>
        </div>
        <div className={style.flex_box}>
        <select className={style.select_input}>
        <option value="karachi">Karachi</option>
        <option value="islamabad">Islamabad</option>
        <option value="lahore">Lahore</option>
        <option value="peshawar">Peshawar</option>
        <option value="quetta">Quetta</option>
        </select>
        <select className={style.select_input}>
        <option value="sindh">Malir</option>
        <option value="Punjab">Gulshan-e-Iqbal</option>
        <option value="KPK">Nazimaabad</option>
        <option value="balochistan">Defence</option>
        <option value="balochistan">Clifton</option>
        <option value="balochistan">Gulburg</option>
        <option value="balochistan">F.B Area</option>
        </select>
        </div>
        <div className={style.flex_box}>
        <input className={style.name_input} placeholder='Zip Code' />
        <input className={style.name_input} placeholder='Mobile Number' />
        </div>
        </form>:""}
        </div>
        <div className={style.payment_box}>
          <p className={style.payment_heading}>
          <CreditCardIcon />
            <span>Payment Methods</span>
          </p>
        <input checked={isPayment} onChange={()=>setIspayment(!isPayment)}  type='radio' /><label className={style.payment_label}>Cash on delivery</label><br/>
        <input checked={!isPayment} onChange={()=>setIspayment(!isPayment)} type='radio' /><label className={style.payment_label}>
        <img src="https://www.gulahmedshop.com/static/version1706155957/frontend/Codazon/fastest_ellyana/en_US/Apps_PayFastPayment/img/payfast_logo_loading.png"/>
        </label>
        {!isPayment  && <div>
          <label>Credit Card Number</label><br></br>
          <input type='text' placeholder='card number' /><br/>
          <label>Expiration Date</label><br/>
          <p className={style.card_input_div}>
          <input type='text' placeholder='card number' />
          <input type='text' placeholder='card number' />
          </p>
          <br/>
          <label>CVC</label><br/>
          <input type='text'placeholder='cvc' />


        </div>}
        <p>Apply Discount</p>
        <p>Order Summary</p>
        <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          {cartItems} Item in Cart
        </AccordionSummary>
        <AccordionDetails>
          <div className={style.accordion_detail_wrap}>
            <div className={style.item_detail}>
              <p>Cart subtotal</p>
              <p>shipping</p>
              <p>Order Total</p>
            </div>
            <div className={style.item_detail}>
              <p>Rs.{cartTotal()}</p>
              <p>Rs.200</p>
              <p>Rs.{cartTotal() + 200}</p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <div className={style.order_detail}>
         <p className={style.flex_one}>Product Name</p>
         <p className={style.flex_one}>QTY</p>
         <p className={style.flex_one}>Subtotal</p>
        </div>
        {cartData && cartData.length >0 && cartData?.map((item:any, index:number)=>{
          const {name,qty,price}= item
          return(
        <div className={style.order_qty}key={index+'item'}>
         <p className={style.flex_one}>{name}</p>
         <p className={style.flex_one}>{qty}</p>
         <p className={style.flex_one}>Rs.{price}</p>
        </div>
          )
          
        })} 
        
        <div className={style.place_order}>
          <p>Please Note: Land duty and taxes to be borne by customer</p>
          <p className={style.order_btn} onClick={()=>{placeOrder()}}>Place Order</p>
          </div>
        </div>
        </div>
  )
}

export default CheckoutLayout