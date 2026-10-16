export const events = [
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

export const routineEvents = [
  {
    category: '政務',
    title: '閣議を開催',
    description: '各大臣から政策の進捗について報告を受け、政府全体で課題を共有しました。',
  },
  {
    category: '国民の声',
    title: '地域の声を聞く',
    description: '各地から寄せられた要望に目を通し、担当大臣に対応を指示しました。',
  },
  {
    category: '外交',
    title: '各国首脳と電話会談',
    description: '国際情勢について意見を交わし、今後の連携を確認しました。',
  },
  {
    category: '政務',
    title: '政策の進捗を確認',
    description: '重点政策の進み具合を確認し、関係省庁に引き続き取り組むよう伝えました。',
  },
]

export const officeEvents = [...events, ...routineEvents]
