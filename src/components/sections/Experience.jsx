import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { experience } from '../../data'

function TimelineCard({ item, index, inView }) {
  const isLeft = index % 2 === 0

  return (
    <div className={`relative flex items-start gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-[calc(50%-2rem)] rounded-2xl p-6 group hover:-translate-y-1 transition-transform duration-300"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid #27272A',
        }}
      >
        {/* Type badge */}
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4"
          style={{
            background: 'rgba(244,63,94,0.1)',
            border: '1px solid rgba(244,63,94,0.2)',
            color: '#F43F5E',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {item.type}
        </span>

        {/* Period */}
        <p
          className="text-xs tracking-widest uppercase mb-3"
          style={{ color: '#A1A1AA' }}
        >
          {item.period}
        </p>

        {/* Title */}
        <h3
          className="text-xl font-bold mb-1"
          style={{
            fontFamily: "'Syne', sans-serif",
            color: '#FAFAFA',
          }}
        >
          {item.title}
        </h3>

        {/* Org */}
        <p
          className="text-sm font-medium mb-4"
          style={{ color: '#F43F5E' }}
        >
          {item.org}
        </p>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-5"
          style={{ color: '#A1A1AA' }}
        >
          {item.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-2">
          {item.highlights.map((h, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-xs leading-relaxed"
              style={{ color: '#A1A1AA' }}
            >
              <span
                className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: '#F43F5E' }}
              />
              {h}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Center dot */}
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
          className="w-4 h-4 rounded-full border-2 z-10"
          style={{
            background: '#09090B',
            borderColor: '#F43F5E',
            boxShadow: '0 0 12px rgba(244,63,94,0.5)',
          }}
        />
      </div>

      {/* Empty side */}
      <div className="w-[calc(50%-2rem)]" />

    </div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="experience"
      ref={ref}
      className="py-20 px-6 max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="mb-16">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.3em] uppercase font-medium"
          style={{ color: '#F43F5E' }}
        >
          04 — Experience
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold mt-3"
          style={{
            fontFamily: "'Syne', sans-serif",
            color: '#FAFAFA',
          }}
        >
          The Journey
        </motion.h2>
      </div>

      {/* Timeline */}
      <div className="relative">

        {/* Vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 -translate-x-1/2 w-px origin-top"
          style={{
            height: '100%',
            background: 'linear-gradient(to bottom, #F43F5E, rgba(244,63,94,0.1))',
          }}
        />

        {/* Cards */}
        <div className="space-y-12">
          {experience.map((item, i) => (
            <TimelineCard
              key={item.id}
              item={item}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* End dot */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: 'rgba(244,63,94,0.3)' }}
          />
          <p
            className="text-xs tracking-widest uppercase"
            style={{ color: '#A1A1AA' }}
          >
            More ahead
          </p>
        </motion.div>

      </div>
    </section>
  )
}