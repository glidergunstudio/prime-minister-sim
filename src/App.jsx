import { useEffect, useState } from 'react'

const profileFields = [
  { key: 'hometown', label: '出身地', options: ['北海道', '東京都', '大阪府', '福岡県', '長野県'] },
  { key: 'district', label: '選挙区', options: ['北海道3区', '東京12区', '神奈川2区', '大阪5区', '福岡1区'] },
  { key: 'background', label: '出身階層', options: ['地方都市の公務員家庭', '農家の家庭', '町工場を営む家庭', '都市部の会社員家庭', '政治家の家系'] },
  { key: 'career', label: '前職', options: ['弁護士', '地方自治体職員', '新聞記者', '会社経営者', '大学教授'] },
  { key: 'trait', label: '特性', options: ['調整力に優れる', '決断が早い', '演説が得意', '数字に強い', '粘り強い'] },
  { key: 'election', label: '選出経緯', options: ['党内選挙で勝利', '連立合意で指名', '世論の後押し', '総裁選で逆転', '緊急の党内一致'] },
  { key: 'past', label: '消せない過去', options: ['若手時代の失言', '過去の公約未達', '政治資金の説明不足', '強引な党内運営', '古い発言の再燃'] },
]

const ideologies = [
  'とにかくクリーンな世の中を実現',
  '経済成長を最優先する',
  '誰もが安心できる社会をつくる',
  '地域の力を引き出す',
]

const promiseOptions = [
  '財政規律の確保',
  '出生率の上昇',
  '防衛力強化',
  '賃金と雇用の改善',
  '地方経済の活性化',
  '子育て支援の拡充',
]

const cabinetPosts = ['内閣官房長官', '財務大臣', '外務大臣', '厚生労働大臣', '防衛大臣']

const cabinetPostDescriptions = {
  内閣官房長官: '内閣の政策を調整し、政府の方針を国民に説明する役職です。',
  財務大臣: '国の予算や税制を管理し、財政運営を担う役職です。',
  外務大臣: '各国との外交交渉や条約、国際協力を担う役職です。',
  厚生労働大臣: '医療、年金、福祉、雇用など、暮らしを支える政策を担う役職です。',
  防衛大臣: '自衛隊を指揮監督し、日本の防衛や安全保障を担う役職です。',
}

const cabinetCandidates = [
  { id: 'aoi', name: '青井 さくら', district: '東京5区', experience: '当選6回', influence: 60, administration: 80, debate: 20, note: '身体検査：怪しい噂がある' },
  { id: 'kanda', name: '神田 健一', district: '大阪3区', experience: '当選4回', influence: 72, administration: 68, debate: 74, note: '調整力に優れる' },
  { id: 'mori', name: '森 由美子', district: '北海道2区', experience: '当選3回', influence: 55, administration: 86, debate: 63, note: '実務経験が豊富' },
  { id: 'sato', name: '佐藤 大輔', district: '福岡1区', experience: '当選5回', influence: 81, administration: 59, debate: 70, note: '党内の人脈が広い' },
  { id: 'ishida', name: '石田 美咲', district: '京都2区', experience: '当選2回', influence: 68, administration: 73, debate: 88, note: '発信力に定評がある' },
  { id: 'noda', name: '野田 誠', district: '愛知7区', experience: '当選3回', influence: 74, administration: 77, debate: 58, note: '民間企業での経験がある' },
  { id: 'suzuki', name: '鈴木 玲奈', district: '神奈川4区', experience: '当選2回', influence: 62, administration: 82, debate: 76, note: '政策立案に詳しい' },
]

const metrics = [
  { key: 'public', label: '世論', color: 'bg-sky-400', text: 'text-sky-300' },
  { key: 'party', label: '党内支持', color: 'bg-violet-400', text: 'text-violet-300' },
  { key: 'happiness', label: '国民幸福度', color: 'bg-emerald-400', text: 'text-emerald-300' },
  { key: 'power', label: '国力', color: 'bg-amber-400', text: 'text-amber-300' },
  { key: 'motivation', label: '意欲', color: 'bg-rose-400', text: 'text-rose-300' },
]

const opinionDemographics = [
  { label: '全', male: 60, female: 40 },
  { label: 'シニア', male: 70, female: 80 },
  { label: 'ミドル', male: 60, female: 50 },
  { label: '若年', male: 40, female: 30 },
]

const opinionGroups = [
  {
    title: '都市・地方',
    groups: [{ label: '都市', value: 69 }, { label: '地方', value: 62 }],
  },
  {
    title: '左派・右派',
    groups: [{ label: '左派', value: 23 }, { label: '右派', value: 91 }],
  },
]

const opinionAttributes = [
  { label: '大企業', value: 70 },
  { label: '中小企業', value: 60 },
  { label: '労組', value: 50 },
  { label: '学者', value: 40 },
  { label: '子育て', value: 45 },
  { label: '単身', value: 67 },
]

const opinionIndustries = [
  { label: '建設', value: 56 },
  { label: '医療', value: 35 },
  { label: '教育', value: 52 },
  { label: '農業', value: 86 },
  { label: 'IT', value: 50 },
  { label: '製造', value: 43 },
  { label: '小売', value: 55 },
  { label: '金融', value: 60 },
  { label: '飲食', value: 68 },
  { label: '不動産', value: 45 },
  { label: 'サービス', value: 61 },
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
const metricLabels = Object.fromEntries(metrics.map(({ key, label }) => [key, label]))
const getChoiceEffects = (choice) => ({
  ...choice.effects,
  motivation:
    choice.effects.motivation ??
    Math.round(((choice.effects.public ?? 0) + (choice.effects.party ?? 0)) / 2),
})
const getNextEventIndex = (currentIndex) => {
  const nextEvents = events.map((_, index) => index).filter((index) => index !== currentIndex)
  return nextEvents[Math.floor(Math.random() * nextEvents.length)]
}

const initialTimeline = [
  {
    turn: '就任初日',
    category: '外交',
    title: '駐日各国大使と懇談',
    detail: '各国との対話を重ね、協力関係を深める方針を確認しました。',
  },
  {
    turn: '就任初日',
    category: '政務',
    title: '新内閣が発足',
    detail: '新しい政権が始動しました。各大臣に政策の実行を指示しました。',
  },
  {
    turn: '組閣',
    category: '表敬訪問',
    title: '前首相から引き継ぎ',
    detail: '官邸で引き継ぎを受け、国内外の重要課題を確認しました。',
  },
  {
    turn: '組閣',
    category: '政務',
    title: '閣僚との初会合',
    detail: '国民との約束を共有し、内閣一丸となって取り組むことを確認しました。',
  },
  {
    turn: '就任前',
    category: '表敬訪問',
    title: '国会議長を表敬訪問',
    detail: '国会との連携を大切にし、丁寧な議論を進める考えを伝えました。',
  },
]

function OfficeIllustration({ className, preserveAspectRatio = 'xMidYMax slice', idPrefix = 'office' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 280"
      className={className}
      preserveAspectRatio={preserveAspectRatio}
    >
      <defs>
        <linearGradient id={`${idPrefix}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#223751" />
          <stop offset="1" stopColor="#111b29" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-desk`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#624c3a" />
          <stop offset="1" stopColor="#332b27" />
        </linearGradient>
      </defs>
      <path d="M0 0h640v228H0z" fill={`url(#${idPrefix}-sky)`} />
      <path d="M30 18h255v156H30z" fill="#101a28" stroke="#536174" strokeWidth="8" />
      <path d="M42 30h231v132H42z" fill="#1b3045" />
      <path d="M157 30v132M42 96h231" stroke="#536174" strokeWidth="5" />
      <path d="M46 132h24V93h31v39h18V76h37v56h22v-30h32v30h19v-46h34v46h10v30H46z" fill="#26384a" />
      <circle cx="224" cy="57" r="12" fill="#f2c779" opacity=".75" />
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
  const [profile, setProfile] = useState({})
  const [ideology, setIdeology] = useState(ideologies[0])
  const [promises, setPromises] = useState(promiseOptions.slice(0, 3))
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0)
  const [rollingValue, setRollingValue] = useState('')
  const [isSpinning, setIsSpinning] = useState(false)
  const [cabinetPostIndex, setCabinetPostIndex] = useState(0)
  const [isCabinetHelpOpen, setIsCabinetHelpOpen] = useState(false)
  const [cabinetCandidateId, setCabinetCandidateId] = useState(null)
  const [cabinetAssignments, setCabinetAssignments] = useState({})
  const [status, setStatus] = useState({
    public: 50,
    party: 50,
    happiness: 50,
    power: 50,
    motivation: 50,
  })
  const [turn, setTurn] = useState(1)
  const [history, setHistory] = useState(initialTimeline)
  const [eventIndex, setEventIndex] = useState(0)
  const [isDecisionOpen, setIsDecisionOpen] = useState(false)
  const [activeModal, setActiveModal] = useState(null)
  const [gameSpeed, setGameSpeed] = useState(1)
  const event = events[eventIndex]
  const gameMonth = turn - 1
  const gameDate = `${2025 + Math.floor(gameMonth / 12)}年${(gameMonth % 12) + 1}月`

  useEffect(() => {
    if (!isSpinning) return

    const field = profileFields[currentProfileIndex]
    const intervalId = window.setInterval(() => {
      setRollingValue(field.options[Math.floor(Math.random() * field.options.length)])
    }, 90)
    const timeoutId = window.setTimeout(() => {
      const selectedValue = field.options[Math.floor(Math.random() * field.options.length)]
      setRollingValue(selectedValue)
      setProfile((current) => ({ ...current, [field.key]: selectedValue }))
      setCurrentProfileIndex((current) => current + 1)
      setIsSpinning(false)
    }, 1400)

    return () => {
      window.clearInterval(intervalId)
      window.clearTimeout(timeoutId)
    }
  }, [isSpinning, currentProfileIndex])

  useEffect(() => {
    if (!isCabinetHelpOpen) return

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsCabinetHelpOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isCabinetHelpOpen])

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
      </main>
    )
  }

  if (screen === 'profile') {
    const allProfileFieldsSelected = currentProfileIndex === profileFields.length

    return (
      <main className="min-h-screen bg-[#090d16] px-4 py-8 text-slate-100 sm:px-6">
        <section className="mx-auto max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-sky-200/70">総理プロフィール</p>
          <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">あなたの総理像を決める</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            ルーレットを回して、総理としての背景や特性を決めましょう。
          </p>

          <ol className="mt-6 space-y-2">
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
                  className={`flex min-h-16 items-center justify-between gap-4 rounded-xl border px-4 py-3 ${
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
              className="mt-6 w-full rounded-lg bg-sky-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
            >
              理念・公約を選ぶ
            </button>
          ) : (
            <button
              type="button"
              disabled={isSpinning}
              onClick={() => setIsSpinning(true)}
              className="mt-6 w-full rounded-lg border border-sky-400/40 bg-sky-400/10 px-5 py-3 font-semibold text-sky-200 transition hover:bg-sky-400/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 disabled:cursor-wait disabled:opacity-60"
            >
              {isSpinning ? '抽選中…' : `${profileFields[currentProfileIndex].label}のルーレットを回す`}
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
      setCabinetCandidateId(null)
      setCabinetPostIndex((index) => (index + 1) % cabinetPosts.length)
    }

    const completeCabinet = () => {
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
      setScreen('office')
    }

    return (
      <main className="min-h-screen bg-[#090d16] px-4 py-4 text-slate-100 sm:px-6 sm:py-5">
        <section className="mx-auto max-w-3xl">
          <header className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">組閣</h1>
              <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-300">
                大臣ポストと人材を選んで任命します。<br />
                人材未選択なら候補者からランダムに任命します。
              </p>
            </div>
            <button
              type="button"
              onClick={completeCabinet}
              className="shrink-0 rounded-xl bg-sky-400 px-4 py-2.5 font-bold text-slate-950 transition hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
            >
              組閣する
            </button>
          </header>

          <section aria-label="大臣ポスト" className="mt-3 rounded-2xl border border-white/10 bg-[#111827] p-2.5 sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                aria-label="前の大臣ポスト"
                onClick={() => setCabinetPostIndex((index) => (index - 1 + cabinetPosts.length) % cabinetPosts.length)}
                className="rounded-full border border-white/15 px-3 py-1.5 text-xl text-slate-200 hover:bg-white/10"
              >
                ←
              </button>
              <div className="text-center">
                <p className="text-sm text-slate-400">大臣ポスト {cabinetPostIndex + 1} / {cabinetPosts.length}</p>
                <div className="mt-1 flex items-center justify-center gap-2">
                  <h2 className="text-2xl font-bold text-white">{currentPost}</h2>
                  <button
                    type="button"
                    aria-label={`${currentPost}の説明を表示`}
                    aria-haspopup="dialog"
                    onClick={() => setIsCabinetHelpOpen(true)}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-sky-200/40 text-sm font-bold text-sky-200 transition hover:bg-sky-200/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                  >
                    ?
                  </button>
                </div>
              </div>
              <button
                type="button"
                aria-label="次の大臣ポスト"
                onClick={() => setCabinetPostIndex((index) => (index + 1) % cabinetPosts.length)}
                className="rounded-full border border-white/15 px-3 py-1.5 text-xl text-slate-200 hover:bg-white/10"
              >
                →
              </button>
            </div>

            <div className="mt-3 flex min-h-32 flex-col items-center justify-center rounded-xl border border-dashed border-sky-300/25 bg-sky-300/[0.03] p-2.5 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-sky-200/30 bg-slate-800 text-3xl font-bold text-sky-200">
                {assignedCandidate?.name.slice(0, 1) ?? '?'}
              </div>
              <p className="mt-2 text-lg font-semibold text-white">
                {assignedCandidate?.name ?? '未任命'}
              </p>
              {assignedCandidate && (
                <p className="mt-1 text-sm text-slate-400">{assignedCandidate.district}・{assignedCandidate.experience}</p>
              )}
            </div>
            {assignedCandidate && (
              <button
                type="button"
                onClick={() => setCabinetAssignments((current) => {
                  const next = { ...current }
                  delete next[currentPost]
                  return next
                })}
                className="mt-2 w-full rounded-lg border border-rose-300/25 px-3 py-1.5 text-sm font-semibold text-rose-200 transition hover:bg-rose-300/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
              >
                このポストの任命を解除
              </button>
            )}
          </section>

          <section aria-label="人材プール" className="mt-2.5 rounded-2xl border border-white/10 bg-[#111827] p-2.5 sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                aria-label="前の候補者"
                disabled={availableCandidates.length < 2}
                onClick={() => {
                  const index = (currentCandidateIndex - 1 + availableCandidates.length) % availableCandidates.length
                  setCabinetCandidateId(availableCandidates[index].id)
                }}
                className="rounded-full border border-white/15 px-3 py-1.5 text-xl text-slate-200 hover:bg-white/10 disabled:opacity-40"
              >
                ←
              </button>
              <div className="text-center">
                <h2 className="text-lg font-semibold text-sky-200">人材プール</h2>
                <p className="mt-1 text-sm text-slate-400">
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
                className="rounded-full border border-white/15 px-3 py-1.5 text-xl text-slate-200 hover:bg-white/10 disabled:opacity-40"
              >
                →
              </button>
            </div>

            {currentCandidate ? (
              <>
                <button
                  type="button"
                  aria-pressed={cabinetCandidateId === currentCandidate.id}
                  onClick={() => setCabinetCandidateId((id) => (
                    id === currentCandidate.id ? null : currentCandidate.id
                  ))}
                  className={`mt-2 w-full rounded-xl border p-2.5 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${
                    cabinetCandidateId === currentCandidate.id
                      ? 'border-sky-300/60 bg-sky-300/10'
                      : 'border-white/10 bg-white/[0.025] hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-800 text-2xl font-bold text-sky-200">
                      {currentCandidate.name.slice(0, 1)}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white">{currentCandidate.name}</p>
                      <p className="mt-1 text-sm text-slate-300">{currentCandidate.district}・{currentCandidate.experience}</p>
                    </div>
                    <span className="ml-auto text-sm font-semibold text-sky-200">
                      {cabinetCandidateId === currentCandidate.id ? '選択中' : '選択する'}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-center text-sm">
                    <p><span className="block text-slate-400">影響力</span>{currentCandidate.influence}</p>
                    <p><span className="block text-slate-400">実務力</span>{currentCandidate.administration}</p>
                    <p><span className="block text-slate-400">答弁力</span>{currentCandidate.debate}</p>
                  </div>
                  <p className="mt-2 border-t border-white/10 pt-2 text-sm text-slate-300">{currentCandidate.note}</p>
                </button>
                <button
                  type="button"
                  onClick={appointCandidate}
                  className="mt-2 w-full rounded-xl bg-sky-400 px-4 py-2 font-bold text-slate-950 transition hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                >
                  {cabinetCandidateId ? '任命する' : '任命する（ランダム）'}
                </button>
              </>
            ) : (
              <p className="mt-4 rounded-xl border border-white/10 p-4 text-center text-slate-300">
                任命できる候補者がいません。任命を解除するか、組閣を完了してください。
              </p>
            )}
          </section>
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
        turn,
        category: event.category,
        title: event.title,
        choice: choice.label,
        detail: choice.detail,
        isDecision: true,
      },
      ...current,
    ])
    setTurn((current) => current + 1)
    setIsDecisionOpen(false)
    setEventIndex(getNextEventIndex(eventIndex))
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#090d16] text-slate-100">
      <header className="shrink-0 border-b border-white/10 bg-[#0d1320]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2.5 px-2.5 py-2.5 sm:px-4">
          <h1 className="text-sm font-bold text-white sm:text-base">未来創造内閣</h1>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <div className="flex flex-wrap items-center justify-end gap-1.5">
              <div className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1">
                <span className="text-xs text-slate-400">在任</span>
                <span className="ml-1.5 font-semibold tabular-nums text-white">{turn}ヶ月</span>
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
            <span className="text-xs tabular-nums text-slate-400">ゲーム時間 {gameDate}</span>
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
            <OfficeIllustration className="absolute inset-x-0 bottom-0 h-4/5 w-full" />
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
            <span className="text-xs text-slate-500">{history.length + 1}件</span>
          </div>
          <ol className="relative min-h-0 flex-1 space-y-1.5 overflow-y-auto overscroll-contain before:absolute before:bottom-6 before:left-[15px] before:top-6 before:w-px before:bg-white/10">
            <li className="relative pl-10">
              <span className="absolute left-[9px] top-5 size-3.5 rounded-full border-[3px] border-[#090d16] bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.55)]" />
              <article className="rounded-xl border border-rose-400/20 bg-[#111827] p-2 sm:p-2.5">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold tabular-nums text-slate-500">TURN {String(turn).padStart(2, '0')}</span>
                    <span className="rounded-full border border-white/10 px-1.5 py-0.5 text-[11px] text-slate-400">
                      {event.category}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold tracking-wide text-rose-300">対応待ち</span>
                </div>
                <h3 className="mt-1.5 text-lg font-bold text-white">{event.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-400">{event.description}</p>
                <button
                  type="button"
                  onClick={() => setIsDecisionOpen(true)}
                  className="mt-2 rounded-lg border border-sky-400/30 bg-sky-400/[0.08] px-2 py-1 text-sm font-semibold text-sky-200 transition hover:border-sky-300/60 hover:bg-sky-400/[0.14] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                >
                  議題を確認して判断する <span aria-hidden="true">→</span>
                </button>
              </article>
            </li>
            {history.map((item) => (
              <li key={`${item.turn}-${item.title}`} className="relative pl-10">
                <span className="absolute left-[10px] top-5 size-3 rounded-full border-2 border-[#090d16] bg-violet-400" />
                <article className="rounded-xl border border-white/[0.07] bg-[#0e1420] px-2 py-2 sm:px-2.5">
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="text-xs font-semibold tabular-nums text-slate-500">
                      {item.isDecision ? `TURN ${String(item.turn).padStart(2, '0')}` : item.turn}
                    </span>
                    <span className="text-[11px] text-slate-500">{item.category}</span>
                    <span className="ml-auto rounded-full bg-emerald-400/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300">
                      {item.isDecision ? '決定済み' : '実施済み'}
                    </span>
                  </div>
                  <h3 className="mt-1 text-sm font-semibold text-slate-200">{item.title}</h3>
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
        <div
          className="fixed inset-0 z-50 flex justify-center bg-black/80 backdrop-blur-sm"
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
            className="h-[100dvh] w-full overflow-y-auto border border-white/10 bg-[#111827] p-3 shadow-2xl shadow-black/50 sm:p-5"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-rose-300">直面する課題 · {event.category}</p>
                <h2 id="decision-title" className="mt-1 text-xl font-bold text-white sm:text-2xl">{event.title}</h2>
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
            <div className="relative mt-3 aspect-[640/280] w-full overflow-hidden rounded-xl border border-white/10">
              <OfficeIllustration className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" idPrefix="decision-office" />
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-300">{event.description}</p>
            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold tracking-wider text-slate-400">あなたの決断</p>
              <div className="grid gap-3">
                {event.choices.map((choice, index) => (
                  <div key={choice.label} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.025]">
                    <button
                      type="button"
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
