import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

export default function Products({ onAdd }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/products`)
        const data = await res.json()

        // Helpers
        const cleanText = (txt = '') => txt.replace(/\(27x\)\s*Behind\s*Skeleton\s*Shulker!?/gi, '').trim()

        // Stable image fallbacks from the Minecraft Wiki/Wikimedia (hotlink-friendly)
        const FALLBACKS = {
          SPAWNER: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/4/40/Spawner_JE3_BE2.png',
          MONEY: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Green_US_dollar_icon.svg/512px-Green_US_dollar_icon.svg.png',
          ELYTRA: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/0/0c/Elytra_JE2_BE2.png',
        }

        // Inject images and copy tweaks for featured products
        const withImages = data.map(p => {
          const title = (p.title || '').trim()
          const sku = (p.sku || '').toUpperCase()
          const key = `${sku} ${title}`.toUpperCase()

          // Base cleaned fields
          let next = {
            ...p,
            title: cleanText(title),
            description: cleanText(p.description || ''),
          }

          // Skeleton Spawner
          if (key.includes('SPAWNER') || /skeleton\s*spawner/i.test(title)) {
            next = {
              ...next,
              image_url: p.image_url || FALLBACKS.SPAWNER,
              description: 'Cheap Skeleton Spawners, non duped!',
            }
            return next
          }

          // Money Pack
          if (key.includes('MONEY')) {
            next = {
              ...next,
              image_url: p.image_url || FALLBACKS.MONEY,
              description: 'In-game Money for just 0.03$ per Million.',
            }
            return next
          }

          // Elytra
          if (key.includes('ELYTRA')) {
            next = {
              ...next,
              image_url: p.image_url || FALLBACKS.ELYTRA,
              description: 'Elytra for just 12$',
            }
            return next
          }

          return next
        })

        // Enforce desired order: Skeleton Spawner, Money, Elytra
        const priority = {
          'SPAWNER-SKELETON': 0,
          'MONEY-PACK': 1,
          'ELYTRA-BASE': 2,
        }
        const ordered = [...withImages].sort((a, b) => {
          const aKey = (a.sku || a.title || '').toUpperCase()
          const bKey = (b.sku || b.title || '').toUpperCase()
          const aP = priority[aKey] ?? priority[a.title?.toUpperCase()] ?? 99
          const bP = priority[bKey] ?? priority[b.title?.toUpperCase()] ?? 99
          if (aP !== bP) return aP - bP
          return (a.title || '').localeCompare(b.title || '')
        })
        setProducts(ordered)
      } catch (e) {
        console.error('Failed to load products', e)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <section id="products" className="py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Featured Products</h2>
        </div>
        {loading ? (
          <div className="text-slate-400">Loading...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
              <ProductCard key={p.id || p.sku || p.title} product={p} onAdd={onAdd} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
