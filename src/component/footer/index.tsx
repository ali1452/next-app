import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-violet-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-4">
                M&B Fashion
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Your trusted destination for premium fashion. Discover the latest trends and timeless classics that define your unique style.
              </p>
            </div>
            
            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center hover:bg-violet-500 transition-colors duration-200 group">
                  <FacebookIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </a>
                <a href="#" className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center hover:bg-violet-500 transition-colors duration-200 group">
                  <TwitterIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </a>
                <a href="#" className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center hover:bg-violet-500 transition-colors duration-200 group">
                  <InstagramIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </a>
                <a href="#" className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center hover:bg-violet-500 transition-colors duration-200 group">
                  <YouTubeIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-3">
              {['Home', 'Shop', 'About Us', 'Contact', 'Blog', 'Sale'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-gray-300 hover:text-violet-400 transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Categories</h4>
            <div className="space-y-3">
              {['Men\'s Fashion', 'Women\'s Fashion', 'Accessories', 'Shoes', 'Bags', 'Electronics'].map((category) => (
                <a
                  key={category}
                  href="#"
                  className="block text-gray-300 hover:text-violet-400 transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {category}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Get In Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <LocationOnIcon className="w-5 h-5 text-violet-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">123 Fashion Street</p>
                  <p className="text-gray-300">Karachi, Pakistan</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <PhoneIcon className="w-5 h-5 text-violet-400 flex-shrink-0" />
                <a href="tel:+923001234567" className="text-gray-300 hover:text-violet-400 transition-colors duration-200">
                  +92 300 1234567
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <EmailIcon className="w-5 h-5 text-violet-400 flex-shrink-0" />
                <a href="mailto:info@fashionhub.com" className="text-gray-300 hover:text-violet-400 transition-colors duration-200">
                  info@fashionhub.com
                </a>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-8">
              <h5 className="text-md font-semibold mb-3">Newsletter</h5>
              <div className="flex flex-wrap gap-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-l-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                />
                <button className="bg-violet-600 hover:bg-violet-500 flex-1 px-4 py-2 rounded-r-lg transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-6">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-sm">
                © 2025 FashionHub. All rights reserved.
              </p>
              <div className="flex items-center space-x-1 text-gray-400 text-sm">
                <span>Made with</span>
                <FavoriteIcon className="w-4 h-4 text-red-500" />
                <span>by Your Team</span>
              </div>
            </div>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-violet-400 text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-violet-400 text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-violet-400 text-sm transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-900/50 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center items-center space-x-8 text-gray-400 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Easy Returns</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer