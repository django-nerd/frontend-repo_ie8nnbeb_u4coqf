export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-400 text-sm">© {new Date().getFullYear()} ZenSupply. Not affiliated with Mojang or Microsoft.</p>
        <div className="text-slate-400 text-sm">Donut SMP • Secure Payments • Instant Delivery</div>
      </div>
    </footer>
  )
}
