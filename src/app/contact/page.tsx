import Header from '@/components/Header'
import React from 'react'
import { FaFacebookF, FaYoutube, FaInstagram, FaDiscord } from 'react-icons/fa'

const Contact = () => {
  return (
    <div className="bg-[#18191D] text-white min-h-screen">
      <Header />
      <div className='container mx-auto min-h-[90vh] flex items-center justify-center p-4'>
        <div className="flex gap-6 text-3xl">
          <a href="https://www.facebook.com/pubgpccommunitybangladesh" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors duration-300">
            <FaFacebookF />
          </a>
          {/* <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors duration-300">
            <FaYoutube />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors duration-300">
            <FaInstagram />
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors duration-300">
            <FaDiscord />
          </a> */}
        </div>
      </div>
    </div>
  )
}

export default Contact
