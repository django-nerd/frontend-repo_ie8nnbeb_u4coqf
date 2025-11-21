import { ShoppingCart, Menu, Swords } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar({ onCartClick, count = 0 }) {
  const [open, setOpen] = useState(false)
  const [hash, setHash] = useState(typeof window !== 'undefined' ? window.location.hash : '')

  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const scrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) {
      // update hash to sync active state
      if (window.location.hash !== id) {
        history.pushState(null, '', id)
        setHash(id)
      }
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <a href="#" onClick={(e)=>{e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); history.pushState(null,'','#'); setHash('')}} className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 blur-md bg-gradient-to-tr from-emerald-400 to-cyan-400 opacity-60 group-hover:opacity-90 transition" />
              <div className="relative w-9 h-9 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-500 grid place-items-center text-white shadow-lg shadow-emerald-500/30">
                <Swords size={18} />
              </div>
            </div>
            <span className="text-white font-extrabold tracking-tight text-xl">
              Zen<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Supply</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <button onClick={()=>scrollTo('#products')} className="text-slate-300 hover:text-white transition relative">
              <span>Products</span>
              <AnimatePresence>
                {hash === '#products' && (
                  <motion.span layoutId="nav-underline" className="absolute left-0 right-0 -bottom-1 h-0.5 bg-emerald-400 rounded-full"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{ duration: 0.18 }}
                  />
                )}
              </AnimatePresence>
            </button>
            <button onClick={()=>scrollTo('#faq')} className="text-slate-300 hover:text-white transition relative">
              <span>Feedback</span>
              <AnimatePresence>
                {hash === '#faq' && (
                  <motion.span layoutId="nav-underline" className="absolute left-0 right-0 -bottom-1 h-0.5 bg-emerald-400 rounded-full"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{ duration: 0.18 }}
                  />
                )}
              </AnimatePresence>
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={onCartClick} className="h-10 relative inline-flex items-center gap-2 text-white px-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 transition">
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Cart</span>
              <span className="absolute -top-2 -right-2 text-xs bg-emerald-500 text-white rounded-full px-1.5 py-0.5 shadow">{count}</span>
            </button>
            <button className="md:hidden text-white/80" onClick={() => setOpen(v => !v)}>
              <Menu />
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden pb-4"
            >
              <div className="grid gap-2">
                <button onClick={()=>{scrollTo('#products'); setOpen(false)}} className="text-slate-200 py-2 text-left">Products</button>
                <button onClick={()=>{scrollTo('#faq'); setOpen(false)}} className="text-slate-200 py-2 text-left">Feedback</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
