import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { experience } from '../../data'

function TimelineCard({ item, index, inView }) {
  const isLeft = index % 2 === 0
  const cardRef = useRef(null)
  const cardInView = useInView(cardRef, { once: true, margin: '-80px' })

  return (
    <div
      ref={cardRef}
      className={`relative flex items-center gap-0 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -80 : 80, rotateY: isLeft ? -15 : 15 }}
        animate={cardInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-[calc(50%-3rem)] rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid #27272A',
          transformPerspective: '1000px',
        }}
        whileHover={{
          y: -6,
          borderColor: 'rgba(244,63,94,0.3)',
          boxShadow: '0 20px 60px rgba(244,63,94,0.08)',
          transition: { duration: 0.3 },
        }}
      >
        {/* Animated corner accent */}
        <motion.div
          initial={{ width: 0, height: 0 }}
          animate={cardInView ? { width: 60, height: 60 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at top right, rgba(244,63,94,0.12), transparent 70%)',
          }}
        />

        {/* Type badge */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={cardInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4"
          style={{
            background: 'rgba(244,63,94,0.1)',
            border: '1px solid rgba(244,63,94,0.2)',
            color: '#F43F5E',
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-current"
          />
          {item.type}
        </motion.span>

        {/* Period */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={cardInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xs tracking-widest uppercase mb-3"
          style={{ color: '#A1A1AA' }}
        >
          {item.period}
        </motion.p>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={cardInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-xl font-bold mb-1"
          style={{ fontFamily: "'Syne', sans-serif", color: '#FAFAFA' }}
        >
          {item.title}
        </motion.h3>

        {/* Org */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={cardInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-sm font-medium mb-4"
          style={{ color: '#F43F5E' }}
        >
          {item.org}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={cardInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-sm leading-relaxed mb-5"
          style={{ color: '#A1A1AA' }}
        >
          {item.description}
        </motion.p>

        {/* Highlights — stagger */}
        <ul className="space-y-2">
          {item.highlights.map((h, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={cardInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
              className="flex items-start gap-2 text-xs leading-relaxed"
              style={{ color: '#A1A1AA' }}
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={cardInView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
                className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: '#F43F5E' }}
              />
              {h}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Center dot */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={cardInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          className="relative flex items-center justify-center"
        >
          {/* Outer pulse */}
          <motion.div
            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
            className="absolute w-8 h-8 rounded-full"
            style={{ background: 'rgba(244,63,94,0.2)' }}
          />
          {/* Inner pulse */}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
            className="absolute w-5 h-5 rounded-full"
            style={{ background: 'rgba(244,63,94,0.3)' }}
          />
          {/* Core dot */}
          <div
            className="w-3 h-3 rounded-full relative z-10"
            style={{
              background: '#F43F5E',
              boxShadow: '0 0 16px rgba(244,63,94,0.8)',
            }}
          />
        </motion.div>
      </div>

      {/* Empty side */}
      <div className="w-[calc(50%-3rem)]" />
    </div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const lineRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      id="experience"
      ref={ref}
      className="py-20 px-6 max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="mb-20">
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
          style={{ fontFamily: "'Syne', sans-serif", color: '#FAFAFA' }}
        >
          The Journey
        </motion.h2>
      </div>

      {/* Timeline */}
      <div className="relative">

        {/* Static track */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-px top-0 bottom-0"
          style={{ background: '#27272A' }}
        />

        {/* Scroll-driven growing line */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-px top-0 origin-top"
          style={{
            height: lineHeight,
            background: 'linear-gradient(to bottom, #F43F5E, rgba(244,63,94,0.2))',
            boxShadow: '0 0 8px rgba(244,63,94,0.4)',
          }}
        />

        {/* Cards */}
        <div className="space-y-16">
          {experience.map((item, i) => (
            <TimelineCard
              key={item.id}
              item={item}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* End marker */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="relative flex flex-col items-center mt-12 gap-2"
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full"
            style={{ background: 'rgba(244,63,94,0.4)' }}
          />
          <p
            className="text-xs tracking-widest uppercase"
            style={{ color: '#A1A1AA' }}
          >
            More ahead ↓
          </p>
        </motion.div>

      </div>
    </section>
  )
}