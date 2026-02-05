'use client'

import { useEffect, useRef } from 'react'

export default function Lightbox({ isOpen, onClose, onPrev, onNext, items, index }) {
  const closeRef = useRef(null)
  const trapRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const previous = document.activeElement
    closeRef.current?.focus()

    const handleKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onNext()
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onPrev()
      }
      if (event.key === 'Tab') {
        const focusable = trapRef.current?.querySelectorAll('button')
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('keydown', handleKey)
      if (previous && previous.focus) previous.focus()
    }
  }, [isOpen, onClose, onNext, onPrev])

  if (!isOpen) return null
  const current = items[index]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#14110e]/80 p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery lightbox"
    >
      <div
        ref={trapRef}
        className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-[#f7f4f0] shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
      >
        <img src={current.image} alt={current.alt} className="h-[70vh] w-full object-cover" />
        <div className="flex items-center justify-between gap-4 border-t border-[#e2d7cb] bg-white/60 px-6 py-4">
          <p className="text-sm text-[#5c554f]">{current.alt}</p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-full border border-[#e2d7cb] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#1e1b18]"
              onClick={onPrev}
            >
              Prev
            </button>
            <button
              type="button"
              className="rounded-full border border-[#e2d7cb] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#1e1b18]"
              onClick={onNext}
            >
              Next
            </button>
            <button
              type="button"
              ref={closeRef}
              className="rounded-full bg-[#1e1b18] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#f7f4f0]"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
