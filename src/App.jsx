import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import Work from './pages/Work'
import Services from './pages/Services'
import Testimonials from './pages/Testimonials'
import FAQ from './pages/FAQ'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import Portfolio from './pages/Portfolio'
import Calma from './pages/Calma'
import NotFound from './pages/NotFound'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Page transition wrapper ─── */
const pageVariants = {
  initial: { opacity: 0, y: 16, filter: 'blur(6px)' },
  enter:   { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -12, filter: 'blur(4px)',
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
}

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"            element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/work"        element={<PageWrapper><Work /></PageWrapper>} />
          <Route path="/portfolio"   element={<PageWrapper><Portfolio /></PageWrapper>} />
          <Route path="/services"    element={<PageWrapper><Services /></PageWrapper>} />
          <Route path="/testimonials"element={<PageWrapper><Testimonials /></PageWrapper>} />
          <Route path="/faq"         element={<PageWrapper><FAQ /></PageWrapper>} />
          <Route path="/pricing"     element={<PageWrapper><Pricing /></PageWrapper>} />
          <Route path="/contact"     element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/calma"       element={<PageWrapper><Calma /></PageWrapper>} />
          <Route path="*"            element={<PageWrapper><NotFound /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}
