import { useState } from 'react'

const metrics = [
  { key: 'public', label: '世論', color: 'bg-sky-400', text: 'text-sky-300' },
  { key: 'party', label: '党内支持', color: 'bg-violet-400', text: 'text-violet-300' },
  { key: 'happiness', label: '国民幸福度', color: 'bg-emerald-400', text: 'text-emerald-300' },
  { key: 'power', label: '国力', color: 'bg-amber-400', text: 'text-amber-300' },
]

const events = [
  {
    category: '財政・社会保障',
    title: '痛みを伴う改革',
    description:
      '膨らみ続ける社会保障費を抑えるため、給付の見直しが避けられません。将来世代への責任を果たす一方で、生活への影響を懸念する声が広がっています。',
    choices: [
      {
        label: '給付を見直し、財政再建を急ぐ',
        detail: '財政規律を優先。負担増への反発は避けられない。',
        effects: { public: -8, party: -5, happiness: -7, power: 8 },
      },
      {
        label: '段階的な改革と低所得者支援を進める',
        detail: '時間をかけて合意形成。支援策で改革の痛みを和らげる。',
        effects: { public: 3, party: 2, happiness: 4, power: 2 },
      },
    ],
  },
  {
    category: '経済・財政',
    title: '先送りと国債発行',
    description:
      '景気回復の兆しは弱く、企業や家計から追加支援を求める声が届いています。財源を国債に頼れば、将来の負担はさらに重くなります。',
    choices: [
      {
        label: '国債を発行し、緊急の景気対策を行う',
        detail: '目先の暮らしを支えるが、財政への不安が高まる。',
        effects: { public: 6, party: 3, happiness: 5, power: -7 },
      },
      {
        label: '支出を絞り、財政健全化を優先する',
        detail: '将来への責任を示す一方、景気の冷え込みが懸念される。',
        effects: { public: -5, party: -2, happiness: -4, power: 6 },
      },
      {
        label: '期限を区切った支援と歳出改革を同時に進める',
        detail: '双方に負担を求める難しい調整が始まる。',
        effects: { public: 1, party: -1, happiness: 1, power: 2 },
      },
    ],
  },
  {
    category: 'エネルギー・環境',
    title: '電力不足と脱炭素',
    description:
      '猛暑で電力需要が急増し、供給余力がひっ迫しています。安定供給を急ぐのか、脱炭素への道筋を守るのか、政府の判断が問われています。',
    choices: [
      {
        label: '既存電源を活用して供給を確保する',
        detail: '電力の安定が見込めるが、環境面で批判が出る。',
        effects: { public: 2, party: 4, happiness: 3, power: 5 },
      },
      {
        label: '再生可能エネルギーへの投資を加速する',
        detail: '脱炭素を後押しする一方、短期的な供給不安が残る。',
        effects: { public: -1, party: -2, happiness: 1, power: 4 },
      },
    ],
  },
  {
    category: '外交・安全保障',
    title: '防衛費の拡大',
    description:
      '周辺地域の緊張が高まり、防衛力の強化を求める声が強まっています。増税による財源確保には、国民から慎重な意見も上がっています。',
    choices: [
      {
        label: '増税を含めて防衛力を強化する',
        detail: '抑止力を高めるが、家計への負担が増す。',
        effects: { public: -4, party: 3, happiness: -3, power: 7 },
      },
      {
        label: '外交を優先し、増額は段階的に行う',
        detail: '財政負担を抑えつつ対話を続ける。党内からは慎重論も。',
        effects: { public: 3, party: -3, happiness: 2, power: -2 },
      },
    ],
  },
]

const clamp = (value) => Math.min(100, Math.max(0, value))
const getNextEventIndex = (currentIndex) => {
  const nextEvents = events.map((_, index) => index).filter((index) => index !== currentIndex)
  return nextEvents[Math.floor(Math.random() * nextEvents.length)]
}

function App() {
  const [status, setStatus] = useState({
    public: 50,
    party: 50,
    happiness: 50,
    power: 50,
  })
  const [turn, setTurn] = useState(1)
  const [history, setHistory] = useState([])
  const [eventIndex, setEventIndex] = useState(0)
  const [isDecisionOpen, setIsDecisionOpen] = useState(false)
  const event = events[eventIndex]

  const makeDecision = (choice) => {
    setStatus((current) =>
      Object.fromEntries(
        Object.entries(choice.effects).map(([key, change]) => [
          key,
          clamp(current[key] + change),
        ]),
      ),
    )
    setHistory((current) => [
      {
        turn,
        category: event.category,
        title: event.title,
        choice: choice.label,
        detail: choice.detail,
      },
      ...current,
    ])
    setTurn((current) => current + 1)
    setIsDecisionOpen(false)
    setEventIndex(getNextEventIndex(eventIndex))
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100">
      <header className="border-b border-white/10 bg-[#0d1320]">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/10 text-xl font-bold text-amber-300">
              政
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-slate-400">日本国政府</p>
              <h1 className="mt-1 text-xl font-bold tracking-wide text-white sm:text-2xl">
                第108代内閣総理大臣
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2">
              <span className="text-xs text-slate-400">在任</span>
              <span className="ml-3 font-semibold tabular-nums text-white">{turn}ヶ月</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm text-amber-200">
              <span className="text-amber-300">◆</span>
              <span className="font-semibold">公約</span>
              <span className="hidden text-amber-100/70 sm:inline">暮らしと未来を守る</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-7 px-5 py-6 sm:px-8 sm:py-9">
        <section aria-label="首相官邸と内閣の状況" className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-52 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#182437] to-[#101723] p-5 sm:min-h-64 sm:p-7">
            <div className="relative z-10">
              <p className="text-xs font-semibold tracking-[0.2em] text-sky-200/70">首相官邸 · 執務室</p>
              <h2 className="mt-2 text-lg font-bold text-white sm:text-xl">国の未来を決める場所</h2>
            </div>
            <svg
              aria-hidden="true"
              viewBox="0 0 640 280"
              className="absolute inset-x-0 bottom-0 h-4/5 w-full"
              preserveAspectRatio="xMidYMax slice"
            >
              <defs>
                <linearGradient id="officeSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#223751" />
                  <stop offset="1" stopColor="#111b29" />
                </linearGradient>
                <linearGradient id="desk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#624c3a" />
                  <stop offset="1" stopColor="#332b27" />
                </linearGradient>
              </defs>
              <path d="M0 0h640v228H0z" fill="url(#officeSky)" />
              <path d="M30 18h255v156H30z" fill="#101a28" stroke="#536174" strokeWidth="8" />
              <path d="M42 30h231v132H42z" fill="#1b3045" />
              <path d="M157 30v132M42 96h231" stroke="#536174" strokeWidth="5" />
              <path d="M46 132h24V93h31v39h18V76h37v56h22v-30h32v30h19v-46h34v46h10v30H46z" fill="#26384a" />
              <circle cx="224" cy="57" r="12" fill="#f2c779" opacity=".75" />
              <path d="M307 24h275v157H307z" fill="#182334" stroke="#39495c" strokeWidth="5" />
              <path d="M337 49h213v94H337z" fill="#233448" />
              <path d="M353 74h181M353 95h181M353 116h134" stroke="#42566c" strokeWidth="5" opacity=".8" />
              <path d="M0 205h640v75H0z" fill="#101722" />
              <path d="M62 193h518l-34 48H98z" fill="url(#desk)" />
              <path d="M118 241h28v39h-28zm380 0h28v39h-28z" fill="#342a25" />
              <path d="M421 161v40" stroke="#b8c4d5" strokeWidth="3" />
              <path d="M424 163h38v26h-38z" fill="#f7f4ed" />
              <circle cx="443" cy="176" r="7" fill="#c94b50" />
              <path d="M211 207h119l13 15H197z" fill="#171e28" />
              <path d="M227 191h86v16h-86z" fill="#29384a" />
            </svg>
            <div className="absolute bottom-4 right-5 rounded-full border border-white/10 bg-[#0b111bd9] px-3 py-1 text-[10px] tracking-widest text-slate-400">
              PRIME MINISTER'S OFFICE
            </div>
          </div>

          <section aria-label="内閣の状況" className="rounded-2xl border border-white/10 bg-[#111827] p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-4 w-1 rounded-full bg-sky-400" />
                <h2 className="text-sm font-bold tracking-wider text-slate-200">内閣の状況</h2>
              </div>
              <span className="text-xs text-slate-500">TURN {String(turn).padStart(2, '0')}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              {metrics.map((metric) => (
                <div key={metric.key}>
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-slate-300 sm:text-sm">{metric.label}</span>
                    <span className={`text-lg font-bold tabular-nums ${metric.text}`}>
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
                </div>
              ))}
            </div>
          </section>
        </section>

        <section aria-label="イベントのタイムライン">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-4 w-1 rounded-full bg-rose-400" />
              <h2 className="text-sm font-bold tracking-wider text-slate-200">政権のタイムライン</h2>
            </div>
            <span className="text-xs text-slate-500">{history.length + 1}件</span>
          </div>
          <ol className="relative space-y-3 before:absolute before:bottom-6 before:left-[15px] before:top-6 before:w-px before:bg-white/10">
            <li className="relative pl-10">
              <span className="absolute left-[9px] top-5 size-3.5 rounded-full border-[3px] border-[#090d16] bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.55)]" />
              <article className="rounded-xl border border-rose-400/20 bg-[#111827] p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold tabular-nums text-slate-500">TURN {String(turn).padStart(2, '0')}</span>
                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-slate-400">
                      {event.category}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold tracking-wide text-rose-300">対応待ち</span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-white">{event.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{event.description}</p>
                <button
                  type="button"
                  onClick={() => setIsDecisionOpen(true)}
                  className="mt-4 rounded-lg border border-sky-400/30 bg-sky-400/[0.08] px-4 py-2 text-sm font-semibold text-sky-200 transition hover:border-sky-300/60 hover:bg-sky-400/[0.14] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                >
                  議題を確認して判断する <span aria-hidden="true">→</span>
                </button>
              </article>
            </li>
            {history.map((item) => (
              <li key={item.turn} className="relative pl-10">
                <span className="absolute left-[10px] top-5 size-3 rounded-full border-2 border-[#090d16] bg-violet-400" />
                <article className="rounded-xl border border-white/[0.07] bg-[#0e1420] px-4 py-4 sm:px-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold tabular-nums text-slate-500">TURN {String(item.turn).padStart(2, '0')}</span>
                    <span className="text-[11px] text-slate-500">{item.category}</span>
                    <span className="ml-auto rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">決定済み</span>
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-slate-200">{item.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{item.choice} — {item.detail}</p>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <p className="pb-3 text-center text-[11px] tracking-wide text-slate-600">
          DECISIONS SHAPE THE FUTURE · あなたの選択が国の未来をつくる
        </p>
      </main>

      {isDecisionOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          onClick={() => setIsDecisionOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="decision-title"
            onClick={(clickEvent) => clickEvent.stopPropagation()}
            onKeyDown={(keyEvent) => {
              if (keyEvent.key === 'Escape') setIsDecisionOpen(false)
            }}
            className="max-h-[90vh] w-full overflow-y-auto rounded-t-2xl border border-white/10 bg-[#111827] p-5 shadow-2xl shadow-black/50 sm:max-w-2xl sm:rounded-2xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-rose-300">直面する課題 · {event.category}</p>
                <h2 id="decision-title" className="mt-2 text-xl font-bold text-white sm:text-2xl">{event.title}</h2>
              </div>
              <button
                type="button"
                autoFocus
                onClick={() => setIsDecisionOpen(false)}
                aria-label="閉じる"
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-lg text-slate-400 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-sky-400"
              >
                ×
              </button>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">{event.description}</p>
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold tracking-wider text-slate-400">あなたの決断</p>
              <div className="grid gap-3">
                {event.choices.map((choice, index) => (
                  <button
                    key={choice.label}
                    type="button"
                    onClick={() => makeDecision(choice)}
                    className="group flex w-full items-start gap-4 rounded-xl border border-white/10 bg-white/[0.025] p-4 text-left transition hover:border-sky-400/50 hover:bg-sky-400/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 sm:p-5"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-slate-800 text-sm font-bold text-slate-300 transition group-hover:border-sky-400/30 group-hover:text-sky-300">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-slate-100 sm:text-base">{choice.label}</span>
                      <span className="mt-1 block text-xs leading-5 text-slate-400 sm:text-sm">{choice.detail}</span>
                    </span>
                    <span aria-hidden="true" className="ml-auto pt-1 text-slate-600 transition group-hover:translate-x-1 group-hover:text-sky-300">→</span>
                  </button>
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
