"use client"

import React, { useState } from 'react'
import style  from'./checkoutLayout.module.scss'
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CheckoutLayout = () => {

  const [defaultAddress, setDefaultAddress]  = useState(true)

  return (
    <div className={style.checkout_container}>
        <div className={style.detail_box}>
        <form>
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
          <p>Payment Methods</p>
        <input  type='radio' /><label>Cash on delivery</label><br/>
        <input  type='radio' /><label>Cash on delivery</label>
        <p>Apply Discount</p>
        <p>Order Summary</p>
        <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          1 Item in Cart
        </AccordionSummary>
        <AccordionDetails>
          <div style={{display:'flex'}}>
            <div style={{flex:'1'}}>
              <p>Cart subtotal</p>
              <p>shipping</p>
              <p>Order Total</p>
            </div>
            <div style={{flex:'1'}}>
              <p>Rs.5000</p>
              <p>Rs.200</p>
              <p>Rs.5200</p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <div style={{display:'flex', justifyContent:'space-between'}}>
         <p style={{flex:'1'}}>Product Name</p>
         <p style={{flex:'1'}}>QTY</p>
         <p style={{flex:'1'}}>Subtotal</p>
        </div>
        <div style={{display:'flex', justifyContent:'space-between',  marginTop:'10px'}}>
         <p style={{flex:'1'}}>XYZ</p>
         <p style={{flex:'1'}}>01</p>
         <p style={{flex:'1'}}>Rs.1000</p>
        </div>
        <div style={{display:'flex',justifyContent:'space-between', maxWidth:'77%'}}>
          <p>Please Note: Land duty and taxes to be borne by customer</p>
          <p>Place Order</p>
          </div>
        </div>
        </div>
  )
}

export default CheckoutLayout