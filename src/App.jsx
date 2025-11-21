import { useState, useMemo } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import Footer from './components/Footer'

function App() {
  const [cart, setCart] = useState([])

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + (item.qty || 1), 0), [cart])

  const handleAdd = (lineItem) => {
    // Merge by product id + variant name (if any). Different variants become separate lines.
    const key = `${lineItem.id || lineItem.sku || lineItem.title}__${lineItem.variant?.name || 'base'}`
    setCart(prev => {
      const idx = prev.findIndex(i => `${i.id || i.sku || i.title}__${i.variant?.name || 'base'}` === key)
      if (idx > -1) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], qty: (copy[idx].qty || 1) + (lineItem.qty || 1) }
        return copy
      }
      return [...prev, { ...lineItem }]
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar onCartClick={() => alert('Cart coming soon')} count={cartCount} />
      <Hero />
      <Products onAdd={handleAdd} />
      <Footer />
    </div>
  )
}

export default App
