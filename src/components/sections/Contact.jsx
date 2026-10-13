
import { motion, useReducedMotion } from 'framer-motion'
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa'
import { SiHashnode } from 'react-icons/si'

const socials = [
  {
    name: 'GitHub',
    detail: 'Projects & open source',
    href: 'https://github.com/UMESHRATHOD16',
    Icon: FaGithub,
  },
  {
    name: 'LinkedIn',
    detail: 'Professional network',
    href: 'https://www.linkedin.com/in/rathodumesh',
    Icon: FaLinkedinIn,
  },
  {
    name: 'Instagram',
    detail: 'A little beyond code',
    href: 'https://instagram.com/__umeshrathod',
    Icon: FaInstagram,
  },
  {
    name: 'Hashnode',
    detail: 'Articles & learning notes',
    href: 'https://hashnode.com/@umeshhhhh',
    Icon: SiHashnode,
  },
]

export default function Contact() {
  const reduceMotion = useReducedMotion()

  const reveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden px-5 py-24 sm:px-10 md:py-32"
      style={{ background: '#09090B', color: '#FAFAFA' }}
    >
      {/* Ambient crimson glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 -z-10 h-80 w-80 rounded-full blur-[120px]"
        style={{ background: 'rgba(244,63,94,0.12)' }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Section heading */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex items-center justify-between border-b pb-5"
          style={{ borderColor: '#27272A' }}
        >
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            <span
              className="text-xs font-medium uppercase tracking-[0.25em]"
              style={{ color: '#A1A1AA' }}
            >
              Let's connect
            </span>
          </div>

          <span
            className="font-mono text-xs"
            style={{ color: '#52525B' }}
          >
            CONTACT / 08
          </span>
        </motion.div>

        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          {/* Left: Main message */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p
              className="mb-5 text-sm"
              style={{ color: '#A1A1AA' }}
            >
              Have an idea worth exploring?
            </p>

            <h2 className="text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl">
              Let's build
              <br />
              something
              <br />
              <span
                className="font-serif font-normal italic"
                style={{ color: '#F43F5E' }}
              >
                meaningful.
              </span>
            </h2>

            <p
              className="mt-7 max-w-md text-sm leading-7 sm:text-base"
              style={{ color: '#A1A1AA' }}
            >
              I'm passionate about building thoughtful software,
              exploring AI, and turning ambitious ideas into
              practical solutions. Whether it's an internship,
              a collaboration, or an interesting conversation,
              I'd love to hear from you.
            </p>

            {/* CTA Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              {/* Start a conversation: opens email */}
              <motion.a
                href="mailto:umeshhhhhrathod@gmail.com?subject=Let's%20Connect"
                whileHover={reduceMotion ? {} : { y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-5 rounded-xl px-5 py-4 transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(244,63,94,0.18)]"
                style={{
                  background: '#F43F5E',
                  color: '#FFFFFF',
                }}
              >
                <span className="text-sm font-medium">
                  Start a conversation
                </span>

                <span className="text-lg transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                  ↗
                </span>
              </motion.a>

              {/* Resume: opens Google Drive */}
              <motion.a
                href="https://drive.google.com/file/d/1C6w2WM7vT1C0XODiqwTRr3JqqwC0PXTQ/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduceMotion ? {} : { y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-5 rounded-xl border px-5 py-4 transition-all duration-300 hover:border-rose-500/60 hover:bg-rose-500/5"
                style={{
                  borderColor: '#27272A',
                  color: '#FAFAFA',
                  background: 'rgba(9,9,11,0.7)',
                }}
              >
                <span className="text-sm font-medium">
                  View Resume
                </span>

                <span
                  className="text-lg transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  style={{ color: '#F43F5E' }}
                >
                  ↗
                </span>
              </motion.a>
            </div>

            <p
              className="mt-4 break-all text-xs"
              style={{ color: '#71717A' }}
            >
              umeshhhhhrathod@gmail.com
            </p>
          </motion.div>

          {/* Right: Availability and social links */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            {/* Availability card */}
            <div
              className="rounded-2xl border p-5 sm:p-6"
              style={{
                background: 'rgba(244,63,94,0.045)',
                borderColor: '#3F252C',
              }}
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-500 opacity-50" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
                </span>

                <span
                  className="text-xs font-medium uppercase tracking-[0.16em]"
                  style={{ color: '#F43F5E' }}
                >
                  Open to opportunities
                </span>
              </div>

              <h3 className="mt-5 text-xl font-medium">
                Good things start with a conversation.
              </h3>

              <p
                className="mt-2 text-sm leading-6"
                style={{ color: '#A1A1AA' }}
              >
                Open to software development internships,
                collaborative projects, and connecting with
                fellow developers and builders.
              </p>
            </div>

            {/* Social links */}
            <div>
              <p
                className="mb-3 text-xs uppercase tracking-[0.2em]"
                style={{ color: '#71717A' }}
              >
                Find me around the web
              </p>

              <div className="flex flex-col">
                {socials.map(({ name, detail, href, Icon }) => (
                  <motion.a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} — ${detail}`}
                    whileHover={reduceMotion ? {} : { x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="group flex items-center gap-4 border-b py-4"
                    style={{ borderColor: '#27272A' }}
                  >
                    {/* Brand icon */}
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 group-hover:border-rose-500/40 group-hover:bg-rose-500/10"
                      style={{
                        background: '#111113',
                        borderColor: '#27272A',
                        color: '#A1A1AA',
                      }}
                    >
                      <Icon
                        size={19}
                        className="transition-colors duration-300 group-hover:text-rose-500"
                      />
                    </span>

                    {/* Name and description */}
                    <span className="min-w-0 flex-1">
                      <span
                        className="block text-sm font-medium transition-colors duration-300 group-hover:text-rose-500"
                        style={{ color: '#FAFAFA' }}
                      >
                        {name}
                      </span>

                      <span
                        className="mt-1 block text-xs"
                        style={{ color: '#71717A' }}
                      >
                        {detail}
                      </span>
                    </span>

                    {/* External link arrow */}
                    <span
                      className="text-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-rose-500"
                      style={{ color: '#52525B' }}
                    >
                      ↗
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer signature */}
        <div
          className="mt-20 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: '#27272A' }}
        >
          <p
            className="text-xs"
            style={{ color: '#71717A' }}
          >
            Designed with intent. Built with curiosity.
          </p>

          <p
            className="font-mono text-xs"
            style={{ color: '#52525B' }}
          >
            INDIA · © {new Date().getFullYear()} UMESH RATHOD
          </p>
        </div>
      </div>
    </section>
  )
}
