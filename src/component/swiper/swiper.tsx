import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/css';
import Link from 'next/link';
import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';

type Iprops= {
  productData:any[],
  category:string
}

const ProductSlider = ({productData, category}:Iprops) => {
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <div className="relative max-w-7xl mx-auto px-4">
      {/* Custom Navigation Buttons */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Related Products</h3>
          <p className="text-gray-600">Discover more amazing items</p>
        </div>
        <div className="flex space-x-2">
          <button className="swiper-button-prev-custom w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border border-gray-200 hover:border-violet-300 hover:bg-violet-50">
            <ArrowBackIcon className="w-5 h-5 text-gray-600" />
          </button>
          <button className="swiper-button-next-custom w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border border-gray-200 hover:border-violet-300 hover:bg-violet-50">
            <ArrowForwardIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <Swiper
        pagination={false}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }} 
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={'auto'}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        loop={true}
        className="!overflow-visible"
        breakpoints={{
          1: {
            slidesPerView: 1.2,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
      >
      {productData && productData.length > 0 && productData.map((item, index) => {
        const { url, name, price, sku, brand, product_id } = item
        if (category === item.category) {
          return (
            <SwiperSlide key={index + 1} className="!h-auto">
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-violet-200 hover:-translate-y-2">
                
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <Link href={`/products/${product_id}`}>
                    <Image
                      src={`https://res.cloudinary.com/dpnza2tuy/image/upload/v1717048876/${url}`}
                      alt={name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                      style={{ objectFit: 'cover' }}
                    />
                  </Link>
                  
                  {/* Overlay Actions */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={() => toggleFavorite(product_id)}
                      className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-lg mb-2"
                    >
                      {favorites.includes(product_id) ? (
                        <FavoriteIcon className="w-5 h-5 text-red-500" />
                      ) : (
                        <FavoriteBorderIcon className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  </div>

                  {/* Sale Badge */}
                  <div className="absolute top-3 left-3">
                    <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      25% OFF
                    </div>
                  </div>

                  {/* Quick Add to Cart */}
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:from-violet-700 hover:to-purple-700 transition-all duration-200 shadow-lg flex items-center justify-center space-x-2">
                      <ShoppingCartIcon className="w-4 h-4" />
                      <span>Quick Add</span>
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <Link href={`/products/${product_id}`}>
                    <div>
                      {/* Brand */}
                      <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                        {brand}
                      </p>
                      
                      {/* Product Name */}
                      <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-violet-600 transition-colors duration-200">
                        {name}
                      </h3>
                    </div>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-4 h-4" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(4.5)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-gray-900">
                          Rs.{price}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          Rs.{Math.round(Number(price) * 1.33)}
                        </span>
                      </div>
                      <p className="text-xs text-green-600 font-medium">
                        Free shipping
                      </p>
                    </div>
                    
                    {/* Sizes Available */}
                    <div className="flex space-x-1">
                      {sku?.slice(0, 3).map((size: string, idx: number) => (
                        <span 
                          key={idx}
                          className="w-6 h-6 bg-gray-100 text-gray-600 text-xs rounded flex items-center justify-center uppercase font-medium"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        }
      })}
    </Swiper>
    </div>
  );
};

export default ProductSlider;