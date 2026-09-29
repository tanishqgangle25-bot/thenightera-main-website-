import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Layout from './components/Layout'

const Home = lazy(() => import('./pages/Home'))
const Work = lazy(() => import('./pages/Work'))
const Services = lazy(() => import('./pages/Services'))
const Testimonials = lazy(() => import('./pages/Testimonials'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Contact = lazy(() => import('./pages/Contact'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Calma = lazy(() => import('./pages/Calma'))
const Login = lazy(() => import('./pages/Login'))
const NotFound = lazy(() => import('./pages/NotFound'))

/* ─── Page transition wrapper ─── */
const pageVariants = {
  initial: { opacity: 0, y: 16, filter: 'blur(6px)' },
  enter:   { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  exit:    { opacity: 0, y: -12, filter: 'blur(4px)',
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
}

function PageWrapper({ children }) {
  const reduceMotion = useReducedMotion()
  const mobile = window.matchMedia('(max-width: 768px)').matches

  if (reduceMotion || mobile) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
        {children}
      </motion.div>
    )
  }

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
      <Suspense fallback={<div className="route-loader" role="status" aria-label="Loading page" />}>
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
            <Route path="/login"       element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="*"            element={<PageWrapper><NotFound /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </Layout>
  )
}
