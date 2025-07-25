import React from 'react'

const Header = () => {
    return (
        <div className="flex items-center justify-between p-4 bg-[#202229] text-white">
            <div className="flex items-center">
                <img src="/img/bd71.png" alt="BD71" className="h-10 w-10 mr-2" />
                <a href="/">
                    <span className="text-xl font-bold">BD71 Esports Tournaments</span>
                </a>
            </div>
            <nav className="space-x-4">
                <a href="/" className="hover:underline">Home</a>
                <a href="/tournaments" className="hover:underline">Tournaments</a>
                <a href="/about" className="hover:underline">About Us</a>
                <a href="/contact" className="hover:underline">Contact</a>
            </nav>
        </div>
    )
}

export default Header