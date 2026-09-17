import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t" style={{ borderColor: '#ECE6D8' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">

          {/* Brand */}
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold" style={{ color: '#372713' }}>calma</p>
            <p className="text-xs leading-relaxed max-w-xs" style={{ color: '#A39670' }}>
              AI review management for restaurants in India.<br />
              by <a href="https://www.thenightera.in" target="_blank" rel="noopener noreferrer" className="hover:underline">thenightera</a> · indore, mp
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs" style={{ color: '#4D4828' }}>
            <Link to="/features" className="hover:opacity-60 transition-opacity">features</Link>
            <Link to="/how-it-works" className="hover:opacity-60 transition-opacity">how it works</Link>
            <Link to="/pricing" className="hover:opacity-60 transition-opacity">pricing</Link>
            <Link to="/faq" className="hover:opacity-60 transition-opacity">faq</Link>
            <Link to="/about" className="hover:opacity-60 transition-opacity">about</Link>
            <Link to="/ecosystem" className="hover:opacity-60 transition-opacity">ecosystem</Link>
            <Link to="/contact" className="hover:opacity-60 transition-opacity">contact</Link>
          </div>

          {/* Social + contact */}
          <div className="flex flex-col gap-2 text-xs" style={{ color: '#A39670' }}>
            <a
              href="https://www.instagram.com/heycalma"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 transition-opacity"
            >
              instagram · @heycalma
            </a>
            <a
              href="https://www.instagram.com/thenightera"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 transition-opacity"
            >
              instagram · @thenightera
            </a>
            <a
              href="https://wa.me/918251000525"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 transition-opacity"
            >
              whatsapp · +91 82510 00525
            </a>
            <a
              href="mailto:officialnightera@gmail.com"
              className="hover:opacity-60 transition-opacity"
            >
              officialnightera@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-2 text-xs" style={{ borderColor: '#ECE6D8', color: '#A39670' }}>
          <p>heycalma.in · calma is a product of thenightera</p>
          <p>indore, madhya pradesh, india · 452001</p>
        </div>
      </div>
    </footer>
  )
}
