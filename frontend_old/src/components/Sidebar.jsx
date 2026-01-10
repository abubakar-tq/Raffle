'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Info, Settings } from 'lucide-react'

const Sidebar = () => {
  const pathname = usePathname()

  const isActive = (path) => pathname === path

  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <Link href="/" className={isActive('/') ? 'active' : ''}>
            <Home size={18} />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link href="/about" className={isActive('/about') ? 'active' : ''}>
            <Info size={18} />
            <span>About</span>
          </Link>
        </li>
        <li>
          <Link href="/admin" className={isActive('/admin') ? 'active' : ''}>
            <Settings size={18} />
            <span>Admin Panel</span>
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar
