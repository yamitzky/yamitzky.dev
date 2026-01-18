import type { Presentation } from '@/types'

export const presentations: Presentation[] = [
  {
    event: '情シス・コーポレートITのSaaSアカウント管理　効率化の取り組み',
    title: 'ひとり情シスなCTOがLLMと始めるオペレーション最適化',
    url: 'https://findy.connpass.com/event/358280/',
    year: 2025,
  },
  {
    event: 'ROSCAFE#12',
    title: 'コスト管理から向き合う技術的負債',
    url: 'https://rosca.connpass.com/event/336045/',
    year: 2024,
  },
  {
    event: 'GBTM#3',
    title:
      'プロダクトの正しい「やめ方」〜スタートアップのCTOは大きな決断にどう向き合うか？〜(パネラー登壇)',
    url: 'https://globalbrains.connpass.com/event/324893/',
    year: 2024,
  },
  {
    event: 'Google Cloud SaaS Summit 2021',
    title:
      '大量の防災用データをリアルタイムに集める、サーバーレスなシステムの作り方',
    url: 'https://cloudonair.withgoogle.com/events/saas-summit?talk=d3-04',
    year: 2021,
  },
  {
    event: 'PyCon JP 2020',
    title: 'Python 3.9 時代の型安全な Pythonの極め方',
    url: 'https://pycon.jp/2020/timetable/?id=203955',
    year: 2020,
    badge: 'Best Speaker賞',
  },
  {
    event: 'Developers Boost 2020',
    title:
      '技術が好きで好きで好きでたまらないエンジニアが『取締役』になって思う、マネジメントキャリアパス',
    url: 'https://event.shoeisha.jp/devboost/20201212/session/2981',
    year: 2020,
    badge: '基調講演',
  },
  {
    event: '技術評論社 WEB+DB PRESS Vol.105',
    title: '「サーバーレス」特集寄稿',
    url: 'https://gihyo.jp/magazine/wdpress/archive/2018/vol105',
    year: 2018,
    badge: '執筆',
  },
  {
    event: 'エンジニアHub',
    title: 'サーバーレスのメリット＆本質を、AWS Lambdaを使って理解しよう',
    url: 'https://eh-career.com/engineerhub/entry/2018/07/03/110000',
    year: 2018,
    badge: '執筆',
  },
  {
    event: 'Developers Boost 2018',
    title: 'なぜサーバーレス『と』Dockerなのか',
    url: 'https://event.shoeisha.jp/devboost/20181215/session/1907/',
    year: 2018,
  },
  {
    event: 'Developers Summit 2018',
    title: 'サーバーレスを活用して少数精鋭で開発するニュースアプリ',
    url: 'https://event.shoeisha.jp/devsumi/20180215/session/1649/',
    year: 2018,
  },
  {
    event: 'builderscon tokyo 2017',
    title: 'ここが辛いよサーバーレス。だが私は乗り越えた',
    url: 'https://speakerdeck.com/yamitzky/kokogaxin-iyosabaresu-dagasi-hacheng-riyue-eta-number-builderscon',
    year: 2017,
  },
]

// レジュメページ用にフィルタされた主要な登壇・執筆
export const featuredPresentations = presentations.filter(
  (p) =>
    p.badge ||
    p.event.includes('Google Cloud') ||
    p.event.includes('Developers Summit 2018')
)
