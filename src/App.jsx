import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'

function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + (item.qty || 1), 0), [cart])

  const handleAdd = (lineItem) => {
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
    setCartOpen(true)
  }

  const increment = (target) => {
    setCart(prev => prev.map(it => {
      const match = (it.id || it.sku || it.title) === (target.id || target.sku || target.title) && (it.variant?.name || 'base') === (target.variant?.name || 'base')
      return match ? { ...it, qty: (it.qty || 1) + 1 } : it
    }))
  }

  const decrement = (target) => {
    setCart(prev => prev.flatMap(it => {
      const match = (it.id || it.sku || it.title) === (target.id || target.sku || target.title) && (it.variant?.name || 'base') === (target.variant?.name || 'base')
      if (!match) return [it]
      const nextQty = (it.qty || 1) - 1
      if (nextQty <= 0) return []
      return [{ ...it, qty: nextQty }]
    }))
  }

  const removeItem = (target) => {
    setCart(prev => prev.filter(it => !((it.id || it.sku || it.title) === (target.id || target.sku || target.title) && (it.variant?.name || 'base') === (target.variant?.name || 'base'))))
  }

  const checkout = () => {
    alert('Checkout coming soon — we\'ll capture IGN and payment next!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar onCartClick={() => setCartOpen(true)} count={cartCount} />
      <Hero />
      <Products onAdd={handleAdd} />
      <FAQ />
      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onIncrement={increment}
        onDecrement={decrement}
        onRemove={removeItem}
        onCheckout={checkout}
      />
    </div>
  )
}

export default App
