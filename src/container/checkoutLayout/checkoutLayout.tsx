"use client"

import React, { useLayoutEffect, useState } from 'react'
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SecurityIcon from '@mui/icons-material/Security';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import LockIcon from '@mui/icons-material/Lock';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllCart } from '@/redux/slice/cartSlice';
import { useRouter } from 'next/navigation';

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
  const [orderErr,setOrderErr] =useState(false)
  const [successMsg, setSuccessMsg]  = useState(false)
  const selector:any = useSelector(state=>state)
  const router = useRouter()
  const dispatch = useDispatch()
  const cartData = selector.cart.cart
  const cartItems = cartData.length

  useLayoutEffect(()=>{
   if(!successMsg && cartData.length == 0){
    router.push('/')
   }
  },[])

  const cartTotal =()=> {
  let totalAmt = 0
  cartData.forEach((item:any)=>{
  const {price} = item
  totalAmt += +price*item.qty
  })
  return totalAmt
}

const changeCustomerInfo =(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)=>{
  setCustomerInfo({...customerInfo,[e.target.name]:e.target.value})

}

const validateField=(e: React.FocusEvent<HTMLInputElement, Element> | React.FocusEvent<HTMLSelectElement, Element>)=>{
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
  if(e.target.name == 'last_name'){
    if(e.target.value.length < 3){
      setErr({...err, last_name_err:true})
    }else{
      setErr({...err, last_name_err:false})
    }
  }

  if(e.target.name == 'shippingAddress'){
    if(e.target.value.length < 5){
      setErr({...err, shippingAddress_err:true})
    }else{
      setErr({...err, shippingAddress_err:false})
    }
  }

  if(e.target.name == 'province'){
    if(e.target.value == ""){
      setErr({...err, province_err:true})
    }else{
      setErr({...err, province_err:false})
    }
  }

   if(e.target.name == 'city'){
    if(e.target.value == ""){
      setErr({...err, city_err:true})
    }else{
      setErr({...err, city_err:false})
    }
  }

   if(e.target.name == 'area'){
    if(e.target.value == ""){
      setErr({...err, area_err:true})
    }else{
      setErr({...err, area_err:false})
    }
  }
  // if(e.target.name == 'zip_code'){
  //   if(e.target.value == "" ||  e.target.value.length !== 4){
  //     setErr({...err, zip_err:true})
  //   }else{
  //     setErr({...err, zip_err:false})
  //   }
  // }
  if(e.target.name == 'mobile_num'){
    if(e.target.value == "" || e.target.value.length !== 11){
      setErr({...err, mobile_num_err:true})
    }else{
      setErr({...err, mobile_num_err:false})
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
    dispatch(deleteAllCart())
    setSuccessMsg(true)
    setTimeout(()=>{
    router.push('/')
    },2000)
    
  }else{
    setOrderErr(true)
  }
 
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50">
      {!successMsg ? (
        <>
          {/* Header */}
          <div className="pt-24 md:pt-20 pb-8 bg-gradient-to-r from-violet-600/10 to-purple-600/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Secure Checkout
                </h1>
                <p className="text-gray-600 text-lg">
                  Complete your order in a few simple steps
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column - Forms */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Contact Information */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center mr-4">
                      <PersonIcon className="w-5 h-5 text-violet-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200"
                        value={customerInfo.email}
                        type="email"
                        placeholder="your.email@example.com"
                        name="email"
                        onChange={(e) => changeCustomerInfo(e)}
                        onBlur={(e) => validateField(e)}
                      />
                      {err.email_err && (
                        <p className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded-lg">
                          Please enter a valid email address
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200"
                          value={customerInfo.first_name}
                          type="text"
                          placeholder="First Name"
                          name="first_name"
                          onChange={(e) => changeCustomerInfo(e)}
                          onBlur={(e) => validateField(e)}
                        />
                        {err.first_name_err && (
                          <p className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded-lg">
                            First name should be more than 3 letters
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200"
                          value={customerInfo.last_name}
                          type="text"
                          placeholder="Last Name"
                          name="last_name"
                          onChange={(e) => changeCustomerInfo(e)}
                          onBlur={(e) => validateField(e)}
                        />
                        {err.last_name_err && (
                          <p className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded-lg">
                            Last name should be more than 3 letters
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center mr-4">
                      <LocationOnIcon className="w-5 h-5 text-violet-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Shipping Address</h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                      <input
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200"
                        value={customerInfo.shippingAddress}
                        type="text"
                        placeholder="123 Main Street, Apartment 4B"
                        name="shippingAddress"
                        onChange={(e) => changeCustomerInfo(e)}
                        onBlur={(e) => validateField(e)}
                      />
                      {err.shippingAddress_err && (
                        <p className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded-lg">
                          Address should be more than 5 letters
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                        <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200 bg-white">
                          <option value="Pakistan">Pakistan</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
                        <select
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200 bg-white"
                          name="province"
                          value={customerInfo.province}
                          onChange={(e) => changeCustomerInfo(e)}
                          onBlur={(e) => validateField(e)}
                        >
                          <option value="">Select Province</option>
                          <option value="sindh">Sindh</option>
                          <option value="Punjab">Punjab</option>
                          <option value="KPK">KPK</option>
                          <option value="balochistan">Balochistan</option>
                        </select>
                        {err.province_err && (
                          <p className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded-lg">
                            Please select a province
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <select
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200 bg-white"
                          name="city"
                          value={customerInfo.city}
                          onChange={(e) => changeCustomerInfo(e)}
                          onBlur={(e) => validateField(e)}
                        >
                          <option value="">Select City</option>
                          <option value="karachi">Karachi</option>
                          <option value="islamabad">Islamabad</option>
                          <option value="lahore">Lahore</option>
                          <option value="peshawar">Peshawar</option>
                          <option value="quetta">Quetta</option>
                        </select>
                        {err.city_err && (
                          <p className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded-lg">
                            Please select a city
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
                        <select
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200 bg-white"
                          name="area"
                          onChange={(e) => changeCustomerInfo(e)}
                          onBlur={(e) => validateField(e)}
                        >
                          <option value="">Select Area</option>
                          <option value="malir">Malir</option>
                          <option value="gulshan">Gulshan-e-Iqbal</option>
                          <option value="nazimabad">Nazimabad</option>
                          <option value="defence">Defence</option>
                          <option value="clifton">Clifton</option>
                          <option value="gulburg">Gulburg</option>
                          <option value="fbarea">F.B Area</option>
                        </select>
                        {err.area_err && (
                          <p className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded-lg">
                            Please select an area
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                        <input
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200"
                          type="number"
                          maxLength={5}
                          name="zip_code"
                          placeholder="75600"
                          onChange={(e) => changeCustomerInfo(e)}
                          onBlur={(e) => validateField(e)}
                        />
                        {err.zip_err && (
                          <p className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded-lg">
                            ZIP code required*
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                        <input
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-200"
                          type="number"
                          maxLength={11}
                          name="mobile_num"
                          placeholder="03001234567"
                          onChange={(e) => changeCustomerInfo(e)}
                          onBlur={(e) => validateField(e)}
                        />
                        {err.mobile_num_err && (
                          <p className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded-lg">
                            Mobile number should be 11 digits
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-gray-200">
                      <label className="flex items-center">
                        <input type="checkbox" className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500" />
                        <span className="ml-3 text-sm text-gray-700">Create account for faster checkout</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          checked={defaultAddress}
                          onChange={() => setDefaultAddress(!defaultAddress)}
                          type="checkbox"
                          className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">My billing and shipping address are the same</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center mr-4">
                      <PaymentIcon className="w-5 h-5 text-violet-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                      <input
                        checked={isPayment}
                        onChange={() => setIspayment(!isPayment)}
                        type="radio"
                        className="w-4 h-4 text-violet-600 border-gray-300 focus:ring-violet-500"
                      />
                      <div className="ml-4 flex items-center">
                        <LocalShippingIcon className="w-6 h-6 text-green-600 mr-3" />
                        <div>
                          <span className="text-gray-900 font-medium">Cash on Delivery</span>
                          <p className="text-sm text-gray-500">Pay when your order arrives</p>
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                      <input
                        checked={!isPayment}
                        onChange={() => setIspayment(!isPayment)}
                        type="radio"
                        className="w-4 h-4 text-violet-600 border-gray-300 focus:ring-violet-500"
                      />
                      <div className="ml-4 flex items-center">
                        <CreditCardIcon className="w-6 h-6 text-blue-600 mr-3" />
                        <div>
                          <span className="text-gray-900 font-medium">Credit/Debit Card</span>
                          <p className="text-sm text-gray-500">Secure payment with PayFast</p>
                        </div>
                      </div>
                    </label>

                    {!isPayment && (
                      <div className="mt-6 p-6 bg-gray-50 rounded-xl space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                            <input
                              type="text"
                              placeholder="123"
                              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                            />
                          </div>
                        </div>

                        <div className="flex items-center text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                          <LockIcon className="w-4 h-4 mr-2 text-blue-600" />
                          Your payment information is encrypted and secure
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="space-y-6">
                {/* Order Summary */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                  
                  {/* Cart Items Accordion */}
                  <Accordion 
                    defaultExpanded 
                    className="mb-6 !shadow-none !border !border-gray-200 !rounded-xl overflow-hidden"
                    sx={{
                      '& .MuiAccordionSummary-root': {
                        backgroundColor: '#7c3aed',
                        color: 'white',
                        minHeight: '56px',
                        '&.Mui-expanded': {
                          minHeight: '56px',
                        }
                      },
                      '& .MuiAccordionSummary-content': {
                        margin: '12px 0',
                        '&.Mui-expanded': {
                          margin: '12px 0',
                        }
                      },
                      '& .MuiAccordionSummary-expandIconWrapper': {
                        color: 'white',
                      }
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <span className="font-medium">
                        {cartItems} Item{cartItems > 1 ? 's' : ''} in Cart
                      </span>
                    </AccordionSummary>
                    <AccordionDetails className="p-4">
                      <div className="space-y-3">
                        {cartData && cartData.length > 0 && cartData.map((item: any, index: number) => {
                          const { name, qty, price } = item;
                          return (
                            <div key={index + 'item'} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{name}</p>
                                <p className="text-xs text-gray-500">Qty: {qty}</p>
                              </div>
                              <p className="text-sm font-medium text-gray-900">Rs.{price * qty}</p>
                            </div>
                          );
                        })}
                      </div>
                    </AccordionDetails>
                  </Accordion>

                  {/* Price Breakdown */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>Rs.{cartTotal()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>Rs.200</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-xl font-bold text-gray-900">
                        <span>Total</span>
                        <span>Rs.{cartTotal() + 200}</span>
                      </div>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <SecurityIcon className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-gray-600">SSL encrypted checkout</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <LocalShippingIcon className="w-4 h-4 text-blue-500 mr-2" />
                        <span className="text-gray-600">Free returns within 30 days</span>
                      </div>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <button
                    onClick={() => placeOrder()}
                    className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl mt-6"
                  >
                    Place Order
                  </button>

                  {orderErr && (
                    <p className="text-red-500 text-sm mt-4 bg-red-50 p-3 rounded-lg text-center">
                      Please fill in all required information correctly
                    </p>
                  )}

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    By placing your order, you agree to our terms and conditions. Land duty and taxes to be borne by customer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Success State */
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircleIcon className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-8">
              Thank you for your purchase. You will receive an email confirmation shortly.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8">
              <p className="text-green-800 font-medium">Your order is being processed</p>
              <p className="text-green-600 text-sm">Estimated delivery: 3-5 business days</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutLayout