import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = ['Services', 'About', 'Work', 'Contact']

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 border border-cyan rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-cyan rounded-sm" />
          </div>
          <span className="font-display text-sm font-bold tracking-[0.3em] text-white uppercase">
            Avexis
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 border border-dark-border rounded-full px-2 py-1.5 bg-dark/80 backdrop-blur-xl">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="px-4 py-1.5 text-sm text-gray-light hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-1 px-5 py-1.5 text-sm font-medium bg-cyan text-dark rounded-full hover:bg-cyan-light transition-colors"
          >
            Get Started
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-dark/95 backdrop-blur-xl border-t border-dark-border"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="text-gray-light hover:text-white transition-colors text-lg"
                >
                  {link}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 px-6 py-3 text-center font-medium bg-cyan text-dark rounded-full hover:bg-cyan-light transition-colors"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
