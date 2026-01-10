"use client"
import Link from 'next/link.js';
import ConnectWallet from "./ConnectWallet.jsx"

const Navbar = ({ }) => {
 

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link href="/">
          <h1>CryptoRaffleDApp</h1>
        </Link>
      </div>
      <ConnectWallet></ConnectWallet>
    </nav>
  )
}

export default Navbar
