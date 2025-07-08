import React from 'react'
import { SectionTitle } from './SectionTitle'

type Presentation = {
  event: string
  title: string
  url: string
}

const Presentations: Presentation[] = [
  {
    event: '情シス・コーポレートITのSaaSアカウント管理　効率化の取り組み',
    title: 'ひとり情シスなCTOがLLMと始めるオペレーション最適化',
    url: 'https://findy.connpass.com/event/358280/',
  },
  {
    event: 'ROSCAFE#12',
    title: 'コスト管理から向き合う技術的負債',
    url: 'https://rosca.connpass.com/event/336045/',
  },
  {
    event: 'GBTM#3',
    title:
      'プロダクトの正しい「やめ方」〜スタートアップのCTOは大きな決断にどう向き合うか？〜(パネラー登壇)',
    url: 'https://globalbrains.connpass.com/event/324893/',
  },
  {
    event: 'Google Cloud SaaS Summit 2021',
    title:
      '大量の防災用データをリアルタイムに集める、サーバーレスなシステムの作り方',
    url: 'https://cloudonair.withgoogle.com/events/saas-summit?talk=d3-04',
  },
  {
    event: 'PyCon JP 2020',
    title: 'Python 3.9 時代の型安全な Pythonの極め方',
    url: 'https://pycon.jp/2020/timetable/?id=203955',
  },
  {
    event: 'Developers Boost 2020 基調講演',
    title:
      '技術が好きで好きで好きでたまらないエンジニアが『取締役』になって思う、マネジメントキャリアパス',
    url: 'https://event.shoeisha.jp/devboost/20201212/session/2981',
  },
  {
    event: '技術評論社 WEB+DB PRESS Vol.105',
    title: '「サーバーレス」特集寄稿',
    url: 'https://gihyo.jp/magazine/wdpress/archive/2018/vol105',
  },
  {
    event: 'エンジニアHub',
    title: 'サーバーレスのメリット＆本質を、AWS Lambdaを使って理解しよう',
    url: 'https://eh-career.com/engineerhub/entry/2018/07/03/110000',
  },
  {
    event: 'Developers Boost 2018',
    title: 'なぜサーバーレス『と』Dockerなのか',
    url: 'https://event.shoeisha.jp/devboost/20181215/session/1907/',
  },
  {
    event: 'Developers Summit 2018',
    title: 'サーバーレスを活用して少数精鋭で開発するニュースアプリ',
    url: 'https://event.shoeisha.jp/devsumi/20180215/session/1649/',
  },
  {
    event: 'builderscon tokyo 2017',
    title: 'ここが辛いよサーバーレス。だが私は乗り越えた',
    url: 'https://speakerdeck.com/yamitzky/kokogaxin-iyosabaresu-dagasi-hacheng-riyue-eta-number-builderscon',
  },
]

export const Presentation: React.FC = () => {
  return (
    <section className="space-y-4" id="presentation">
      <SectionTitle icon="🔈">登壇・寄稿</SectionTitle>
      <ul className="space-y-4 md:space-y-2">
        {Presentations.map((presentation) => (
          <li key={presentation.url} className="block">
            <a
              href={presentation.url}
              target="_blank"
              rel="noreferrer"
              className="md:flex justify-between items-center flex-wrap"
            >
              <h3 className="font-bold">{presentation.title}</h3>
              <p className="text-sm text-slate-500 dark:text-gray-400">
                {presentation.event}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
