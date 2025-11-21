import { useState } from 'react'
import { ShoppingCart, ChevronDown } from 'lucide-react'

export default function ProductCard({ product, onAdd }) {
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null)
  const [quantity, setQuantity] = useState(1)

  const priceForSelection = () => {
    const base = Number(product.price || 0)
    if (!selectedVariant) return base * quantity
    const variantPrice = selectedVariant.price != null ? Number(selectedVariant.price) : base
    const units = selectedVariant.bundle_qty ? Number(selectedVariant.bundle_qty) : 1
    return variantPrice * quantity
  }

  const handleAdd = () => {
    const lineItem = {
      id: product.id,
      title: product.title,
      basePrice: product.price,
      variant: selectedVariant ? { name: selectedVariant.name, type: selectedVariant.type, bundle_qty: selectedVariant.bundle_qty || 1, price: selectedVariant.price ?? null } : null,
      qty: quantity,
      image_url: product.image_url,
      sku: product.sku,
      category: product.category,
    }
    onAdd(lineItem)
  }

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

        {/* Variant selector */}
        {product.variants && product.variants.length > 0 && (
          <div className="mt-3">
            <label className="block text-xs text-slate-400 mb-1">Variant</label>
            <div className="relative">
              <select
                className="w-full appearance-none bg-slate-800/80 border border-white/10 rounded-md px-3 py-2 pr-8 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={selectedVariant ? selectedVariant.name : ''}
                onChange={(e) => {
                  const v = product.variants.find(v => v.name === e.target.value)
                  setSelectedVariant(v || null)
                }}
              >
                {product.variants.map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name}{v.price != null ? ` - $${Number(v.price).toFixed(2)}` : ''}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="mt-3">
          <label className="block text-xs text-slate-400 mb-1">Quantity</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="w-20 bg-slate-800/80 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="text-xs text-slate-400">per selection</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-slate-400">{product.category}</span>
          <button onClick={handleAdd} className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md bg-emerald-500/90 hover:bg-emerald-500 text-white transition">
            <ShoppingCart size={16} /> Add ${priceForSelection().toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  )
}
