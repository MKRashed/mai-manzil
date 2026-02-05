'use client'

import { useState } from 'react'
import Lightbox from './Lightbox'
import Reveal from './Reveal'

export default function Gallery({ items }) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  return (
    <div data-lightbox-root>
      <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
        {items.map((item, idx) => (
          <Reveal key={item.image}>
            <button
              type="button"
              onClick={() => {
                setIndex(idx)
                setOpen(true)
              }}
              className="group w-full break-inside-avoid rounded-3xl border border-[#e2d7cb] bg-white shadow-[0_12px_40px_rgba(30,27,24,0.08)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(30,27,24,0.16)]"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="h-full w-full rounded-3xl object-cover"
              />
              <div className="flex items-center justify-between px-4 py-4">
                <span className="text-xs uppercase tracking-[0.2em] text-[#b08a5a]">View</span>
                <span className="text-sm text-[#5c554f]">{item.alt}</span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
      <Lightbox
        isOpen={open}
        onClose={() => setOpen(false)}
        onPrev={() => setIndex((prev) => (prev - 1 + items.length) % items.length)}
        onNext={() => setIndex((prev) => (prev + 1) % items.length)}
        items={items}
        index={index}
      />
    </div>
  )
}
