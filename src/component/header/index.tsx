'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';
import SearchBox from '../searcrch-box/search-box-index';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { getAuthToken } from '@/utils/cookies-function';

const Header = () => {
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const count = useSelector((item: any) => item.cart.cart)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const selector = useSelector(state => state)
  const token = getAuthToken()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  let total_item = 0
  const calc_cartItem = (num: Number) => {
    count.map((item: any) => total_item += item.qty)
    return total_item
  }
  calc_cartItem(total_item)
  
  useEffect(() => { setLoading(false) }, [])

  if (loading) {
    return (
      <div className="h-16 md:h-14 bg-gradient-to-r from-violet-700 to-purple-800 animate-pulse"></div>
    )
  }

  return (
    <>
      <header className={`fixed w-full z-[9999] top-0 transition-all duration-300 ${
        scrolled 
          ? 'bg-gradient-to-r from-violet-800/95 to-purple-900/95 backdrop-blur-lg shadow-2xl' 
          : 'bg-gradient-to-r from-violet-700 to-purple-800 shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-14">
            {/* Logo Section */}
            <Link href='/' className="flex-shrink-0 group">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="bg-gradient-to-br from-white to-gray-100 text-violet-700 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                    M&B
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                <div className="hidden sm:block">
                  <span className="font-bold text-xl bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent group-hover:from-gray-100 group-hover:to-white transition-all duration-300">
                    Fashion
                  </span>
                  <p className="text-xs text-violet-200 font-medium">Premium Store</p>
                </div>
              </div>
            </Link>

            {/* Navigation Menu - Desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-white/90 hover:text-white font-medium transition-all duration-200 hover:scale-105">
                Home
              </Link>
              <Link href="/products" className="text-white/90 hover:text-white font-medium transition-all duration-200 hover:scale-105">
                Products
              </Link>
              <Link href="/about" className="text-white/90 hover:text-white font-medium transition-all duration-200 hover:scale-105">
                About
              </Link>
            </nav>

            {/* Center Tagline */}
            <div className="hidden md:flex lg:hidden flex-1 justify-center">
              <div className="relative group">
                <p className="text-center font-semibold text-sm bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                  ✨ All Your Fashion Needs
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Mobile Tagline */}
            <div className="md:hidden flex-1 text-center">
              <p className="text-sm font-medium bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Fashion Store
              </p>
            </div>

            {/* Actions Section */}
            <div className="flex items-center space-x-2">
              {/* Search - Desktop */}
              <div className="hidden sm:block">
                <SearchBox />
              </div>

              {/* User Account - Desktop */}
              <Link href='/login'>
              <div className="hidden md:block">
                <button className="relative p-2 rounded-full hover:bg-white/10 transition-all duration-200 group">
                  <PersonIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              </div>
              </Link>

              {/* Wishlist - Desktop */}
              {token && <div className="hidden md:block">
                <button className="relative p-2 rounded-full hover:bg-white/10 transition-all duration-200 group">
                  <FavoriteIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              </div>}

              {/* Cart */}
              <Link href='/cart' className="group relative">
                <div className="relative p-2 rounded-full hover:bg-white/10 transition-all duration-200" aria-describedby={id} >
                  <ShoppingCartIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                  {total_item > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold min-w-[22px] h-6 flex items-center justify-center rounded-full px-1 shadow-lg animate-bounce">
                      {total_item > 99 ? '99+' : total_item}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  PaperProps={{
                    className: "mt-2 shadow-2xl border border-gray-200 rounded-xl overflow-hidden"
                  }}
                >
                  <div className="p-6 bg-gradient-to-br from-white to-gray-50">
                    <Typography className="text-gray-700 font-medium">
                      {total_item > 0 
                        ? `🛍️ You have ${total_item} item${total_item > 1 ? 's' : ''} in your cart` 
                        : '🛒 Your cart is empty'
                      }
                    </Typography>
                    {total_item > 0 && (
                      <button className="mt-3 w-full bg-gradient-to-r from-violet-600 to-purple-700 text-white px-4 py-2 rounded-lg font-medium hover:from-violet-700 hover:to-purple-800 transition-all duration-200">
                        View Cart
                      </button>
                    )}
                  </div>
                </Popover>
              </Link>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-white/10 transition-all duration-200 group"
              >
                {mobileMenuOpen ? (
                  <CloseIcon className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                ) : (
                  <MenuIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-gradient-to-b from-violet-800/95 to-purple-900/95 backdrop-blur-lg border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="sm:hidden">
                <SearchBox />
              </div>
              
              {/* Mobile Navigation */}
              <nav className="space-y-3">
                <Link 
                  href="/" 
                  className="block text-white/90 hover:text-white font-medium py-2 px-4 rounded-lg hover:bg-white/10 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🏠 Home
                </Link>
                <Link 
                  href="/products" 
                  className="block text-white/90 hover:text-white font-medium py-2 px-4 rounded-lg hover:bg-white/10 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  👕 Products
                </Link>
                <Link 
                  href="/about" 
                  className="block text-white/90 hover:text-white font-medium py-2 px-4 rounded-lg hover:bg-white/10 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ℹ️ About
                </Link>
              </nav>

              {/* Mobile Actions */}
              <div className="flex items-center justify-around pt-4 border-t border-white/10">
                <button className="flex flex-col items-center space-y-1 text-white/80 hover:text-white transition-colors duration-200">
                  <PersonIcon className="w-6 h-6" />
                  <span className="text-xs">Account</span>
                </button>
                <button className="flex flex-col items-center space-y-1 text-white/80 hover:text-white transition-colors duration-200">
                  <FavoriteIcon className="w-6 h-6" />
                  <span className="text-xs">Wishlist</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Tagline Bottom */}
        <div className="md:hidden bg-gradient-to-r from-white/5 to-gray-100/5 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <p className="text-center text-sm text-gray-200 font-medium">
              ✨ All Your Fashion Needs
            </p>
          </div>
        </div>
      </header>
      
      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

export default Header