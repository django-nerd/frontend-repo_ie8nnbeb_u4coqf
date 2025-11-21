import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import Modal from './Modal'

export default function FAQAndFeedback() {
  const [faqs] = useState([
    { q: 'How fast is delivery?', a: 'Most orders are delivered within minutes to your IGN.' },
    { q: 'What payment methods are supported?', a: 'We accept a variety of different payment methods like Paypal, Card, Crypto and alot more! Head to Checkout in order to see for yourself!' },
    { q: 'Is this affiliated with Mojang/Microsoft?', a: 'No, ZenSupply is not affiliated with Mojang or Microsoft.' },
  ])

  const [feedback, setFeedback] = useState([])
  const [stars, setStars] = useState(5)
  const [message, setMessage] = useState('')
  const [ign, setIgn] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [openTop, setOpenTop] = useState(false)
  const [viewSize, setViewSize] = useState('small') // small | mid | large

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/feedback`)
        const data = await res.json()
        setFeedback(data)
      } catch (e) {
        console.error('Failed to load feedback', e)
      }
    }
    load()
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (!stars) return
    setSubmitting(true)
    try {
      const res = await fetch(`${baseUrl}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stars, message: message || undefined, ign: ign || undefined })
      })
      if (!res.ok) throw new Error('Failed')
      setMessage('')
      setIgn('')
      setStars(5)
      // reload list
      const list = await fetch(`${baseUrl}/api/feedback`).then(r => r.json())
      setFeedback(list)
    } catch (e) {
      console.error(e)
    } finally {
      setSubmitting(false)
    }
  }

  const topFeedback = feedback.filter(f => (f.stars || 0) >= 4)

  const gridClass = viewSize === 'small' ? 'grid-cols-1' : viewSize === 'mid' ? 'grid-cols-2' : 'grid-cols-3'
  const cardPadding = viewSize === 'large' ? 'p-5' : viewSize === 'mid' ? 'p-3' : 'p-4'
  const textSize = viewSize === 'large' ? 'text-base' : viewSize === 'mid' ? 'text-xs' : 'text-sm'

  return (
    <section id="faq" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">FAQ</h2>
            <div className="space-y-3">
              {faqs.map((f, idx) => (
                <details key={idx} className="group rounded-lg border border-white/10 bg-white/5">
                  <summary className="cursor-pointer list-none px-4 py-3 text-white/90 font-medium">
                    {f.q}
                  </summary>
                  <div className="px-4 pb-4 text-slate-300">{f.a}</div>
                </details>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Player Feedback</h2>
            <form onSubmit={submit} className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Your Rating</label>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(n => (
                    <button type="button" key={n} onClick={() => setStars(n)} className={`h-10 w-10 grid place-items-center rounded-md border ${n <= stars ? 'bg-amber-400/20 border-amber-400 text-amber-300' : 'bg-slate-800/80 border-white/10 text-slate-300'}`}>
                      <Star size={18} fill={n <= stars ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">IGN (optional)</label>
                  <input value={ign} onChange={e=>setIgn(e.target.value)} className="h-10 w-full bg-slate-800/80 border border-white/10 rounded-md px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Your in-game name" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Message (optional)</label>
                  <input value={message} onChange={e=>setMessage(e.target.value)} className="h-10 w-full bg-slate-800/80 border border-white/10 rounded-md px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Tell us about your experience" />
                </div>
              </div>
              <div className="flex items-center gap-3 justify-end">
                <button type="button" onClick={() => setOpenTop(true)} className="h-10 inline-flex items-center gap-2 text-sm px-4 rounded-md bg-white/10 hover:bg-white/15 text-white border border-white/10 transition">
                  See all Feedbacks!
                </button>
                <button disabled={submitting} className="h-10 inline-flex items-center gap-2 text-sm px-4 rounded-md bg-emerald-500/90 hover:bg-emerald-500 disabled:opacity-60 text-white transition">
                  {submitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </form>

            <div className="mt-6 space-y-3">
              {feedback.length === 0 ? (
                <div className="text-slate-400 text-sm">No feedback yet — be the first!</div>
              ) : feedback.map(f => (
                <div key={f.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-amber-300">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} fill={i < (f.stars || 0) ? 'currentColor' : 'none'} className={i < (f.stars || 0) ? '' : 'text-slate-500'} />
                    ))}
                  </div>
                  <p className="text-slate-200 mt-2 text-sm">{f.message || 'No message provided.'}</p>
                  {f.ign && <div className="text-xs text-slate-400 mt-1">— {f.ign}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal open={openTop} onClose={() => setOpenTop(false)} title="Recent Feedback!">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs text-slate-400">View:</span>
          {['small','mid','large'].map(size => (
            <button
              key={size}
              type="button"
              onClick={() => setViewSize(size)}
              className={`h-8 px-3 rounded-md border text-xs transition ${viewSize === size ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'}`}
            >
              {size === 'small' ? 'Small' : size === 'mid' ? 'Mid' : 'Large'}
            </button>
          ))}
        </div>
        <div className={`grid ${gridClass} gap-3 max-h-[60vh] overflow-auto pr-1`}>
          {topFeedback.length === 0 ? (
            <div className="text-slate-300">No 4★+ feedback yet.</div>
          ) : topFeedback.map(f => (
            <div key={f.id} className={`rounded-lg border border-white/10 bg-white/5 ${cardPadding}`}>
              <div className={`flex items-center gap-2 text-amber-300 ${textSize}`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill={i < (f.stars || 0) ? 'currentColor' : 'none'} className={i < (f.stars || 0) ? '' : 'text-slate-500'} />
                ))}
              </div>
              <p className={`text-slate-200 mt-2 ${textSize}`}>{f.message || 'No message provided.'}</p>
              {f.ign && <div className={`text-slate-400 mt-1 ${viewSize === 'large' ? 'text-sm' : 'text-xs'}`}>— {f.ign}</div>}
            </div>
          ))}
        </div>
      </Modal>
    </section>
  )
}
