import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const USERNAME = 'UMESHRATHOD16'

function ContributionGraph({ data }) {
  if (!data || data.length === 0) return null

  const max = Math.max(...data.map(w => w.contributionDays.map(d => d.contributionCount)).flat())

  const getColor = (count) => {
    if (count === 0) return 'rgba(244,63,94,0.06)'
    if (count <= max * 0.25) return 'rgba(244,63,94,0.25)'
    if (count <= max * 0.5) return 'rgba(244,63,94,0.5)'
    if (count <= max * 0.75) return 'rgba(244,63,94,0.75)'
    return '#F43F5E'
  }

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-1" style={{ minWidth: 'max-content' }}>
        {data.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.contributionDays.map((day, di) => (
              <motion.div
                key={di}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: wi * 0.01 + di * 0.005 }}
                title={`${day.date}: ${day.contributionCount} contributions`}
                className="w-3 h-3 rounded-sm cursor-pointer transition-all duration-200 hover:scale-125"
                style={{ background: getColor(day.contributionCount) }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function PRCard({ pr, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.a
      ref={ref}
      href={pr.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="block group"
      whileHover={{ x: 6 }}
    >
      <div
        className="flex items-start justify-between gap-4 py-4 border-b transition-all duration-200"
        style={{ borderColor: '#27272A' }}
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* PR icon */}
          <div
            className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)' }}
          >
            <svg viewBox="0 0 16 16" width="10" height="10" fill="#F43F5E">
              <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354Z" />
            </svg>
          </div>

          <div className="min-w-0">
            <p
              className="text-sm font-medium truncate group-hover:text-white transition-colors duration-200"
              style={{ color: '#FAFAFA' }}
            >
              {pr.title}
            </p>
            <p
              className="text-xs mt-0.5 truncate"
              style={{ color: '#A1A1AA' }}
            >
              {pr.repository.nameWithOwner}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: 'rgba(244,63,94,0.08)',
              border: '1px solid rgba(244,63,94,0.15)',
              color: '#F43F5E',
            }}
          >
            {pr.state === 'OPEN' ? 'Open' : pr.state === 'MERGED' ? 'Merged' : 'Closed'}
          </span>
          <span className="text-xs" style={{ color: '#A1A1AA' }}>↗</span>
        </div>
      </div>
    </motion.a>
  )
}

export default function GitHub() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [contributions, setContributions] = useState([])
  const [prs, setPRs] = useState([])
  const [totalContribs, setTotalContribs] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN

        const query = `
          query {
            user(login: "${USERNAME}") {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
              pullRequests(last: 10, orderBy: { field: CREATED_AT, direction: DESC }) {
                nodes {
                  title
                  url
                  state
                  repository {
                    nameWithOwner
                  }
                }
              }
            }
          }
        `

        const res = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        })

        const { data } = await res.json()
        const cal = data.user.contributionsCollection.contributionCalendar
        setContributions(cal.weeks)
        setTotalContribs(cal.totalContributions)
        setPRs(data.user.pullRequests.nodes)
      } catch (e) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHub()
  }, [])

  return (
    <section
      id="github"
      ref={ref}
      className="py-20 px-6 max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="mb-14">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.3em] uppercase font-medium"
          style={{ color: '#F43F5E' }}
        >
          05 — GitHub
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold mt-3"
          style={{ fontFamily: "'Syne', sans-serif", color: '#FAFAFA' }}
        >
          Code Activity
        </motion.h2>

        <motion.a
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs mt-2 transition-colors hover:text-white"
          style={{ color: '#A1A1AA' }}
        >
          @{USERNAME} ↗
        </motion.a>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-6 h-6 rounded-full border-t-2"
            style={{ borderColor: '#F43F5E' }}
          />
        </div>
      )}

      {error && (
        <div className="text-center py-20">
          <p className="text-sm" style={{ color: '#A1A1AA' }}>
            Could not load GitHub data.{' '}
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: '#F43F5E' }}
            >
              View on GitHub ↗
            </a>
          </p>
        </div>
      )}

      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          {/* Contribution chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-2xl p-6"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid #27272A',
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm font-medium" style={{ color: '#FAFAFA' }}>
                Contribution Graph
              </p>
              <span
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  background: 'rgba(244,63,94,0.1)',
                  border: '1px solid rgba(244,63,94,0.2)',
                  color: '#F43F5E',
                }}
              >
                {totalContribs} this year
              </span>
            </div>
            <ContributionGraph data={contributions} />

            {/* Legend */}
            <div className="flex items-center gap-2 mt-4 justify-end">
              <span className="text-xs" style={{ color: '#A1A1AA' }}>Less</span>
              {[0.06, 0.25, 0.5, 0.75, 1].map((o, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-sm"
                  style={{ background: `rgba(244,63,94,${o})` }}
                />
              ))}
              <span className="text-xs" style={{ color: '#A1A1AA' }}>More</span>
            </div>
          </motion.div>

          {/* PRs */}
          {prs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <p
                className="text-sm font-medium mb-4"
                style={{ color: '#FAFAFA' }}
              >
                Pull Requests
              </p>
              <div>
                {prs.map((pr, i) => (
                  <PRCard key={i} pr={pr} index={i} />
                ))}
              </div>
            </motion.div>
          )}

        </motion.div>
      )}

    </section>
  )
}