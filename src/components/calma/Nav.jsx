import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { X, Menu } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'features', to: '/features' },
  { label: 'how it works', to: '/how-it-works' },
  { label: 'pricing', to: '/pricing' },
  { label: 'reviews', to: '/testimonials' },
  { label: 'faq', to: '/faq' },
  { label: 'ecosystem', to: '/ecosystem' },
  { label: 'contact', to: '/contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b"
        style={{ background: 'rgba(236,230,216,0.92)', borderColor: '#D9C4B1' }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-12 flex items-center justify-between">
          <Link
            to="/"
            className="text-sm font-bold tracking-tight"
            style={{ color: '#372713' }}
            onClick={() => setOpen(false)}
          >
            calma
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                className="text-xs transition-colors duration-200"
                style={({ isActive }) => ({
                  color: isActive ? '#7D2027' : '#4D4828',
                  fontWeight: isActive ? '600' : '400',
                })}
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Hamburger */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-8 h-8"
            style={{ color: '#372713' }}
            onClick={() => setOpen(o => !o)}
            aria-label="toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-12 inset-x-0 z-40 border-b"
            style={{ background: 'rgba(236,230,216,0.98)', borderColor: '#D9C4B1' }}
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm border-b last:border-0 transition-colors duration-200"
                  style={({ isActive }) => ({
                    color: isActive ? '#7D2027' : '#4D4828',
                    fontWeight: isActive ? '600' : '400',
                    borderColor: '#D9C4B122',
                  })}
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
