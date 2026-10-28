'use client'

import { useState } from 'react'
import { Expand } from 'lucide-react'
import Lightbox from './Lightbox'
import Reveal from './Reveal'

export default function Gallery({ items }) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  return (
    <div data-lightbox-root>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => (
          <Reveal key={item.image} className="gallery-reveal h-full">
            <button
              type="button"
              aria-label={`View image: ${item.alt}`}
              aria-haspopup="dialog"
              onClick={() => {
                setIndex(idx)
                setOpen(true)
              }}
              className="site-card gallery-card group flex h-full w-full flex-col text-left"
            >
              <span className="block aspect-[4/3] w-full overflow-hidden bg-[#e8dfd5]">
              <img
                src={item.image}
                alt={item.alt}
                className="gallery-card-image h-full w-full object-cover"
                loading="lazy"
              />
              </span>
              <span className="flex min-h-20 w-full flex-1 items-center gap-4 border-t border-[#eee6dd] px-5 py-4">
                <span className="gallery-card-title min-w-0 flex-1 text-sm font-medium leading-6 text-[#302923]">{item.title ?? item.alt}</span>
                <span className="gallery-card-icon flex size-9 shrink-0 items-center justify-center rounded-full border border-[#e2d7cb] bg-[#f7f4f0] text-[#795b35]">
                  <Expand size={16} strokeWidth={1.5} aria-hidden="true" />
                </span>
              </span>
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
