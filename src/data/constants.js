export const profileFields = [
  { key: 'hometown', label: '出身地', options: ['北海道', '東京都', '大阪府', '福岡県', '長野県'] },
  { key: 'district', label: '選挙区', options: ['北海道3区', '東京12区', '神奈川2区', '大阪5区', '福岡1区'] },
  { key: 'background', label: '出身階層', options: ['地方都市の公務員家庭', '農家の家庭', '町工場を営む家庭', '都市部の会社員家庭', '政治家の家系'] },
  { key: 'career', label: '前職', options: ['弁護士', '地方自治体職員', '新聞記者', '会社経営者', '大学教授'] },
  { key: 'trait', label: '特性', options: ['調整力に優れる', '決断が早い', '演説が得意', '数字に強い', '粘り強い'] },
  { key: 'election', label: '選出経緯', options: ['党内選挙で勝利', '連立合意で指名', '世論の後押し', '総裁選で逆転', '緊急の党内一致'] },
  { key: 'past', label: '消せない過去', options: ['若手時代の失言', '過去の公約未達', '政治資金の説明不足', '強引な党内運営', '古い発言の再燃'] },
]

export const primeMinisterNames = ['高橋 誠', '山本 由美', '中村 翔太', '小林 美月', '藤田 健']

export const ideologies = [
  'とにかくクリーンな世の中を実現',
  '経済成長を最優先する',
  '誰もが安心できる社会をつくる',
  '地域の力を引き出す',
]

export const promiseOptions = [
  '財政規律の確保',
  '出生率の上昇',
  '防衛力強化',
  '賃金と雇用の改善',
  '地方経済の活性化',
  '子育て支援の拡充',
]

export const cabinetPosts = ['内閣官房長官', '財務大臣', '外務大臣', '厚生労働大臣', '防衛大臣']

export const cabinetPostDescriptions = {
  内閣官房長官: '内閣の政策を調整し、政府の方針を国民に説明する役職です。',
  財務大臣: '国の予算や税制を管理し、財政運営を担う役職です。',
  外務大臣: '各国との外交交渉や条約、国際協力を担う役職です。',
  厚生労働大臣: '医療、年金、福祉、雇用など、暮らしを支える政策を担う役職です。',
  防衛大臣: '自衛隊を指揮監督し、日本の防衛や安全保障を担う役職です。',
}

export const metrics = [
  { key: 'public', label: '世論', color: 'bg-sky-400', text: 'text-sky-300' },
  { key: 'party', label: '党内支持', color: 'bg-violet-400', text: 'text-violet-300' },
  { key: 'happiness', label: '国民幸福度', color: 'bg-emerald-400', text: 'text-emerald-300' },
  { key: 'power', label: '国力', color: 'bg-amber-400', text: 'text-amber-300' },
  { key: 'motivation', label: '意欲', color: 'bg-rose-400', text: 'text-rose-300' },
]

export const opinionDemographics = [
  { label: '全', male: 60, female: 40 },
  { label: 'シニア', male: 70, female: 80 },
  { label: 'ミドル', male: 60, female: 50 },
  { label: '若年', male: 40, female: 30 },
]

export const opinionGroups = [
  {
    title: '都市・地方',
    groups: [{ label: '都市', value: 69 }, { label: '地方', value: 62 }],
  },
  {
    title: '左派・右派',
    groups: [{ label: '左派', value: 23 }, { label: '右派', value: 91 }],
  },
]

export const opinionAttributes = [
  { label: '大企業', value: 70 },
  { label: '中小企業', value: 60 },
  { label: '労組', value: 50 },
  { label: '学者', value: 40 },
  { label: '子育て', value: 45 },
  { label: '単身', value: 67 },
]

export const opinionIndustries = [
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

export const officeSeasons = {
  spring: { skyTop: '#43524c', skyBottom: '#202c2a', windowSky: '#536b5b', city: '#526354', sun: '#f4c6c0' },
  summer: { skyTop: '#31536c', skyBottom: '#152b3a', windowSky: '#31566d', city: '#385369', sun: '#f5d787' },
  autumn: { skyTop: '#59433e', skyBottom: '#281f25', windowSky: '#654b44', city: '#55453f', sun: '#f2bd77' },
  winter: { skyTop: '#39485f', skyBottom: '#171f30', windowSky: '#394b62', city: '#424d5d', sun: '#dbe9f7' },
}

export const initialTimeline = [
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
