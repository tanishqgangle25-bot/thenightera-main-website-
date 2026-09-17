import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

const links = [
  { label: 'work',         to: '/work' },
  { label: 'portfolio',    to: '/portfolio' },
  { label: 'services',     to: '/services' },
  { label: 'calma',        to: '/calma' },
  { label: 'testimonials', to: '/testimonials' },
  { label: 'faq',          to: '/faq' },
  { label: 'pricing',      to: '/pricing' },
  { label: 'contact',      to: '/contact' },
]

/* ─── Animated NavLink with underline slide ─── */
function AnimNav({ to, label, isDark = false }) {
  const lineRef = useRef(null)

  const onEnter = () => {
    if (lineRef.current) gsap.to(lineRef.current, { scaleX: 1, duration: 0.28, ease: 'power3.out' })
  }
  const onLeave = () => {
    if (lineRef.current) gsap.to(lineRef.current, { scaleX: 0, duration: 0.22, ease: 'power3.in' })
  }

  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        position: 'relative',
        fontSize: '0.8125rem',
        textDecoration: 'none',
        color: isActive
          ? (isDark ? '#ECE6D8' : '#7D2027')
          : (isDark ? 'rgba(236,230,216,0.65)' : '#4D4828'),
        fontWeight: isActive ? 600 : 400,
        whiteSpace: 'nowrap',
        paddingBottom: '2px',
        transition: 'color 0.3s',
      })}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {({ isActive }) => (
        <>
          {label}
          {!isActive && (
            <span
              ref={lineRef}
              style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: '1px',
                background: isDark ? 'rgba(236,230,216,0.65)' : '#4D4828',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
              }}
            />
          )}
        </>
      )}
    </NavLink>
  )
}

export default function Layout({ children }) {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 868)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const navRef = useRef(null)

  /* resize */
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 868)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* route change → close mobile + scroll top */
  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  /* scroll shadow on nav */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* nav entrance animation */
  useEffect(() => {
    if (!navRef.current) return
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 }
    )
  }, [])

  return (
    <>
      {/* ─── Nav ─── */}
      <nav
        ref={navRef}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          background: 'rgba(250,247,242,0.92)',
          borderBottom: scrolled ? '1px solid #E8DDD0' : '1px solid transparent',
          transition: 'box-shadow 0.3s ease, border-color 0.4s ease',
          boxShadow: scrolled ? '0 2px 24px rgba(29,29,31,0.06)' : 'none',
        }}
      >
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          padding: '0 2.5rem', height: '52px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '1.5rem',
        }}>

          {/* Logo */}
          <Link to="/" style={{
            color: '#372713', fontWeight: 700, fontSize: '0.9375rem',
            letterSpacing: '-0.02em', textDecoration: 'none', flexShrink: 0,
          }}>
            thenightera
          </Link>

          {/* Desktop links */}
          {!isMobile && (
            <div style={{
              display: 'flex', alignItems: 'center',
              gap: '1.75rem', flex: 1, justifyContent: 'center',
            }}>
              {links.map(l => (
                <AnimNav key={l.label} to={l.to} label={l.label} isDark={false} />
              ))}
            </div>
          )}

          {/* Desktop CTA */}
          {!isMobile && (
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/contact" style={{
                background: '#1d1d1f', color: '#FAF7F2',
                fontSize: '0.75rem', fontWeight: 600,
                padding: '0.45rem 1.15rem', borderRadius: '999px',
                textDecoration: 'none', flexShrink: 0,
                display: 'inline-block',
              }}>
                book now
              </Link>
            </motion.div>
          )}

          {/* Hamburger */}
          {isMobile && (
            <button type="button" onClick={() => setOpen(o => !o)} style={{
              color: '#372713', background: 'none', border: 'none',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              padding: '0.25rem', flexShrink: 0,
            }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate:  90,  opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {open ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          )}
        </div>
      </nav>

      {/* ─── Mobile drawer ─── */}
      <AnimatePresence>
        {open && isMobile && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{   opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', top: '52px', left: 0, right: 0, zIndex: 40,
              background: 'rgba(236,230,216,0.98)',
              borderBottom: '1px solid #D9C4B1',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '0.5rem 2.5rem 1.25rem' }}>
              {links.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3, ease: 'easeOut' }}
                >
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    style={({ isActive }) => ({
                      display: 'block', padding: '0.75rem 0',
                      fontSize: '0.9375rem', textDecoration: 'none',
                      borderBottom: '1px solid rgba(217,196,177,0.4)',
                      color: isActive ? '#7D2027' : '#4D4828',
                      fontWeight: isActive ? 600 : 400,
                    })}
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.05 + 0.05, duration: 0.3 }}
              >
                <Link to="/contact" onClick={() => setOpen(false)} style={{
                  display: 'inline-block', marginTop: '1rem',
                  background: '#1d1d1f', color: '#fff',
                  fontSize: '0.875rem', fontWeight: 600,
                  padding: '0.65rem 1.4rem', borderRadius: '999px',
                  textDecoration: 'none',
                }}>
                  book now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Main ─── */}
      <main style={{ paddingTop: '52px' }}>
        {children}
      </main>

      {/* ─── Footer ─── */}
      <footer style={{ background: '#fff', borderTop: '1px solid #ECE6D8' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2.5rem' }}>
          <div style={{
            display: 'flex', flexWrap: 'wrap',
            justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#372713' }}>thenightera</p>
              <p style={{ fontSize: '0.75rem', color: '#A39670', lineHeight: 1.6, maxWidth: '22ch' }}>
                AI-powered branding, content & PR.<br />indore, madhya pradesh, india
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 2rem' }}>
              {links.map(l => (
                <Link key={l.label} to={l.to} style={{
                  fontSize: '0.75rem', color: '#4D4828', textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.5'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                ['instagram · @thenightera', 'https://instagram.com/thenightera'],
                ['calma · heycalma.in',      'https://heycalma.in'],
                ['officialnightera@gmail.com','mailto:officialnightera@gmail.com'],
              ].map(([label, href]) => (
                <a key={label} href={href}
                   target={href.startsWith('http') ? '_blank' : undefined}
                   rel="noreferrer"
                   style={{ fontSize: '0.75rem', color: '#A39670', textDecoration: 'none', transition: 'opacity 0.2s' }}
                   onMouseEnter={e => e.currentTarget.style.opacity = '0.55'}
                   onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >{label}</a>
              ))}
            </div>
          </div>

          <div style={{
            marginTop: '2rem', paddingTop: '1.5rem',
            borderTop: '1px solid #ECE6D8',
            display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap',
            gap: '0.5rem', fontSize: '0.75rem', color: '#A39670',
          }}>
            <p>thenightera.in · brands that earn attention</p>
            <p>© {new Date().getFullYear()} thenightera</p>
          </div>
        </div>
      </footer>
    </>
  )
}
