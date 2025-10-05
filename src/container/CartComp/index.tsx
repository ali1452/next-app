'use client'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SecurityIcon from '@mui/icons-material/Security';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DeleteModal from './deleteModal/deleteModal';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, deleteAllCart,cartItemAdded, addItemQty } from '@/redux/slice/cartSlice';
import Loader from '@/component/loader/loader';


type Props = {}
type cartDataType ={
  name: string;
    price: string; 
    category: string; 
    brand: string; 
    description: string; 
    url: string; 
    discount_price: string; 
    sku: string; 
    size: string;
    qty: number;
    edit:boolean;
    product_id:string
  
}

const CartComp = (props: Props) => {
  const [product,setProduct] = useState<cartDataType[] | null>(null)
  const [discountCode, setDiscountCode] = useState<string>('')
  const [applyCode, setApplyCode] = useState<boolean>(false)
  const [codeAmt, setCodeAmt] = useState<number>(0)
  const [errMsg, setErrMsg] = useState('')
  const [modal,setModal] = useState<boolean>(false)
  const [loading, setLoading] =useState<boolean>(true)
  const route = useRouter()

  const dispatch=useDispatch()
  const cart:any = useSelector(item=>item)
  const cartData = cart.cart.cart

  const fetchCartData=()=>{
    setProduct(cartData)
    setLoading(false)
  }
  
  
    useEffect(()=>{
      fetchCartData()
    },[])

   
    const changeQty=(e: number, index:number)=>{
      if(product !== null){
        const temp_element = JSON.parse(JSON.stringify(product))
      let str  = e.toString()
      if((str).toString().length >1){
        const select_qty = +str.charAt(1)
        if(select_qty > 0 && select_qty  <= 5){
          temp_element[index].qty = select_qty
          setProduct(temp_element)
          dispatch(cartItemAdded(temp_element))
        }
        }else{
          if(e >0 && e <= 5 ){
            temp_element[index].qty = +e
            setProduct(temp_element)
            dispatch(cartItemAdded(temp_element))
          }
      }
      }
      
    }

    const subTotalAmt = ()=>{
      let amount = 0
      if(product !== null){
        product.forEach((item:any)=>amount += +item.price*item.qty)
        return  amount
      }else{
        return 0
      }
    }

    const applyDiscount=()=>{
      if(discountCode === "welcome"){
        setApplyCode(true)
        setCodeAmt(200)
      }else{
        setErrMsg('This code is invalid!')
        setTimeout(()=>{
          setErrMsg('')
        },2000)
      }

    }
    const editItems =(index:number)=>{
      if(product !== null){
        const  tempData = JSON.parse(JSON.stringify(product))
        tempData[index].edit = true
        setProduct(tempData)
      }
    }

    const saveItems =(index:number)=>{
      if(product !== null){
        const  tempData = JSON.parse(JSON.stringify(product))
        tempData[index].edit = false
        setProduct(tempData)
      }
    }

    const changeSkuSize =(e: React.ChangeEvent<HTMLSelectElement>,index:number)=>{
      if(product !== null){
        let addedItem  = true
        const optedSize = e.target.value
        const temp_product = [...product]
        temp_product.filter((item,i)=>{
          if((item.product_id == temp_product[index].product_id) && (item.size == optedSize)){
            addedItem = false
            temp_product.splice(index,1)
            item.qty += 1 
          }
        })
        if(!addedItem){
          setProduct(temp_product)
          dispatch(cartItemAdded(temp_product))
        }else{
          temp_product[index].size = optedSize
          setProduct(temp_product)
        }
        
      }
    }

    const chekout =()=>{
      setLoading(true)
      route.push('/checkout')
    }

    const deleteCartItem = (index: number) => {
      if(product !== null) {
        const tempProduct = [...product]
        tempProduct.splice(index, 1)
        setProduct(tempProduct)
        dispatch(cartItemAdded(tempProduct))
      }
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50">
      {loading && <Loader />}
      
      {!loading && (
        <>
          {/* Hero Section */}
          <div className="pt-24 md:pt-20 pb-8 bg-gradient-to-r from-violet-600/10 to-purple-600/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-5">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Shopping Cart
                </h1>
                <p className="text-gray-600 text-lg">
                  {product && product.length > 0 
                    ? `${product.length} item${product.length > 1 ? 's' : ''} in your cart`
                    : 'Your cart is waiting for some amazing finds'
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            {product && product.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Cart Items Section */}
                <div className="lg:col-span-2 space-y-6">
                  {product.map((item, index) => (
                    <div key={index + 1} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-col sm:flex-row gap-6">
                          
                          {/* Product Image */}
                          <div className="relative group">
                            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                              <Image 
                                src={`https://res.cloudinary.com/dpnza2tuy/image/upload/v1717048876/${item.url}`} 
                                alt={item.name}
                                width={160}
                                height={160}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            
                            {/* Quick Actions */}
                            <div className="absolute top-2 right-2 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200 shadow-lg">
                                <FavoriteIcon className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 space-y-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span><strong>Brand:</strong> {item.brand}</span>
                                <span><strong>Category:</strong> {item.category}</span>
                              </div>
                            </div>

                            {/* Size & Quantity Controls */}
                            <div className="flex flex-col sm:flex-row gap-4">
                              {/* Size Selection */}
                              <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                                {!item.edit ? (
                                  <div className="flex items-center space-x-2">
                                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg font-medium uppercase">
                                      {item.size}
                                    </span>
                                    <button 
                                      onClick={() => editItems(index)}
                                      className="text-violet-600 hover:text-violet-700 text-sm font-medium"
                                    >
                                      Change
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex items-center space-x-2">
                                    <select 
                                      value={item.size} 
                                      onChange={(e) => changeSkuSize(e, index)}
                                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                                    >
                                      <option value="s">S</option>
                                      <option value="m">M</option>
                                      <option value="l">L</option>
                                    </select>
                                    <button 
                                      onClick={() => saveItems(index)}
                                      className="bg-violet-600 text-white px-3 py-2 rounded-lg hover:bg-violet-700 transition-colors duration-200 text-sm"
                                    >
                                      Save
                                    </button>
                                  </div>
                                )}
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                                {!item.edit ? (
                                  <div className="flex items-center space-x-2">
                                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg font-medium">
                                      {item.qty}
                                    </span>
                                    <button 
                                      onClick={() => editItems(index)}
                                      className="text-violet-600 hover:text-violet-700 text-sm font-medium"
                                    >
                                      Edit
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex items-center space-x-2">
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                      <button 
                                        onClick={() => changeQty(Math.max(1, item.qty - 1), index)}
                                        className="p-2 hover:bg-gray-100 transition-colors duration-200"
                                      >
                                        <RemoveIcon className="w-4 h-4" />
                                      </button>
                                      <input 
                                        type="number" 
                                        value={item.qty} 
                                        onChange={(e) => changeQty(+e.target.value, index)}
                                        className="w-16 text-center border-0 focus:outline-none"
                                        min="1"
                                        max="5"
                                      />
                                      <button 
                                        onClick={() => changeQty(Math.min(5, item.qty + 1), index)}
                                        className="p-2 hover:bg-gray-100 transition-colors duration-200"
                                      >
                                        <AddIcon className="w-4 h-4" />
                                      </button>
                                    </div>
                                    <button 
                                      onClick={() => saveItems(index)}
                                      className="bg-violet-600 text-white px-3 py-2 rounded-lg hover:bg-violet-700 transition-colors duration-200 text-sm"
                                    >
                                      Save
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Price & Actions */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                              <div className="space-y-1">
                                <p className="text-2xl font-bold text-gray-900">Rs.{+item.price * item.qty}</p>
                                <p className="text-sm text-gray-500">Rs.{item.price} each</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                                  <ShareIcon className="w-5 h-5" />
                                </button>
                                <button 
                                  onClick={() => deleteCartItem(index)}
                                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                  title="Remove item"
                                >
                                  <DeleteIcon className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Cart Actions */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => route.push('/')}
                        className="flex-1 bg-gray-100 text-gray-800 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <ShoppingBagIcon className="w-5 h-5" />
                        <span>Continue Shopping</span>
                      </button>
                      <button 
                        onClick={() => setModal(true)}
                        className="flex-1 bg-red-50 text-red-600 py-3 px-6 rounded-xl font-medium hover:bg-red-100 transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <DeleteIcon className="w-5 h-5" />
                        <span>Clear Cart</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Summary Section */}
                <div className="space-y-6">
                  {/* Discount Code */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <LocalOfferIcon className="w-5 h-5 mr-2 text-violet-600" />
                      Promo Code
                    </h3>
                    <div className="space-y-4">
                      <div className="flex space-x-2">
                        <input
                          disabled={applyCode}
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value.trim().toLowerCase())}
                          type="text"
                          placeholder="Enter promo code"
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 disabled:bg-gray-100"
                        />
                        <button
                          disabled={applyCode}
                          onClick={applyDiscount}
                          className="bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Apply
                        </button>
                      </div>
                      {errMsg && (
                        <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{errMsg}</p>
                      )}
                      {applyCode && (
                        <p className="text-green-600 text-sm bg-green-50 p-3 rounded-lg flex items-center">
                          <LocalOfferIcon className="w-4 h-4 mr-2" />
                          Promo code applied successfully!
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>Rs.{subTotalAmt()}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span>Rs.100</span>
                      </div>
                      {applyCode && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount (welcome)</span>
                          <span>-Rs.{codeAmt}</span>
                        </div>
                      )}
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between text-xl font-bold text-gray-900">
                          <span>Total</span>
                          <span>Rs.{subTotalAmt() !== 0 ? subTotalAmt() - codeAmt + 100 : 0}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={chekout}
                      className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl mt-6"
                    >
                      Proceed to Checkout
                    </button>
                  </div>

                  {/* Trust Badges */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Why Shop With Us?</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-sm">
                        <LocalShippingIcon className="w-5 h-5 text-green-500" />
                        <span className="text-gray-600">Free shipping on orders over Rs.999</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <SecurityIcon className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-600">Secure payment & data protection</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <LocalOfferIcon className="w-5 h-5 text-purple-500" />
                        <span className="text-gray-600">Easy 30-day returns</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Empty Cart State */
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="w-32 h-32 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <ShoppingBagIcon className="w-16 h-16 text-violet-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
                  <p className="text-gray-600 mb-8">
                    Looks like you haven&apos;t added anything to your cart yet. Start shopping to fill it up!
                  </p>
                  <button
                    onClick={() => route.push('/')}
                    className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:from-violet-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            )}
          </div>

          <DeleteModal 
            modal={modal} 
            setModal={(modal: boolean) => setModal(modal)} 
            setProduct={(item: any) => setProduct(item)} 
          />
        </>
      )}
    </div>
  )
}

export default CartComp