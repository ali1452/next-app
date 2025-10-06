'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import PaginatedItems from '@/component/pagination/paginaton'
import { useAppDispatch } from '@/redux/hook/hook'
import { addproduct } from '@/redux/slice/productSlice'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import VisibilityIcon from '@mui/icons-material/Visibility'
import StarIcon from '@mui/icons-material/Star'

type IProps = {
  productData:any[]
}

const ProductsLayout = ({productData}:IProps) => {
  const [selectedPage, setSelectedPage] = useState(1)
  const [favorites, setFavorites] = useState<string[]>([])
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const dispatch = useAppDispatch()

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  useEffect(()=>{
    dispatch(addproduct(productData))
  },[])

  const currentProducts = productData.slice((selectedPage-1)*10,selectedPage*10)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50">
      {/* Hero Section */}
      <div className="relative pt-24 md:pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Fashion Collection
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Discover the latest trends and timeless classics in our curated fashion collection
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full font-medium">
                {productData.length} Products
              </span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                Premium Quality
              </span>
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full font-medium">
                Free Shipping
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        { productData && productData.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {currentProducts.map((item, i) => {
                const {url, name, price, sku, product_id} = item
                const isHovered = hoveredProduct === product_id
                const isFavorite = favorites.includes(product_id)
                
                return(
                  <div 
                    key={"product" + i} 
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                    onMouseEnter={() => setHoveredProduct(product_id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    {/* Product Image Container */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <Link href={`/products/${product_id}`}>
                        <img 
                          src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}${url}`} 
                          alt={name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </Link>
                      
                      {/* Overlay Actions */}
                      <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <div className="absolute top-4 right-4 space-y-2">
                          <button
                            onClick={() => toggleFavorite(product_id)}
                            className="w-10 h-10 mb-1 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-lg"
                          >
                            {isFavorite ? (
                              <FavoriteIcon className="w-5 h-5 text-red-500" />
                            ) : (
                              <FavoriteBorderIcon className="w-5 h-5 text-gray-600" />
                            )}
                          </button>
                          <Link href={`/products/${product_id}`}>
                            <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-lg">
                              <VisibilityIcon className="w-5 h-5 text-gray-600" />
                            </button>
                          </Link>
                        </div>
                        
                        {/* Quick Add to Cart */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <button className="w-full bg-white/90 backdrop-blur-sm text-gray-800 py-3 rounded-xl font-medium hover:bg-white transition-all duration-200 shadow-lg flex items-center justify-center space-x-2">
                            <ShoppingCartIcon className="w-5 h-5" />
                            <span>Quick Add</span>
                          </button>
                        </div>
                      </div>
                      
                      {/* Sale Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          SALE
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <Link href={`/products/${product_id}`}>
                        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 hover:text-violet-600 transition-colors duration-200">
                          {name}
                        </h3>
                      </Link>
                      
                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-3">
                        {[1,2,3,4,5].map((star) => (
                          <StarIcon key={star} className="w-4 h-4 text-yellow-400" />
                        ))}
                        <span className="text-sm text-gray-500 ml-2">(4.8)</span>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-2xl font-bold text-gray-800">
                          Rs.{price}
                        </span>
                        <span className="text-lg text-gray-400 line-through">
                          Rs.{Math.round(Number(price) * 1.3)}
                        </span>
                        <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                          23% OFF
                        </span>
                      </div>
                      
                      {/* Sizes */}
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 font-medium">Sizes:</span>
                        <div className="flex space-x-1">
                          {sku?.map((size: any, index: number) => (
                            <span 
                              key={index+1} 
                              className="w-8 h-8 bg-gray-100 hover:bg-violet-100 hover:text-violet-700 rounded-lg flex items-center justify-center text-sm font-medium uppercase transition-all duration-200 cursor-pointer"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Pagination */}
            {productData.length > 10 && (
              <div className="mt-16 flex justify-center">
                <PaginatedItems 
                  itemsPerPage={10} 
                  items={productData}  
                  setSelectedPage={(val:number)=> setSelectedPage(val)} 
                />
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <ShoppingCartIcon className="w-16 h-16 text-violet-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">No Products Available</h2>
              <p className="text-gray-600 mb-8">
                We&apos;re currently updating our inventory. Please check back soon for amazing deals!
              </p>
              <Link href="/">
                <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-violet-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsLayout