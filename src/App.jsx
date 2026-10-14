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
        title: event.title,
        choice: choice.label,
        detail: choice.detail,
      },
      ...current,
    ])
    setTurn((current) => current + 1)

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

      <main className="mx-auto max-w-6xl space-y-6 px-5 py-7 sm:px-8 sm:py-9">
        <section aria-label="内閣のステータス">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-4 w-1 rounded-full bg-sky-400" />
            <h2 className="text-sm font-bold tracking-wider text-slate-200">内閣の状況</h2>
            <span className="text-xs text-slate-500">TURN {String(turn).padStart(2, '0')}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.key} className="rounded-xl border border-white/10 bg-[#111827] p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-300">{metric.label}</span>
                  <span className={`text-xl font-bold tabular-nums ${metric.text}`}>
                    {status[metric.key]}
                  </span>
                </div>
                <div
                  role="progressbar"
                  aria-label={metric.label}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={status[metric.key]}
                  className="h-2 overflow-hidden rounded-full bg-slate-800"
                >
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${metric.color}`}
                    style={{ width: `${status[metric.key]}%` }}
                  />
                </div>
                <p className="mt-2 text-right text-[11px] text-slate-500">100</p>
              </div>
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#111827] shadow-2xl shadow-black/20">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 sm:px-7">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.6)]" />
              <span className="text-xs font-bold tracking-[0.18em] text-rose-300">直面する課題</span>
            </div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
              {event.category}
            </span>
          </div>
          <div className="px-5 py-6 sm:px-7 sm:py-8">
            <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">{event.title}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              {event.description}
            </p>
            <div className="mt-7">
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
                      <span className="mt-1 block text-xs leading-5 text-slate-400 sm:text-sm">
                        {choice.detail}
                      </span>
                    </span>
                    <span aria-hidden="true" className="ml-auto pt-1 text-slate-600 transition group-hover:translate-x-1 group-hover:text-sky-300">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section aria-label="決断の履歴">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-4 w-1 rounded-full bg-violet-400" />
              <h2 className="text-sm font-bold tracking-wider text-slate-200">決断の記録</h2>
            </div>
            <span className="text-xs text-slate-500">{history.length}件</span>
          </div>
          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0e1420]">
            {history.length === 0 ? (
              <p className="px-5 py-6 text-center text-sm text-slate-500">
                まだ記録はありません。最初の決断を下してください。
              </p>
            ) : (
              <ol className="divide-y divide-white/[0.07]">
                {history.map((item) => (
                  <li key={item.turn} className="flex gap-4 px-5 py-4">
                    <span className="pt-0.5 text-xs font-semibold tabular-nums text-slate-500">
                      #{String(item.turn).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-200">{item.title}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        {item.choice} — {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>
        <p className="pb-3 text-center text-[11px] tracking-wide text-slate-600">
          DECISIONS SHAPE THE FUTURE · あなたの選択が国の未来をつくる
        </p>
      </main>
    </div>
  )
}

export default App
