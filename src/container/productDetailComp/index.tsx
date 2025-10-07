"use client"
import React, { useEffect, useState } from 'react'
import Loader from '@/component/loader/loader'
import { addCart,addItemQty } from '@/redux/slice/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import Rating from '@mui/material/Rating';
import ProductSlider from '@/component/swiper/swiper'
import { useRouter } from 'next/navigation'
import { showCartPopover } from '@/redux/slice/popoverSlice'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShareIcon from '@mui/icons-material/Share'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import SecurityIcon from '@mui/icons-material/Security'
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn'
import VerifiedIcon from '@mui/icons-material/Verified'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ZoomInIcon from '@mui/icons-material/ZoomIn'

type Props = {
  data: any
}

const ProductDetail = ({data}: Props) => {

  const [productData,setProductData] =useState([])
  const [loading, setLoading] = useState(false)
  const [selectedSize,setSelectedSize] = useState('')
  const [error, setError] =useState('')
  const [isFavorite, setIsFavorite] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isImageZoomed, setIsImageZoomed] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const dispatch = useDispatch()
  const selector = useSelector((item:any)=>item.cart)
  const products = useSelector((item:any)=>item.product.product)
  const router = useRouter()

  const getProducts = () =>{
    setProductData(products)
 }

  useEffect(()=>{
    getProducts()
  },[])

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const incrementQuantity = () => {
    if (quantity < 5) setQuantity(quantity + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const showSuccessAlert = (message: string) => {
    setAlertMessage(message)
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
  }
  
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
      dispatch(showCartPopover(true))
     
    }
    added = false
  }
    })
    if(added){
      dispatch(addCart(tempVal))
      showSuccessAlert(`${data.name} (Size: ${selectedSize.toUpperCase()}) added to cart successfully!`)
    } else {
      showSuccessAlert(`${data.name} quantity updated in cart!`)
    }

  }else{
    setError('Please Select Size First.')
  }
 
}

const shopNow =(value:any)=>{
if(selectedSize == ""){
  setError('Please Select Size First.')
}else{
  setLoading(true)
  add_Cart_item(value)
  router.push('/checkout')
  
}

}

const selectOption=(e: any)=>{
setSelectedSize(e.target.value)
setError('')
}

  return (
    <>
      {loading && <Loader />}
      
      {/* Success Alert */}
      {showAlert && (
        <div className="fixed top-24 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 transform transition-all duration-300 animate-pulse">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <ShoppingCartIcon className="w-4 h-4 text-green-500" />
          </div>
          <span className="font-medium">{alertMessage}</span>
          <button 
            onClick={() => setShowAlert(false)}
            className="ml-2 hover:bg-green-600 rounded-full p-1 transition-colors duration-200"
          >
            ✕
          </button>
        </div>
      )}
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50">
        {!loading && data && (
          <>
            {/* Breadcrumb */}
            <div className="pt-28 sm:pt-24 md:pt-20 pb-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="text-sm breadcrumbs">
                  <ol className="flex items-center space-x-2 text-gray-500">
                    <li><a href="/" className="hover:text-violet-600 transition-colors">Home</a></li>
                    <li><span className="mx-2">/</span></li>
                    <li><a href="/products" className="hover:text-violet-600 transition-colors">Products</a></li>
                    <li><span className="mx-2">/</span></li>
                    <li className="text-gray-800 font-medium">{data.category}</li>
                  </ol>
                </nav>
              </div>
            </div>

            {/* Main Product Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Product Images */}
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="relative group">
                    <div className={`relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl transition-all duration-500 ${
                      isImageZoomed ? 'transform scale-105' : ''
                    }`}>
                      <img 
                        src={`https://res.cloudinary.com/dpnza2tuy/image/upload/v1717048876/${data.url}`} 
                        alt={data.name}
                        className="w-full h-full object-cover"
                        onMouseEnter={() => setIsImageZoomed(true)}
                        onMouseLeave={() => setIsImageZoomed(false)}
                      />
                      
                      {/* Image Overlay Actions */}
                      <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-lg">
                          <ZoomInIcon className="w-6 h-6 text-gray-700" />
                        </button>
                        <button 
                          onClick={toggleFavorite}
                          className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-lg"
                        >
                          {isFavorite ? (
                            <FavoriteIcon className="w-6 h-6 text-red-500" />
                          ) : (
                            <FavoriteBorderIcon className="w-6 h-6 text-gray-700" />
                          )}
                        </button>
                        <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-lg">
                          <ShareIcon className="w-6 h-6 text-gray-700" />
                        </button>
                      </div>

                      {/* Sale Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                          <FlashOnIcon className="w-4 h-4 inline mr-1" />
                          25% OFF
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail Images */}
                  <div className="grid grid-cols-4 gap-4">
                    {[1,2,3,4].map((index) => (
                      <div 
                        key={index}
                        className={`aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                          activeImageIndex === index ? 'ring-2 ring-violet-500 shadow-lg' : 'hover:shadow-md'
                        }`}
                        onClick={() => setActiveImageIndex(index)}
                      >
                        <img 
                          src={`https://res.cloudinary.com/dpnza2tuy/image/upload/v1717048876/${data.url}`} 
                          alt={`${data.name} view ${index}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Information */}
                <div className="space-y-8">
                  {/* Product Header */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">
                        {data.category}
                      </span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        <VerifiedIcon className="w-4 h-4 inline mr-1" />
                        In Stock
                      </span>
                    </div>
                    
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                      {data.name}
                    </h1>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <Rating 
                        value={4.5} 
                        precision={0.5} 
                        readOnly 
                        size="large" 
                        className="[&_svg]:fill-yellow-400"
                      />
                      <span className="text-gray-600">(128 reviews)</span>
                    </div>

                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {data.description}
                    </p>

                    {/* Brand & SKU */}
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span><strong>Brand:</strong> {data.brand}</span>
                      <span><strong>SKU:</strong> {data.product_id}</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-100">
                    <div className="flex items-center flex-wrap gap-4">
                      <span className="text-4xl font-bold text-gray-900">
                        Rs.{data.price}
                      </span>
                      <span className="text-2xl text-gray-400 line-through">
                        Rs.{Math.round(Number(data.price) * 1.33)}
                      </span>
                      <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full font-bold">
                        Save 25%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Inclusive of all taxes • Free shipping above Rs.999
                    </p>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Size</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {data.sku?.map((size: string) => (
                        <button
                          key={size}
                          onClick={() => {setSelectedSize(size); setError('')}}
                          className={`h-12 rounded-xl border-2 font-medium uppercase transition-all duration-200 ${
                            selectedSize === size
                              ? 'border-violet-500 bg-violet-500 text-white shadow-lg'
                              : 'border-gray-200 hover:border-violet-300 hover:bg-violet-50'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quantity</h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border-2 border-gray-200 rounded-xl">
                        <button 
                          onClick={decrementQuantity}
                          className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                        >
                          -
                        </button>
                        <span className="w-16 text-center font-semibold">{quantity}</span>
                        <button 
                          onClick={incrementQuantity}
                          className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm text-gray-500">Maximum 5 items</span>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <p className="text-red-600 font-medium">{error}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <button
                      onClick={() => add_Cart_item(data)}
                      className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                    >
                      <ShoppingCartIcon className="w-6 h-6" />
                      <span>Add to Cart</span>
                    </button>
                    
                    <button
                      onClick={() => shopNow(data)}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                    >
                      <FlashOnIcon className="w-6 h-6" />
                      <span>Buy Now</span>
                    </button>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                    <div className="flex items-center space-x-3 text-sm">
                      <LocalShippingIcon className="w-8 h-8 text-green-500" />
                      <div>
                        <p className="font-medium text-gray-900">Free Shipping</p>
                        <p className="text-gray-500">On orders above Rs.999</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <AssignmentReturnIcon className="w-8 h-8 text-blue-500" />
                      <div>
                        <p className="font-medium text-gray-900">Easy Returns</p>
                        <p className="text-gray-500">30-day return policy</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <SecurityIcon className="w-8 h-8 text-purple-500" />
                      <div>
                        <p className="font-medium text-gray-900">Secure Payment</p>
                        <p className="text-gray-500">100% secure checkout</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
                  <div className="flex items-center justify-center flex-wrap gap-4">
                    <Rating 
                      value={4.5} 
                      precision={0.5} 
                      readOnly 
                      size="large" 
                      className="[&_svg]:fill-yellow-400"
                    />
                    <span className="text-2xl font-bold text-gray-900">4.5</span>
                    <span className="text-gray-600">Based on 128 reviews</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                You May Also Like
              </h2>
              <ProductSlider productData={productData} category={data.category} />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default ProductDetail