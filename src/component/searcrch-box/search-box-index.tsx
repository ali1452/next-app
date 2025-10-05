"use client"

import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hook/hook';
import Gconfig  from "@/globalConfig"

type Props = {}

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const imag_url = Gconfig.image_url

const SearchBox = (props: Props) => {
  const productState = useAppSelector(item=>item.product.product)
    const [product,setProduct] = useState<any[]>([])
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });

      const [search, setSearch] =useState('')
      const [selectedProduct,setSelectedProduct] = useState<any[]>([])
      const [isLoading,setIsloading] = useState(true)

      const fetchProduct = ()=>{
        setProduct(productState)
        setIsloading(false)
      }

      useEffect(()=>{
        fetchProduct()
      },[])

      const toggleDrawer = (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        setSearch('')
        setSelectedProduct([])
        setState({ ...state, [anchor]: open });
      };

      const searchProduct =(e: React.ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value)
        const key_words = (e.target.value).toLowerCase()
        if(key_words !==""){
          const  selectedItems = product.filter((item:any)=>{
            if(item.name.toLowerCase().includes(key_words)){
              return item
  
            }
          })
          setSelectedProduct(selectedItems)
  
        }else{
          setSelectedProduct([])
        }
        
      }

      const trendingSearches = ['Fashion', 'Shoes', 'Bags', 'Accessories', 'Sale Items'];
  
    const list = (anchor: Anchor) => (
      <div className="h-full bg-gradient-to-br from-gray-50 to-white">
        {/* Header */}
        <div className="bg-white shadow-lg p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Search Products
            </h2>
            <button
              onClick={toggleDrawer(anchor, false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <CloseIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>
          
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              placeholder="Search for products, brands, categories..."
              value={search}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-lg bg-gray-50 transition-all duration-200"
              type="text"
              onChange={(e) => searchProduct(e)}
            />
          </div>
        </div>

        <div className="p-6">
          {/* Results Header */}
          {selectedProduct.length > 0 ? (
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Search Results ({selectedProduct.length} items)
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                  <span>Found {selectedProduct.length} product{selectedProduct.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          ) : search ? (
            <div className="text-center py-12">
              <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try searching with different keywords</p>
            </div>
          ) : (
            /* Trending Searches */
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUpIcon className="w-5 h-5 mr-2 text-violet-600" />
                  Trending Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((trend, index) => (
                    <button
                      key={index}
                      onClick={() => setSearch(trend)}
                      className="px-4 py-2 bg-violet-100 text-violet-700 rounded-full hover:bg-violet-200 transition-colors duration-200 text-sm font-medium"
                    >
                      {trend}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-6">
                <div className="flex items-center mb-3">
                  <LocalOfferIcon className="w-5 h-5 mr-2 text-violet-600" />
                  <h4 className="font-semibold text-gray-900">Special Offers</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Discover amazing deals on your favorite products. Search now to find exclusive discounts!
                </p>
              </div>
            </div>
          )}

          {/* Search Results Grid */}
          {selectedProduct.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedProduct.map((item: any, index: number) => (
                <Link
                  key={index + "search"}
                  href={`/products/${item.product_id}`}
                  onClick={() => setState({ ...state, top: false })}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-105">
                    <div className="relative aspect-square bg-gray-100">
                      <Image
                        src={imag_url + item.url}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                          <SearchIcon className="w-6 h-6 text-violet-600" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 group-hover:text-violet-600 transition-colors duration-200 line-clamp-2">
                        {item.name}
                      </h4>
                      
                      {item.price && (
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-lg font-bold text-violet-600">
                            Rs.{item.price}
                          </span>
                          {item.discount_price && (
                            <span className="text-sm text-gray-500 line-through">
                              Rs.{item.discount_price}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {item.category && (
                        <div className="mt-2">
                          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                            {item.category}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    );

    if(isLoading){
      return null
    }
  
  return (
<div className="">

          {(['top'] as const).map((anchor) => (
            
        <React.Fragment key={anchor}>
          <Button 
            className="[&_svg]:text-white hover:bg-white/10 rounded-full p-2 transition-colors duration-200" 
            onClick={toggleDrawer(anchor, !state.top)}
          >
            <SearchIcon className="w-6 h-6" />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            PaperProps={{
              sx: {
                width: '100%',
                maxWidth: '100vw',
                height: '100vh',
              }
            }}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}

export default SearchBox