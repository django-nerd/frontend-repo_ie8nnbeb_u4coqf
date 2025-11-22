import { Sparkles } from 'lucide-react'
import { useState } from 'react'
import Modal from './Modal'
import Products from './Products'

export default function Hero() {
  const [open, setOpen] = useState(false)

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_10%_20%,rgba(16,185,129,0.15),transparent_40%),radial-gradient(800px_circle_at_90%_30%,rgba(34,211,238,0.12),transparent_40%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 text-xs mb-6">
              <Sparkles size={14} />
              Official Donut SMP IRL Store
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Gear up your realm with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400">
                ZenSupply
              </span>
            </h1>
            <p className="mt-3 text-sm text-emerald-200/90">Skeleton spawners, Money and more. Fast Checkout, rapid delivery and 24/7 Support.</p>
            <p className="mt-4 text-lg text-slate-300 max-w-xl">
              Shop spawners, in‑game currency, and powerful kits for your Minecraft Donut SMP. Fast delivery, secure checkout, and premium quality items.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => setOpen(true)} className="h-12 inline-flex items-center px-5 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold shadow-lg shadow-emerald-500/20 hover:brightness-110 transition">Browse Products</button>
              <a href="https://discord.gg/K5BU46kJMY" target="_blank" rel="noopener noreferrer" className="h-12 inline-flex items-center px-5 rounded-lg bg-white/10 text-white font-semibold border border-white/10 hover:bg-white/15 transition">Need help?</a>
            </div>
            <p className="mt-4 text-sm text-slate-400">Delivery within minutes to your IGN after purchase.</p>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 blur-2xl rounded-full" />
            <img src="/minecraft-donut-hero.png" alt="Donut SMP" className="relative w-full rounded-xl border border-white/10 shadow-2xl" />
          </div>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="All Products">
        <Products onAdd={() => {}} />
      </Modal>
    </section>
  )
}
