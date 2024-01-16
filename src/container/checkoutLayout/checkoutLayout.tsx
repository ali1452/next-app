"use client"

import React, { useState } from 'react'
import style  from'./checkoutLayout.module.scss'

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
        <div className={style.payment_box}>World</div>
        </div>
  )
}

export default CheckoutLayout