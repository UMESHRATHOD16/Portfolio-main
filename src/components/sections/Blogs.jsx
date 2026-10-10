import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { blogs } from '../../data'

const HASHNODE_USERNAME = 'umeshblog1'
const hashnodeUrl = `https://hashnode.com/@${HASHNODE_USERNAME}`

function BlogCard({ blog, index }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)
  const reduceMotion = useReducedMotion()

  const inView = useInView(cardRef, {
    once: true,
    margin: '-70px',
  })

  return (
    <motion.a
      ref={cardRef}
      href={blog.url}
      target="_blank"
      rel="noreferrer"
      initial={reduceMotion ? false : { opacity: 0, y: 35, scale: 0.98 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : {}
      }
      transition={{
        duration: 0.65,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative block overflow-hidden rounded-xl"
      style={{
        background: '#0D0D10',
        border: `1px solid ${
          hovered ? 'rgba(244,63,94,0.45)' : '#27272A'
        }`,
        transition: 'border-color 0.3s ease',
        transformStyle: 'preserve-3d',
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -5,
              transition: { duration: 0.25 },
            }
      }
    >
      {/* Animated crimson top edge */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] origin-left"
        style={{
          background: 'linear-gradient(90deg, #F43F5E, #FDA4AF, transparent)',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />

      <div className="p-5 sm:p-6">
        {/* Metadata */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: '#F43F5E',
                boxShadow: hovered
                  ? '0 0 10px rgba(244,63,94,0.8)'
                  : 'none',
              }}
            />

            <span
              className="text-[10px] tracking-[0.2em] uppercase font-medium"
              style={{ color: '#F43F5E' }}
            >
              Field Notes / {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <span
            className="text-[11px] whitespace-nowrap"
            style={{ color: '#71717A' }}
          >
            {blog.readTime}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-xl sm:text-2xl font-bold leading-snug
                     transition-colors duration-300"
          style={{
            color: hovered ? '#F43F5E' : '#FAFAFA',
            fontFamily: "'Syne', sans-serif",
          }}
        >
          {blog.title}
        </h3>

        {/* Summary */}
        <p
          className="text-sm leading-6 mt-3 max-w-2xl"
          style={{ color: '#A1A1AA' }}
        >
          {blog.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {blog.tags.map((tag, i) => (
            <motion.span
              key={tag}
              animate={
                hovered
                  ? { y: -2, borderColor: 'rgba(244,63,94,0.35)' }
                  : { y: 0, borderColor: 'rgba(244,63,94,0.12)' }
              }
              transition={{ duration: 0.2, delay: i * 0.03 }}
              className="text-[10px] px-2.5 py-1 rounded-full border"
              style={{
                background: hovered
                  ? 'rgba(244,63,94,0.09)'
                  : 'rgba(244,63,94,0.04)',
                color: hovered ? '#FDA4AF' : '#A1A1AA',
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between mt-5 pt-4 border-t"
          style={{ borderColor: '#27272A' }}
        >
          <span
            className="text-xs"
            style={{ color: '#71717A' }}
          >
            {blog.date}
          </span>

          <span
            className="inline-flex items-center gap-2 text-xs font-semibold"
            style={{ color: '#F43F5E' }}
          >
            Read article

            <motion.span
              animate={
                hovered
                  ? { x: 4, y: -2 }
                  : { x: 0, y: 0 }
              }
              transition={{ duration: 0.2 }}
            >
              ↗
            </motion.span>
          </span>
        </div>
      </div>

      {/* Subtle cursor-follow-free glow */}
      <motion.div
        className="absolute bottom-0 right-0 w-40 h-40 rounded-full
                   pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(244,63,94,0.07), transparent 70%)',
        }}
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1.2 : 0.8,
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.a>
  )
}

export default function Blogs() {
  const ref = useRef(null)
  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  })
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="blogs"
      ref={ref}
      className="py-16 sm:py-20 px-6 max-w-5xl mx-auto"
    >
      {/* Section heading */}
      <div className="flex items-end justify-between gap-5 mb-8">
        <div>
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, x: -15 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.3em] uppercase font-medium"
            style={{ color: '#F43F5E' }}
          >
            06 — Writing
          </motion.span>

          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-3xl sm:text-4xl font-bold mt-3"
            style={{
              fontFamily: "'Syne', sans-serif",
              color: '#FAFAFA',
            }}
          >
            Notes from the build.
          </motion.h2>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-sm mt-2"
            style={{ color: '#A1A1AA' }}
          >
            Things I learn, problems I solve.
          </motion.p>
        </div>

        <motion.a
          initial={reduceMotion ? false : { opacity: 0, x: 10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          href={hashnodeUrl}
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-2 text-xs
                     font-medium pb-1 border-b transition-colors duration-200"
          style={{
            color: '#A1A1AA',
            borderColor: '#27272A',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#F43F5E'
            e.currentTarget.style.borderColor = '#F43F5E'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#A1A1AA'
            e.currentTarget.style.borderColor = '#27272A'
          }}
        >
          Hashnode <span>↗</span>
        </motion.a>
      </div>

      {/* Articles */}
      {blogs.length > 0 ? (
        <div className="space-y-4">
          {blogs.map((blog, index) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              index={index}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-xl p-6 sm:p-8"
          style={{
            background: '#0D0D10',
            border: '1px solid #27272A',
          }}
        >
          <p
            className="text-lg font-semibold"
            style={{
              color: '#FAFAFA',
              fontFamily: "'Syne', sans-serif",
            }}
          >
            The first chapter is coming.
          </p>

          <p className="text-sm mt-2" style={{ color: '#A1A1AA' }}>
            Follow along as I document what I build and learn.
          </p>

          <a
            href={hashnodeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-xs mt-4 font-medium"
            style={{ color: '#F43F5E' }}
          >
            Follow on Hashnode ↗
          </a>
        </motion.div>
      )}

      {/* Bottom metadata */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="flex items-center justify-between mt-5"
      >
        <span
          className="text-[10px] tracking-[0.15em] uppercase"
          style={{ color: '#52525B' }}
        >
          Ideas into words.
        </span>

        <span
          className="text-[10px] tracking-[0.15em] uppercase"
          style={{ color: '#52525B' }}
        >
          {String(blogs.length).padStart(2, '0')} published
        </span>
      </motion.div>
    </section>
  )
}