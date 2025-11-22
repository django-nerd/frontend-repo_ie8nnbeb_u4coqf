import { AnimatePresence, motion } from 'framer-motion'
import { X, Trash2 } from 'lucide-react'

function formatPrice(n) {
  const num = Number(n || 0)
  return num.toFixed(num < 1 ? 3 : 2)
}

export default function CartDrawer({ open, onClose, items = [], onIncrement, onDecrement, onRemove, onCheckout }) {
  const subtotal = items.reduce((sum, it) => {
    const unit = it.variant && it.variant.price != null ? Number(it.variant.price) : Number(it.basePrice || 0)
    return sum + unit * (it.qty || 1)
  }, 0)

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120]">
          <motion.div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="absolute right-0 top-0 h-full w-full sm:w-[28rem] bg-slate-900 border-l border-white/10 shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/5">
              <h3 className="text-white font-semibold text-lg">Your Cart</h3>
              <button onClick={onClose} className="h-9 px-3 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm border border-white/10 transition"><X size={16} /></button>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="text-slate-300 text-sm">Your cart is empty.</div>
              ) : (
                items.map((it, idx) => {
                  const unit = it.variant && it.variant.price != null ? Number(it.variant.price) : Number(it.basePrice || 0)
                  const line = unit * (it.qty || 1)
                  return (
                    <div key={idx} className="rounded-lg border border-white/10 bg-white/5 p-3 flex gap-3">
                      <div className="w-16 h-16 rounded-md bg-slate-800/50 border border-white/10 overflow-hidden flex-shrink-0">
                        {it.image_url ? (
                          <img src={it.image_url} alt={it.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full grid place-items-center text-slate-500 text-xs">No image</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="text-white font-medium truncate">{it.title}</div>
                            {it.variant?.name && (
                              <div className="text-xs text-slate-400 truncate">{it.variant.name}</div>
                            )}
                            <div className="text-xs text-slate-400">Unit ${formatPrice(unit)}</div>
                          </div>
                          <button onClick={() => onRemove(it)} className="text-slate-400 hover:text-red-400 transition"><Trash2 size={16} /></button>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center bg-slate-800/70 border border-white/10 rounded-md overflow-hidden">
                            <button onClick={() => onDecrement(it)} className="h-9 w-9 text-white/80 hover:bg-white/10">-</button>
                            <div className="h-9 px-3 grid place-items-center text-sm text-white/90">{it.qty}</div>
                            <button onClick={() => onIncrement(it)} className="h-9 w-9 text-white/80 hover:bg-white/10">+</button>
                          </div>
                          <div className="text-sm text-emerald-300 font-semibold">${formatPrice(line)}</div>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <div className="border-t border-white/10 p-4 space-y-3 bg-white/5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">Subtotal</span>
                <span className="text-white font-semibold">${formatPrice(subtotal)}</span>
              </div>
              <button
                disabled={items.length === 0}
                onClick={onCheckout}
                className="h-10 w-full inline-flex items-center justify-center rounded-md bg-emerald-500/90 hover:bg-emerald-500 disabled:opacity-60 text-white text-sm font-semibold transition"
              >
                Checkout
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
