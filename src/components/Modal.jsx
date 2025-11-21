import { motion, AnimatePresence } from 'framer-motion'

export default function Modal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[100]">
          <motion.div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <div className="absolute inset-0 grid place-items-center p-4">
            <motion.div
              className="w-full max-w-5xl rounded-xl border border-white/10 bg-slate-900 shadow-2xl overflow-hidden"
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/5">
                <h3 className="text-white font-semibold text-lg">{title}</h3>
                <button onClick={onClose} className="h-9 px-3 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm border border-white/10 transition">Close</button>
              </div>
              <div className="p-5">
                {children}
              </div>
            </motion.div>
          </div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
