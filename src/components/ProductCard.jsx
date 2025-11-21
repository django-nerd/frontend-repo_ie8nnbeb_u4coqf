import { ShoppingCart, DollarSign } from 'lucide-react'

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group relative rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden">
      <div className="aspect-[4/3] bg-slate-900/30 relative">
        {product.image_url ? (
          <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-slate-500">No image</div>
        )}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-slate-900/60 to-transparent" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-white font-semibold text-lg leading-tight">{product.title}</h3>
          <div className="text-emerald-300 font-bold">${Number(product.price).toFixed(2)}</div>
        </div>
        {product.description && (
          <p className="text-slate-400 text-sm mt-1 line-clamp-2">{product.description}</p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-slate-400">{product.category}</span>
          <button onClick={() => onAdd(product)} className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md bg-emerald-500/90 hover:bg-emerald-500 text-white transition">
            <ShoppingCart size={16} /> Add
          </button>
        </div>
      </div>
    </div>
  )
}
