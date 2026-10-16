import { useEffect, useState } from 'react'
import {
  cabinetPostDescriptions,
  cabinetPosts,
  ideologies,
  initialTimeline,
  metrics,
  opinionAttributes,
  opinionDemographics,
  opinionGroups,
  opinionIndustries,
  officeSeasons,
  primeMinisterNames,
  profileFields,
  promiseOptions,
} from './data/constants.js'
import { cabinetCandidates } from './data/candidates.js'
import { events, officeEvents, routineEvents } from './data/events.js'

const clamp = (value) => Math.min(100, Math.max(0, value))
const metricLabels = Object.fromEntries(metrics.map(({ key, label }) => [key, label]))
const getChoiceEffects = (choice) => ({
  ...choice.effects,
  motivation:
    choice.effects.motivation ??
    Math.round(((choice.effects.public ?? 0) + (choice.effects.party ?? 0)) / 2),
})

function OfficeIllustration({ className, preserveAspectRatio = 'xMidYMax slice', idPrefix = 'office', season = 'autumn' }) {
  const colors = officeSeasons[season]

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 280"
      className={className}
      preserveAspectRatio={preserveAspectRatio}
    >
      <defs>
        <linearGradient id={`${idPrefix}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={colors.skyTop} />
          <stop offset="1" stopColor={colors.skyBottom} />
        </linearGradient>
        <linearGradient id={`${idPrefix}-desk`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#624c3a" />
          <stop offset="1" stopColor="#332b27" />
        </linearGradient>
      </defs>
      <path d="M0 0h640v228H0z" fill={`url(#${idPrefix}-sky)`} />
      <path d="M30 18h255v156H30z" fill="#101a28" stroke="#536174" strokeWidth="8" />
      <path d="M42 30h231v132H42z" fill={colors.windowSky} />
      <path d="M157 30v132M42 96h231" stroke="#536174" strokeWidth="5" />
      <path d="M46 132h24V93h31v39h18V76h37v56h22v-30h32v30h19v-46h34v46h10v30H46z" fill={colors.city} />
      <circle cx="224" cy="57" r="12" fill={colors.sun} opacity=".75" />
      <path d="M307 24h275v157H307z" fill="#182334" stroke="#39495c" strokeWidth="5" />
      <path d="M337 49h213v94H337z" fill="#233448" />
      <path d="M353 74h181M353 95h181M353 116h134" stroke="#42566c" strokeWidth="5" opacity=".8" />
      <path d="M0 205h640v75H0z" fill="#101722" />
      <path d="M62 193h518l-34 48H98z" fill={`url(#${idPrefix}-desk)`} />
      <path d="M118 241h28v39h-28zm380 0h28v39h-28z" fill="#342a25" />
      <path d="M421 161v40" stroke="#b8c4d5" strokeWidth="3" />
      <path d="M424 163h38v26h-38z" fill="#f7f4ed" />
      <circle cx="443" cy="176" r="7" fill="#c94b50" />
      <path d="M211 207h119l13 15H197z" fill="#171e28" />
      <path d="M227 191h86v16h-86z" fill="#29384a" />
    </svg>
  )
}

function CandidatePortrait({ candidate, className = '' }) {
  return (
    <svg
      role="img"
      aria-label={`${candidate.name}のイメージ画像`}
      viewBox="0 0 96 96"
      className={className}
    >
      <circle cx="48" cy="48" r="48" fill={candidate.portraitColor} />
      <path d="M15 96c2-19 15-29 33-29s31 10 33 29" fill="#172638" />
      <path d="M39 62h18v15H39z" fill="#d9a17c" />
      <ellipse cx="48" cy="43" rx="21" ry="25" fill="#f0c4a2" />
      <path d="M27 44c-3-19 7-32 22-32 16 0 24 12 21 31-4-9-9-14-17-16-7 7-15 10-26 10z" fill="#28252c" />
      <path d="M39 45h2m14 0h2" stroke="#44322d" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M43 56c3 2 7 2 10 0" fill="none" stroke="#995f56" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function OpinionDetails({ support }) {
  const adjustment = support - 50
  const adjustedSupport = (value) => clamp(value + adjustment)

  const SupportBar = ({ label, value, color = 'bg-emerald-400' }) => {
    const adjustedValue = adjustedSupport(value)

    return (
      <div>
        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="text-slate-300">{label}</span>
          <span className="font-semibold tabular-nums text-white">{adjustedValue}%</span>
        </div>
        <div
          role="progressbar"
          aria-label={`${label}の支持率`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={adjustedValue}
          className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-800"
        >
          <div className={`h-full rounded-full ${color}`} style={{ width: `${adjustedValue}%` }} />
        </div>
      </div>
    )
  }

  return (
    <div className="mt-4 space-y-4">
      <section aria-label="総合支持率" className="rounded-xl border border-sky-300/20 bg-sky-300/[0.06] p-3 sm:p-4">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-sm font-semibold text-slate-200">総合支持率</h3>
          <span className="text-4xl font-bold tabular-nums text-sky-300">{support}</span>
          <span className="text-sm text-slate-400">前月比 <span className="font-semibold text-emerald-300">+3</span></span>
        </div>
      </section>

      <section aria-labelledby="opinion-demographics-title" className="rounded-xl border border-white/10 bg-white/[0.025] p-3">
        <h3 id="opinion-demographics-title" className="text-sm font-semibold text-white">世代・性別</h3>
        <div className="mt-3 grid grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1fr)] gap-x-3 gap-y-2">
          <span />
          <span className="text-xs font-semibold text-sky-200">男性</span>
          <span className="text-xs font-semibold text-pink-300">女性</span>
          {opinionDemographics.map(({ label, male, female }) => (
            <div key={label} className="contents">
              <span className="self-center text-sm text-slate-300">{label}</span>
              {[{ gender: '男性', value: male, color: 'bg-sky-400' }, { gender: '女性', value: female, color: 'bg-pink-400' }].map(({ gender, value, color }) => (
                <div key={gender} className="flex min-w-0 items-center gap-2">
                  <span className="w-7 shrink-0 text-right text-sm tabular-nums text-slate-200">{adjustedSupport(value)}</span>
                  <div
                    role="progressbar"
                    aria-label={`${label}・${gender}の支持率`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={adjustedSupport(value)}
                    className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-800"
                  >
                    <div className={`h-full rounded-full ${color}`} style={{ width: `${adjustedSupport(value)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        {opinionGroups.map(({ title, groups }) => (
          <section key={title} aria-label={title} className="rounded-xl border border-white/10 bg-white/[0.025] p-3">
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            <div className="mt-3 space-y-3">
              {groups.map((group) => <SupportBar key={group.label} {...group} />)}
            </div>
          </section>
        ))}
      </div>

      {[
        { title: '各属性', groups: opinionAttributes },
        { title: '業界別', groups: opinionIndustries },
      ].map(({ title, groups }) => (
        <section key={title} aria-label={title} className="rounded-xl border border-white/10 bg-white/[0.025] p-3">
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <div className="mt-3 grid grid-cols-3 gap-x-3 gap-y-3 sm:grid-cols-6">
            {groups.map(({ label, value }) => (
              <SupportBar key={label} label={label} value={value} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function App() {
  const [screen, setScreen] = useState('intro')
  const [primeMinisterName, setPrimeMinisterName] = useState(
    () => primeMinisterNames[Math.floor(Math.random() * primeMinisterNames.length)],
  )
  const [profile, setProfile] = useState({})
  const [ideology, setIdeology] = useState(ideologies[0])
  const [promises, setPromises] = useState(promiseOptions.slice(0, 3))
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0)
  const [rollingValue, setRollingValue] = useState('')
  const [isSpinning, setIsSpinning] = useState(false)
  const [cabinetPostIndex, setCabinetPostIndex] = useState(0)
  const [isCabinetHelpOpen, setIsCabinetHelpOpen] = useState(false)
  const [cabinetDetail, setCabinetDetail] = useState(null)
  const [cabinetCandidateId, setCabinetCandidateId] = useState(null)
  const [cabinetAssignments, setCabinetAssignments] = useState({})
  const [status, setStatus] = useState({
    public: 50,
    party: 50,
    happiness: 50,
    power: 50,
    motivation: 50,
  })
  const [completedEventCount, setCompletedEventCount] = useState(0)
  const [routineEventCount, setRoutineEventCount] = useState(0)
  const [history, setHistory] = useState(initialTimeline)
  const [eventIndex, setEventIndex] = useState(null)
  const [isDecisionOpen, setIsDecisionOpen] = useState(false)
  const [activeModal, setActiveModal] = useState(null)
  const [gameSpeed, setGameSpeed] = useState(1)
  const event = eventIndex === null ? null : officeEvents[eventIndex]
  const gameMonth = 9 + Math.floor(completedEventCount / 5)
  const gameYear = 2026 + Math.floor(gameMonth / 12)
  const gameMonthInYear = (gameMonth % 12) + 1
  const gameDate = `${gameYear}年${gameMonthInYear}月`
  const season = gameMonthInYear >= 3 && gameMonthInYear <= 5
    ? 'spring'
    : gameMonthInYear >= 6 && gameMonthInYear <= 8
      ? 'summer'
      : gameMonthInYear >= 9 && gameMonthInYear <= 11
        ? 'autumn'
        : 'winter'
  const isDietSession = gameMonthInYear <= 6
  const tenureMonths = Math.floor(completedEventCount / 5) + 1

  useEffect(() => {
    if (screen !== 'office' || isDecisionOpen) return

    const intervalId = window.setInterval(() => {
      if (routineEventCount === 6) {
        const nextEventIndex = Math.floor(Math.random() * events.length)
        setRoutineEventCount(0)
        setEventIndex(nextEventIndex)
        setIsDecisionOpen(true)
        return
      }

      const nextEvent = routineEvents[Math.floor(Math.random() * routineEvents.length)]
      setHistory((current) => [
        {
          turn: completedEventCount + 1,
          date: gameDate,
          category: nextEvent.category,
          title: nextEvent.title,
          detail: nextEvent.description,
        },
        ...current,
      ])
      setCompletedEventCount((current) => current + 1)
      setRoutineEventCount((current) => current + 1)
    }, 10000 / gameSpeed)

    return () => window.clearInterval(intervalId)
  }, [screen, isDecisionOpen, gameSpeed, completedEventCount, routineEventCount, gameDate])

  useEffect(() => {
    if (!isSpinning) return

    const field = profileFields[currentProfileIndex]
    const intervalId = window.setInterval(() => {
      setRollingValue(field.options[Math.floor(Math.random() * field.options.length)])
    }, 45)
    const timeoutId = window.setTimeout(() => {
      const selectedValue = field.options[Math.floor(Math.random() * field.options.length)]
      setRollingValue(selectedValue)
      setProfile((current) => ({ ...current, [field.key]: selectedValue }))
      setCurrentProfileIndex((current) => current + 1)
      if (currentProfileIndex === profileFields.length - 1) {
        setIsSpinning(false)
      }
    }, 700)

    return () => {
      window.clearInterval(intervalId)
      window.clearTimeout(timeoutId)
    }
  }, [isSpinning, currentProfileIndex])

  useEffect(() => {
    if (!isCabinetHelpOpen && !cabinetDetail) return

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsCabinetHelpOpen(false)
        setCabinetDetail(null)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isCabinetHelpOpen, cabinetDetail])

  if (screen === 'intro') {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-[#090d16] px-6 text-center text-slate-100">
        <p className="text-xl font-semibold leading-relaxed sm:text-3xl">
          2026年10月、国会で内閣総理大臣に指名された
        </p>
        <button
          type="button"
          onClick={() => setScreen('profile')}
          className="rounded-lg border border-sky-400/40 bg-sky-400/10 px-6 py-3 font-semibold text-sky-200 transition hover:bg-sky-400/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
        >
          次へ
        </button>
        <p className="max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
          内閣総理大臣は、行政権を担う内閣のトップです。国会からの指名に基づき天皇が任命します。閣僚（大臣）を自由に任命したり、クビにすることができます。内閣は国会に対して連帯して責任を負いますが、一方で衆議院を解散することもできます
        </p>
      </main>
    )
  }

  if (screen === 'profile') {
    const allProfileFieldsSelected = currentProfileIndex === profileFields.length

    return (
      <main className="min-h-screen bg-[#090d16] px-4 py-4 text-slate-100 sm:px-6">
        <section className="mx-auto max-w-2xl">
          <header className="mb-3">
            <h1 className="text-lg font-bold text-white">プロフィール設定</h1>
            <p className="mt-1 text-sm text-slate-400">ルーレットを回してプロフィールを決定</p>
          </header>
          <div className="mb-3 flex items-center gap-3">
            <label htmlFor="prime-minister-name" className="shrink-0 text-sm font-semibold text-white">
              名前
            </label>
            <input
              id="prime-minister-name"
              type="text"
              value={primeMinisterName}
              onChange={(changeEvent) => setPrimeMinisterName(changeEvent.target.value)}
              className="min-w-0 flex-1 rounded-xl border border-white/15 bg-[#111827] px-3 py-2 text-base text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
            />
          </div>

          <ol className="mt-3 space-y-1.5">
            {profileFields.map((field, index) => {
              const isCurrentField = index === currentProfileIndex
              const isSelected = profile[field.key] !== undefined
              const value = isSelected
                ? profile[field.key]
                : isCurrentField && isSpinning
                  ? rollingValue
                  : '未決定'

              return (
                <li
                  key={field.key}
                  className={`flex min-h-[3.2rem] items-center justify-between gap-4 rounded-xl border px-3 py-2 ${
                    isCurrentField ? 'border-sky-400/40 bg-sky-400/[0.06]' : 'border-white/10 bg-white/[0.025]'
                  }`}
                >
                  <span className="text-sm font-semibold text-slate-300">{field.label}</span>
                  <span
                    aria-live={isCurrentField && isSpinning ? 'off' : 'polite'}
                    className={`text-right text-sm font-semibold sm:text-base ${
                      isSelected || (isCurrentField && isSpinning) ? 'text-white' : 'text-slate-600'
                    } ${isCurrentField && isSpinning ? 'animate-pulse' : ''}`}
                  >
                    {value}
                  </span>
                </li>
              )
            })}
          </ol>

          {allProfileFieldsSelected ? (
            <button
              type="button"
              onClick={() => setScreen('values')}
              className="mt-4 w-full rounded-lg bg-sky-400 px-5 py-2.5 font-bold text-slate-950 transition hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
            >
              理念・公約を選ぶ
            </button>
          ) : (
            <button
              type="button"
              disabled={isSpinning}
              onClick={() => setIsSpinning(true)}
              className="mt-4 w-full rounded-lg border border-sky-400/40 bg-sky-400/10 px-5 py-2.5 font-semibold text-sky-200 transition hover:bg-sky-400/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 disabled:cursor-wait disabled:opacity-60"
            >
              {isSpinning ? '抽選中…' : 'すべてのルーレットを回す'}
            </button>
          )}
        </section>
      </main>
    )
  }

  if (screen === 'values') {
    const updatePromise = (index, value) => {
      setPromises((current) => current.map((promise, promiseIndex) => (
        promiseIndex === index ? value : promise
      )))
    }

    return (
      <main className="min-h-screen bg-black px-4 py-10 text-slate-100 sm:px-6">
        <section className="mx-auto max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-sky-200/70">政権の方針</p>
          <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">理念と公約を選択</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            理念はイベントや総理への影響に、公約の達成状況は支持率などに影響します。
          </p>

          <div className="mt-8">
            <label htmlFor="ideology" className="mb-3 block text-lg font-semibold text-white">
              理念
            </label>
            <select
              id="ideology"
              value={ideology}
              onChange={(changeEvent) => setIdeology(changeEvent.target.value)}
              className="w-full rounded-xl border border-white/15 bg-[#111827] px-4 py-4 text-base text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
            >
              {ideologies.map((option) => <option key={option}>{option}</option>)}
            </select>
          </div>

          <fieldset className="mt-6">
            <legend className="mb-3 text-lg font-semibold text-white">公約</legend>
            <div className="space-y-3">
              {promises.map((promise, index) => (
                <div key={promise}>
                  <select
                    id={`promise-${index}`}
                    aria-label={`公約 ${index + 1}`}
                    value={promise}
                    onChange={(changeEvent) => updatePromise(index, changeEvent.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-[#111827] px-4 py-4 text-base text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                  >
                    {promiseOptions.map((option) => (
                      <option
                        key={option}
                        value={option}
                        disabled={promises.includes(option) && option !== promise}
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={() => setScreen('cabinet')}
            className="mt-8 w-full rounded-xl bg-sky-400 px-5 py-4 text-lg font-bold text-slate-950 transition hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            組閣する
          </button>
        </section>
      </main>
    )
  }

  if (screen === 'cabinet') {
    const currentPost = cabinetPosts[cabinetPostIndex]
    const availableCandidates = cabinetCandidates.filter((candidate) => (
      !Object.entries(cabinetAssignments).some(([post, assignedCandidateId]) => (
        post !== currentPost && assignedCandidateId === candidate.id
      ))
    ))
    const selectedCandidate = availableCandidates.find(
      (candidate) => candidate.id === cabinetCandidateId,
    )
    const currentCandidateIndex = Math.max(
      0,
      availableCandidates.findIndex((candidate) => candidate.id === selectedCandidate?.id),
    )
    const currentCandidate = availableCandidates[currentCandidateIndex]
    const assignedCandidate = cabinetCandidates.find(
      (candidate) => candidate.id === cabinetAssignments[currentPost],
    )

    const appointCandidate = () => {
      const candidate = selectedCandidate
        ?? availableCandidates[Math.floor(Math.random() * availableCandidates.length)]
      if (!candidate) return

      setCabinetAssignments((current) => ({ ...current, [currentPost]: candidate.id }))
    }

    const reviewCabinet = () => {
      setCabinetAssignments((current) => {
        const remainingCandidates = cabinetCandidates.filter(
          (candidate) => !Object.values(current).includes(candidate.id),
        )
        const completed = { ...current }

        cabinetPosts.forEach((post) => {
          if (completed[post]) return
          const candidateIndex = Math.floor(Math.random() * remainingCandidates.length)
          const [candidate] = remainingCandidates.splice(candidateIndex, 1)
          if (candidate) completed[post] = candidate.id
        })

        return completed
      })
      setScreen('cabinet-confirmation')
    }

    return (
      <main className="min-h-screen bg-[#090d16] px-4 py-4 text-slate-100 sm:px-6 sm:py-5">
        <section className="mx-auto max-w-6xl">
          <header className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">組閣</h1>
              <p className="mt-1 text-sm text-slate-300">
                大臣ポスト 全{cabinetPosts.length}名・うち{Object.keys(cabinetAssignments).length}名決定
              </p>
            </div>
            <button
              type="button"
              onClick={reviewCabinet}
              className="shrink-0 rounded-xl bg-sky-400 px-4 py-2.5 font-bold text-slate-950 transition hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
            >
              確認する
            </button>
          </header>

          <section aria-label="大臣ポスト" className="mt-5 rounded-2xl border border-white/10 bg-[#111827] p-3 sm:p-4">
            <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
              <button
                type="button"
                aria-label="前の大臣ポスト"
                onClick={() => {
                  setCabinetCandidateId(null)
                  setCabinetPostIndex((index) => (index - 1 + cabinetPosts.length) % cabinetPosts.length)
                }}
                className="rounded-full border border-white/15 px-3 py-1.5 text-xl text-slate-200 hover:bg-white/10"
              >
                ←
              </button>
              <div className="min-w-0 text-center">
                <p className="text-xs text-slate-400">大臣ポスト {cabinetPostIndex + 1} / {cabinetPosts.length}</p>
                <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">{currentPost}</h2>
                <button
                  type="button"
                  aria-label={`${currentPost}の説明を表示`}
                  aria-haspopup="dialog"
                  onClick={() => setIsCabinetHelpOpen(true)}
                  className="mt-1 text-xs text-sky-300 underline decoration-sky-300/40 underline-offset-2 hover:text-sky-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                >
                  ポストの説明
                </button>
              </div>
              <button
                type="button"
                aria-label="次の大臣ポスト"
                onClick={() => {
                  setCabinetCandidateId(null)
                  setCabinetPostIndex((index) => (index + 1) % cabinetPosts.length)
                }}
                className="rounded-full border border-white/15 px-3 py-1.5 text-xl text-slate-200 hover:bg-white/10"
              >
                →
              </button>
            </div>
          </section>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <section aria-labelledby="appointed-minister-title" className="rounded-2xl border border-white/10 bg-[#111827] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 id="appointed-minister-title" className="font-semibold text-slate-100">任命済</h3>
                {assignedCandidate && (
                  <button
                    type="button"
                    onClick={() => setCabinetAssignments((current) => {
                      const next = { ...current }
                      delete next[currentPost]
                      return next
                    })}
                    className="rounded-lg border border-white/20 px-3 py-1 text-sm font-semibold text-slate-200 transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                  >
                    解除
                  </button>
                )}
              </div>
              {assignedCandidate ? (
                <>
                  <div className="rounded-xl border border-white/15 bg-slate-800/70 p-3">
                    <div className="flex items-start gap-3">
                      <CandidatePortrait candidate={assignedCandidate} className="h-20 w-20 shrink-0 rounded-lg border border-white/15 sm:h-24 sm:w-24" />
                      <div className="min-w-0">
                        <p className="font-bold text-white">{currentPost}</p>
                        <p className="mt-0.5 text-lg font-semibold text-slate-100">{assignedCandidate.name}</p>
                        <p className="text-sm text-slate-300">{assignedCandidate.district}・{assignedCandidate.experience}</p>
                        <p className="mt-1 text-xs text-slate-400">{assignedCandidate.age}歳・{assignedCandidate.party}・{assignedCandidate.chamber}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <button
                            type="button"
                            aria-haspopup="dialog"
                            onClick={() => setCabinetDetail({ candidate: assignedCandidate, type: 'biography' })}
                            className="rounded-md border border-white/25 px-3 py-1 text-xs font-semibold text-slate-100 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                          >
                            略歴
                          </button>
                          <button
                            type="button"
                            aria-haspopup="dialog"
                            onClick={() => setCabinetDetail({ candidate: assignedCandidate, type: 'vetting' })}
                            className="rounded-md border border-white/25 px-3 py-1 text-xs font-semibold text-slate-100 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                          >
                            身体検査
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                    <p><span className="block text-slate-400">人気</span>{assignedCandidate.influence}</p>
                    <p><span className="block text-slate-400">実務</span>{assignedCandidate.administration}</p>
                    <p><span className="block text-slate-400">答弁</span>{assignedCandidate.debate}</p>
                  </div>
                </>
              ) : (
                <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-white/20 bg-slate-800/40 p-4 text-center">
                  <div>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg border border-white/20 bg-slate-900 text-2xl text-slate-400">?</div>
                    <p className="mt-3 font-semibold text-slate-200">未任命</p>
                    <p className="mt-1 text-sm text-slate-400">右側から候補者を選んでください</p>
                  </div>
                </div>
              )}
            </section>

            <section aria-label="人材プール" className="rounded-2xl border border-sky-300/25 bg-sky-300/[0.06] p-4">
              <button
                type="button"
                onClick={appointCandidate}
                disabled={!currentCandidate}
                className="mb-3 w-full rounded-lg bg-sky-400 px-4 py-2.5 font-bold text-slate-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
              >
                {cabinetCandidateId ? 'この候補者を任命する' : '候補者をランダムに任命する'}
              </button>
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  aria-label="前の候補者"
                  disabled={availableCandidates.length < 2}
                  onClick={() => {
                    const index = (currentCandidateIndex - 1 + availableCandidates.length) % availableCandidates.length
                    setCabinetCandidateId(availableCandidates[index].id)
                  }}
                  className="rounded-full border border-white/20 px-3 py-1.5 text-xl text-slate-100 hover:bg-white/10 disabled:opacity-40"
                >
                  ←
                </button>
                <div className="text-center">
                  <h3 className="font-semibold text-sky-100">任命候補</h3>
                  <p className="mt-0.5 text-xs text-slate-300">
                    {currentCandidate ? `候補者 ${cabinetCandidates.indexOf(currentCandidate) + 1} / ${cabinetCandidates.length}` : '候補者なし'}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="次の候補者"
                  disabled={availableCandidates.length < 2}
                  onClick={() => {
                    const index = (currentCandidateIndex + 1) % availableCandidates.length
                    setCabinetCandidateId(availableCandidates[index].id)
                  }}
                  className="rounded-full border border-white/20 px-3 py-1.5 text-xl text-slate-100 hover:bg-white/10 disabled:opacity-40"
                >
                  →
                </button>
              </div>
              {currentCandidate ? (
                <div className="mt-3 rounded-xl border border-sky-200/20 bg-[#111827]/80 p-3">
                  <div className="flex items-start gap-3">
                    <CandidatePortrait candidate={currentCandidate} className="h-20 w-20 shrink-0 rounded-lg border border-white/15 sm:h-24 sm:w-24" />
                    <div className="min-w-0">
                      <p className="text-lg font-bold text-white">{currentCandidate.name}</p>
                      <p className="mt-0.5 text-sm text-slate-300">{currentCandidate.district}・{currentCandidate.experience}</p>
                      <p className="text-xs text-slate-400">{currentCandidate.age}歳・{currentCandidate.party}・{currentCandidate.chamber}</p>
                      <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
                        <p><span className="block text-slate-400">人気</span>{currentCandidate.influence}</p>
                        <p><span className="block text-slate-400">実務</span>{currentCandidate.administration}</p>
                        <p><span className="block text-slate-400">答弁</span>{currentCandidate.debate}</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 border-t border-white/10 pt-2 text-sm leading-5 text-slate-300">{currentCandidate.note}</p>
                  <p className="mt-2 text-sm leading-5 text-slate-300">{currentCandidate.vetting}</p>
                </div>
              ) : (
                <p className="mt-3 rounded-xl border border-white/10 p-4 text-center text-sm text-slate-300">
                  任命できる候補者がいません。任命を解除するか、組閣を完了してください。
                </p>
              )}
            </section>
          </div>
        </section>
        {isCabinetHelpOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setIsCabinetHelpOpen(false)}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="cabinet-help-title"
              className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111827] p-5 text-slate-100 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <h2 id="cabinet-help-title" className="text-lg font-bold text-white">{currentPost}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{cabinetPostDescriptions[currentPost]}</p>
              <button
                type="button"
                onClick={() => setIsCabinetHelpOpen(false)}
                className="mt-4 w-full rounded-lg bg-sky-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
              >
                閉じる
              </button>
            </section>
          </div>
        )}
        {cabinetDetail && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setCabinetDetail(null)}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="cabinet-detail-title"
              className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111827] p-5 text-slate-100 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <h2 id="cabinet-detail-title" className="text-lg font-bold text-white">
                {cabinetDetail.type === 'biography' ? '略歴' : '身体検査'}
              </h2>
              <p className="mt-1 text-sm text-slate-400">{cabinetDetail.candidate.name}</p>
              <p className="mt-3 text-sm leading-6 text-slate-200">
                {cabinetDetail.type === 'biography'
                  ? cabinetDetail.candidate.note
                  : cabinetDetail.candidate.vetting}
              </p>
              <button
                type="button"
                onClick={() => setCabinetDetail(null)}
                className="mt-4 w-full rounded-lg bg-sky-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
              >
                閉じる
              </button>
            </section>
          </div>
        )}
      </main>
    )
  }

  if (screen === 'cabinet-confirmation') {
    return (
      <main className="min-h-screen bg-[#090d16] px-4 py-6 text-slate-100 sm:px-6">
        <section className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold text-white">組閣内容の確認</h1>
          <ol aria-label="組閣内容" className="mt-5 space-y-3">
            {cabinetPosts.map((post) => {
              const candidate = cabinetCandidates.find(
                (member) => member.id === cabinetAssignments[post],
              )

              if (!candidate) return null

              return (
                <li
                  key={post}
                  className="flex flex-col gap-3 rounded-xl border border-white/10 bg-[#111827] p-3 md:flex-row md:items-center md:gap-4"
                >
                  <h2 className="w-full shrink-0 text-lg font-bold text-sky-200 md:w-36">
                    {post}
                  </h2>
                  <CandidatePortrait
                    candidate={candidate}
                    className="h-16 w-16 shrink-0 self-center rounded-full md:self-auto"
                  />
                  <p className="shrink-0 text-center text-lg font-semibold text-white md:w-32 md:text-left">
                    {candidate.name}
                  </p>
                  <div className="min-w-0 flex-1 text-center text-sm leading-6 text-slate-300 md:text-left">
                    <p>{candidate.party}・{candidate.chamber}</p>
                    <p>{candidate.district}・{candidate.experience}・{candidate.age}歳</p>
                    <div className="mt-2 flex flex-wrap justify-center gap-2 md:justify-start">
                      <button
                        type="button"
                        aria-haspopup="dialog"
                        onClick={() => setCabinetDetail({ candidate, type: 'biography' })}
                        className="rounded-md border border-white/25 px-3 py-1 text-xs font-semibold text-slate-100 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                      >
                        略歴
                      </button>
                      <button
                        type="button"
                        aria-haspopup="dialog"
                        onClick={() => setCabinetDetail({ candidate, type: 'vetting' })}
                        className="rounded-md border border-white/25 px-3 py-1 text-xs font-semibold text-slate-100 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                      >
                        身体検査
                      </button>
                    </div>
                  </div>
                  <dl className="grid shrink-0 grid-cols-3 gap-2 text-center text-xs md:w-52">
                    {[
                      { label: '人気', value: candidate.influence },
                      { label: '実務力', value: candidate.administration },
                      { label: '答弁力', value: candidate.debate },
                    ].map(({ label, value }) => (
                      <div key={label} className="rounded-lg bg-white/[0.04] px-2 py-2">
                        <dt className="text-slate-400">{label}</dt>
                        <dd className="mt-1 text-base font-semibold tabular-nums text-white">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </li>
              )
            })}
          </ol>
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => setScreen('cabinet')}
              className="rounded-xl border border-white/15 px-5 py-3 font-semibold text-slate-200 transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
            >
              戻る
            </button>
            <button
              type="button"
              onClick={() => setScreen('office')}
              className="rounded-xl bg-sky-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
            >
              組閣する
            </button>
          </div>
        </section>
      </main>
    )
  }

  const makeDecision = (choice) => {
    const effects = getChoiceEffects(choice)
    setStatus((current) =>
      Object.fromEntries(
        Object.entries(effects).map(([key, change]) => [
          key,
          clamp(current[key] + change),
        ]),
      ),
    )
    setHistory((current) => [
      {
        turn: completedEventCount + 1,
        date: gameDate,
        category: event.category,
        title: event.title,
        choice: choice.label,
        detail: choice.detail,
        isDecision: true,
      },
      ...current,
    ])
    setCompletedEventCount((current) => current + 1)
    setIsDecisionOpen(false)
    setEventIndex(null)
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#090d16] text-slate-100">
      <header className="shrink-0 border-b border-white/10 bg-[#0d1320]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2.5 px-2.5 py-2.5 sm:px-4">
          <h1 className="text-sm font-bold text-white sm:text-base">{primeMinisterName}内閣</h1>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <div className="flex flex-wrap items-center justify-end gap-1.5">
              <div className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1">
                <span className="text-xs text-slate-400">在任</span>
                <span className="ml-1.5 font-semibold tabular-nums text-white">{tenureMonths}ヶ月</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal('promises')}
                className="flex items-center gap-1 rounded-lg border border-amber-300/20 bg-amber-300/10 px-2 py-1 text-sm text-amber-200 transition hover:bg-amber-300/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
              >
                <span className="text-amber-300">◆</span>
                <span className="font-semibold">公約</span>
                <span className="hidden text-amber-100/70 sm:inline">暮らしと未来を守る</span>
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-xs tabular-nums text-slate-400">
              {isDietSession && (
                <span className="rounded-md border border-amber-300/25 bg-amber-300/10 px-1.5 py-0.5 font-semibold text-amber-200">
                  国会会期中
                </span>
              )}
              <span>{gameDate}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col overflow-hidden space-y-3.5 px-2.5 py-3 sm:px-4 sm:py-4.5">
        <section aria-label="首相官邸と内閣の状況" className="grid shrink-0 gap-2 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-52 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#182437] to-[#101723] p-2.5 sm:min-h-64 sm:p-3.5">
            <div className="relative z-10">
              <p className="text-xs font-semibold tracking-[0.2em] text-sky-200/70">首相官邸 · 執務室</p>
              <h2 className="mt-1 text-lg font-bold text-white sm:text-xl">国の未来を決める場所</h2>
            </div>
            <OfficeIllustration className="absolute inset-x-0 bottom-0 h-4/5 w-full" season={season} />
            <button
              type="button"
              onClick={() => setActiveModal('phone')}
              className="absolute bottom-2 left-2 z-10 rounded-lg border border-emerald-300/30 bg-emerald-950/80 px-2.5 py-1.5 text-xs font-semibold text-emerald-100 shadow-lg transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 sm:bottom-3 sm:left-3 sm:text-sm"
            >
              ☎ 電話する
            </button>
            <div className="absolute bottom-2 right-2.5 rounded-full border border-white/10 bg-[#0b111bd9] px-1.5 py-0.5 text-[10px] tracking-widest text-slate-400">
              PRIME MINISTER'S OFFICE
            </div>
          </div>

          <section aria-label="内閣の状況" className="rounded-2xl border border-white/10 bg-[#111827] p-2 sm:p-2.5">
            <div className="grid grid-cols-5 gap-1.5">
              {metrics.map((metric) => (
                <button
                  key={metric.key}
                  type="button"
                  onClick={() => setActiveModal(metric.key)}
                  aria-label={`${metric.label}の詳細を表示`}
                  className="min-w-0 rounded-lg p-1 text-left transition hover:bg-white/[0.05] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-sky-400"
                >
                  <div className="mb-1 flex flex-col">
                    <span className="text-[10px] font-medium leading-4 text-slate-300 sm:text-xs">{metric.label}</span>
                    <span className={`text-base font-bold tabular-nums sm:text-lg ${metric.text}`}>
                      {status[metric.key]}
                    </span>
                  </div>
                  <div
                    role="progressbar"
                    aria-label={metric.label}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={status[metric.key]}
                    className="h-1.5 overflow-hidden rounded-full bg-slate-800"
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${metric.color}`}
                      style={{ width: `${status[metric.key]}%` }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </section>
        </section>

        <section aria-label="ゲームの進行速度" className="flex shrink-0 items-center justify-end gap-1.5">
          <span className="mr-1 text-xs text-slate-400">進行速度</span>
          {[1, 2, 3].map((speed) => (
            <button
              key={speed}
              type="button"
              aria-pressed={gameSpeed === speed}
              onClick={() => setGameSpeed(speed)}
              className={`min-w-10 rounded-lg border px-2 py-1 text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${
                gameSpeed === speed
                  ? 'border-sky-400/50 bg-sky-400/15 text-sky-200'
                  : 'border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.08]'
              }`}
            >
              {speed}x
            </button>
          ))}
        </section>

        <section aria-label="イベントのタイムライン" className="flex min-h-0 flex-1 flex-col">
          <div className="mb-2 flex shrink-0 items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="h-4 w-1 rounded-full bg-rose-400" />
              <h2 className="text-sm font-bold tracking-wider text-slate-200">政権のタイムライン</h2>
            </div>
            <span className="text-xs text-slate-500">{history.length + (event ? 1 : 0)}件</span>
          </div>
          <ol className="relative min-h-0 flex-1 space-y-1.5 overflow-y-auto overscroll-contain before:absolute before:bottom-6 before:left-[15px] before:top-6 before:w-px before:bg-white/10">
            {event ? (
              <li className="relative pl-10">
                <span className="absolute left-[9px] top-5 size-3.5 rounded-full border-[3px] border-[#090d16] bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.55)]" />
                <article className="rounded-xl border border-rose-400/30 bg-rose-400/[0.06] p-2 sm:p-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold tabular-nums text-rose-200">TURN {String(completedEventCount + 1).padStart(2, '0')}</span>
                      <span className="rounded-full border border-rose-300/25 bg-rose-300/10 px-1.5 py-0.5 text-[11px] font-semibold text-rose-200">
                        {event.category}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold tracking-wide text-rose-300">選択待ち</span>
                  </div>
                  <h3 className="mt-1.5 text-lg font-extrabold text-rose-100">{event.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-300">{event.description}</p>
                  <p className="mt-2 text-xs font-semibold text-rose-200">選択モーダルで対応してください</p>
                </article>
              </li>
            ) : (
              <li className="relative pl-10">
                <span className="absolute left-[10px] top-4 size-3 rounded-full border-2 border-[#090d16] bg-slate-600" />
                <p className="rounded-xl border border-white/[0.07] bg-[#0e1420] px-2.5 py-2 text-xs text-slate-500">
                  次のイベントを待っています
                </p>
              </li>
            )}
            {history.map((item) => (
              <li key={`${item.turn}-${item.title}`} className="relative pl-10">
                <span className={`absolute left-[10px] top-5 size-3 rounded-full border-2 border-[#090d16] ${item.isDecision ? 'bg-rose-400' : 'bg-violet-400'}`} />
                <article className={`rounded-xl px-2 py-2 sm:px-2.5 ${item.isDecision ? 'border border-rose-400/15 bg-rose-400/[0.035]' : 'border border-white/[0.07] bg-[#0e1420]'}`}>
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="text-xs font-semibold tabular-nums text-slate-500">
                      {item.isDecision ? `TURN ${String(item.turn).padStart(2, '0')}` : item.turn}
                    </span>
                    {item.date && <span className="text-[11px] tabular-nums text-slate-500">{item.date}</span>}
                    <span className="text-[11px] text-slate-500">{item.category}</span>
                    <span className={`ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${item.isDecision ? 'bg-rose-400/10 text-rose-300' : 'bg-emerald-400/10 text-emerald-300'}`}>
                      {item.isDecision ? '決定済み' : '実施済み'}
                    </span>
                  </div>
                  <h3 className={`mt-1 text-sm ${item.isDecision ? 'font-bold text-rose-100' : 'font-semibold text-slate-200'}`}>{item.title}</h3>
                  <p className="mt-0.5 text-xs leading-5 text-slate-400">
                    {item.choice ? `${item.choice} — ` : ''}{item.detail}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <p className="shrink-0 pb-1.5 text-center text-[11px] tracking-wide text-slate-600">
          DECISIONS SHAPE THE FUTURE · あなたの選択が国の未来をつくる
        </p>
      </main>

      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-2 backdrop-blur-sm sm:items-center"
          onClick={() => setActiveModal(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="details-title"
            onClick={(clickEvent) => clickEvent.stopPropagation()}
            className={`w-full rounded-2xl border border-white/10 bg-[#111827] shadow-2xl shadow-black/50 ${
              activeModal === 'public'
                ? 'max-h-[calc(100dvh-1rem)] max-w-3xl overflow-y-auto p-3 sm:max-h-[calc(100dvh-2rem)] sm:p-5'
                : 'max-w-lg p-4'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-sky-300">
                  {activeModal === 'promises'
                    ? 'あなたが選んだ公約'
                    : activeModal === 'phone'
                      ? '官邸から連絡'
                      : activeModal === 'public'
                        ? '内閣の状況 · 世論'
                        : '内閣指標の内訳'}
                </p>
                <h2 id="details-title" className="mt-1 text-xl font-bold text-white">
                  {activeModal === 'promises'
                    ? '公約一覧'
                    : activeModal === 'phone'
                      ? '電話する'
                      : activeModal === 'public'
                        ? '世論の状況'
                      : `${metrics.find((metric) => metric.key === activeModal)?.label}の状況`}
                </h2>
              </div>
              <button
                type="button"
                autoFocus
                onClick={() => setActiveModal(null)}
                aria-label="閉じる"
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-lg text-slate-400 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-sky-400"
              >
                ×
              </button>
            </div>
            {activeModal === 'promises' ? (
              <ul className="mt-4 space-y-2">
                {promises.map((promise) => (
                  <li key={promise} className="rounded-xl border border-amber-300/15 bg-amber-300/[0.04] p-3 text-sm font-medium text-amber-100">
                    <span className="mr-2 text-amber-300">◆</span>{promise}
                  </li>
                ))}
              </ul>
            ) : activeModal === 'phone' ? (
              <div className="mt-4 grid gap-2">
                {['官房長官に連絡する', '各省庁に指示を出す', '国民にメッセージを伝える'].map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left text-sm font-semibold text-slate-100 transition hover:border-emerald-300/30 hover:bg-emerald-300/[0.06] focus-visible:outline-2 focus-visible:outline-emerald-300"
                  >
                    {action} <span className="float-right text-slate-500">→</span>
                  </button>
                ))}
                <p className="text-xs text-slate-500">各アクションは今後のアップデートで利用可能になります。</p>
              </div>
            ) : activeModal === 'public' ? (
              <OpinionDetails support={status.public} />
            ) : (
              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-slate-300">
                    {metrics.find((metric) => metric.key === activeModal)?.label}
                  </span>
                  <span className={`text-2xl font-bold tabular-nums ${metrics.find((metric) => metric.key === activeModal)?.text}`}>
                    {status[activeModal]}
                  </span>
                </div>
                <div className="mt-3 space-y-2 border-t border-white/10 pt-3 text-sm">
                  <p className="flex justify-between text-slate-400"><span>前月比</span><span className="text-emerald-300">+2</span></p>
                  <p className="flex justify-between text-slate-400"><span>今月の動向</span><span className="text-slate-200">安定</span></p>
                  <p className="text-xs leading-5 text-slate-500">詳細な内訳は今後の政策判断によって変化します。</p>
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {isDecisionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/40 p-4 backdrop-blur-sm">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="decision-title"
            className="h-[90dvh] w-[90vw] overflow-y-auto rounded-xl border border-white/10 bg-[#111827] p-3 shadow-2xl shadow-black/50 sm:p-5"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-rose-300">直面する課題 · {event.category}</p>
              <h2 id="decision-title" className="mt-1 text-xl font-bold text-white sm:text-2xl">{event.title}</h2>
            </div>
            <div className="relative mt-3 aspect-[640/280] w-full overflow-hidden rounded-xl border border-white/10">
              <OfficeIllustration className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" idPrefix="decision-office" season={season} />
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-300">{event.description}</p>
            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold tracking-wider text-slate-400">あなたの決断</p>
              <div className="grid gap-3">
                {event.choices.map((choice, index) => (
                  <div key={choice.label} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.025]">
                    <button
                      type="button"
                      autoFocus={index === 0}
                      onClick={() => makeDecision(choice)}
                      className="group flex w-full items-start gap-2 p-3 text-left transition hover:bg-sky-400/[0.06] focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-sky-400"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-slate-800 text-sm font-bold text-slate-300 transition group-hover:border-sky-400/30 group-hover:text-sky-300">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-slate-100 sm:text-base">{choice.label}</span>
                        <span className="mt-0.5 block text-xs leading-5 text-slate-400 sm:text-sm">{choice.detail}</span>
                      </span>
                      <span aria-hidden="true" className="ml-auto pt-1 text-slate-600 transition group-hover:translate-x-1 group-hover:text-sky-300">→</span>
                    </button>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 border-t border-white/[0.07] px-3 py-2">
                      <span className="w-full text-[11px] font-semibold text-slate-500">選択による効果（ダミー）</span>
                      {Object.entries(getChoiceEffects(choice)).map(([key, change]) => (
                        <span key={key} className={`text-xs ${change >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                          {metricLabels[key]} {change > 0 ? '+' : ''}{change}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
