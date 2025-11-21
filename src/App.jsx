import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import Footer from './components/Footer'

function App() {
  const [cart, setCart] = useState([])

  const handleAdd = (product) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) {
        return prev.map(p => p.id === product.id ? { ...p, qty: (p.qty || 1) + 1 } : p)
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar onCartClick={() => alert('Cart coming soon')} />
      <Hero />
      <Products onAdd={handleAdd} />
      <Footer />
    </div>
  )
}

export default App
