'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import StarIcon from '@mui/icons-material/Star'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import SecurityIcon from '@mui/icons-material/Security'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import VerifiedIcon from '@mui/icons-material/Verified'

type Props = {}

const HomeLayout = (props: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  const heroSlides = [
    {
      title: "Summer Collection 2025",
      subtitle: "Discover Your Style",
      description: "Explore our latest summer fashion collection with trendy designs and premium quality.",
      image: "https://res.cloudinary.com/dpnza2tuy/image/upload/v1717048876/fashion-hero-1.jpg",
      cta: "Shop Now",
      accent: "from-violet-600 to-purple-600"
    },
    {
      title: "Premium Quality",
      subtitle: "Fashion That Lasts",
      description: "Crafted with care and attention to detail. Quality you can see and feel.",
      image: "https://res.cloudinary.com/dpnza2tuy/image/upload/v1717048876/fashion-hero-2.jpg",
      cta: "Explore Quality",
      accent: "from-pink-500 to-rose-600"
    },
    {
      title: "New Arrivals",
      subtitle: "Stay Ahead of Trends",
      description: "Be the first to wear the latest fashion trends. Fresh styles added weekly.",
      image: "https://res.cloudinary.com/dpnza2tuy/image/upload/v1717048876/fashion-hero-3.jpg",
      cta: "View New",
      accent: "from-blue-500 to-indigo-600"
    }
  ]

  const categories = [
    { name: "Women's Fashion", icon: "👗", items: "1,200+ Items", color: "from-pink-400 to-rose-500" },
    { name: "Men's Style", icon: "👔", items: "800+ Items", color: "from-blue-400 to-indigo-500" },
    { name: "Accessories", icon: "👜", items: "500+ Items", color: "from-purple-400 to-violet-500" },
    { name: "Footwear", icon: "👠", items: "600+ Items", color: "from-emerald-400 to-teal-500" }
  ]

  const features = [
    {
      icon: <LocalShippingIcon className="w-8 h-8" />,
      title: "Free Shipping",
      description: "Free delivery on orders over $50",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: <SecurityIcon className="w-8 h-8" />,
      title: "Secure Payment",
      description: "100% secure payment methods",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <SupportAgentIcon className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round the clock customer service",
      color: "from-purple-400 to-violet-500"
    },
    {
      icon: <VerifiedIcon className="w-8 h-8" />,
      title: "Quality Guarantee",
      description: "Premium quality products only",
      color: "from-orange-400 to-red-500"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Ahmed",
      rating: 5,
      text: "Amazing quality and fast shipping! Love my new wardrobe pieces.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Yousuf Naeem",
      rating: 5,
      text: "Great customer service and trendy styles. Highly recommend!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Nimra Khan",
      rating: 5,
      text: "Perfect fit and beautiful designs. My go-to fashion store!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroSlides.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50">
      
      {/* Hero Section with Carousel */}
      <section className="relative pt-24 md:pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-purple-600/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            
            {/* Hero Content */}
            <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="space-y-4">
                <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${heroSlides[currentSlide].accent} text-white text-sm font-medium`}>
                  <FlashOnIcon className="w-4 h-4 mr-2" />
                  {heroSlides[currentSlide].subtitle}
                </div>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className={`bg-gradient-to-r ${heroSlides[currentSlide].accent} bg-clip-text text-transparent`}>
                    {heroSlides[currentSlide].title}
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  {heroSlides[currentSlide].description}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => router.push('/products')}
                  className={`group px-8 py-4 bg-gradient-to-r ${heroSlides[currentSlide].accent} text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center`}
                >
                  {heroSlides[currentSlide].cta}
                  <ArrowForwardIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button 
                  onClick={() => router.push('/about')}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-violet-500 hover:text-violet-600 transition-all duration-300"
                >
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">500K+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">10K+</div>
                  <div className="text-gray-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">99%</div>
                  <div className="text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/female-friends-out-shopping-together_53876-25041.jpg"
                    alt="Fashion Collection"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                  <span className="text-white font-bold">NEW</span>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center space-x-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-4 h-4" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">4.9/5 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-violet-600 w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Find exactly what you&apos;re looking for</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div 
                key={index}
                onClick={() => router.push('/products')}
                className="group cursor-pointer bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-violet-200 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{category.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.items}</p>
                <div className="flex items-center text-violet-600 font-medium group-hover:text-violet-700">
                  <span>Explore</span>
                  <ArrowForwardIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-violet-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose MB Fashion?</h2>
            <p className="text-xl text-gray-600">Experience shopping like never before</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Real reviews from real customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="w-4 h-4" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">&quot;{testimonial.text}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-violet-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Stay in Style</h2>
          <p className="text-xl text-violet-100 mb-8">
            Subscribe to our newsletter and be the first to know about new collections and exclusive offers
          </p>
          
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl border-0 focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <button className="bg-white text-violet-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              Subscribe
            </button>
          </div>
          
          <p className="text-violet-200 text-sm mt-4">
            No spam, unsubscribe anytime. Your privacy is important to us.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Wardrobe?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust MB Fashion for their style needs
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/products')}
              className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:from-violet-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Shopping
            </button>
            <button 
              onClick={() => router.push('/about')}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomeLayout