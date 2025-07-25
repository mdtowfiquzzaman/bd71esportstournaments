import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className="flex items-center justify-between p-4 bg-[#202229] text-white">
            <div className="flex items-center">
                <Image src="/img/bd71.png" width={100} height={100} alt="BD71" className="h-10 w-10 mr-2" />
                <Link href="/">
                    <span className="text-xl font-bold">BD71 Esports Tournaments</span>
                </Link>
            </div>
            <nav className="space-x-4">
                <Link href="/" className="hover:underline">Home</Link>
                <Link href="/tournaments" className="hover:underline">Tournaments</Link>
                <Link href="/about" className="hover:underline">About Us</Link>
                <Link href="/contact" className="hover:underline">Contact</Link>
            </nav>
        </div>
    )
}

export default Header