import { ShoppingCart, Menu, Swords } from 'lucide-react'
import { useState } from 'react'

export default function Navbar({ onCartClick, count = 0 }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
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
            <a href="#products" className="text-slate-300 hover:text-white transition">Products</a>
            <a href="#how" className="text-slate-300 hover:text-white transition">How it works</a>
            <a href="#faq" className="text-slate-300 hover:text-white transition">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={onCartClick} className="relative inline-flex items-center gap-2 text-white px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 transition">
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Cart</span>
              <span className="absolute -top-2 -right-2 text-xs bg-emerald-500 text-white rounded-full px-1.5 py-0.5 shadow">{count}</span>
            </button>
            <button className="md:hidden text-white/80" onClick={() => setOpen(v => !v)}>
              <Menu />
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <div className="grid gap-2">
              <a href="#products" className="text-slate-200 py-2">Products</a>
              <a href="#how" className="text-slate-200 py-2">How it works</a>
              <a href="#faq" className="text-slate-200 py-2">FAQ</a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
