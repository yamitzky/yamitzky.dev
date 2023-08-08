import React from 'react'
import styles from '~/styles/Article.module.css'

export const Presentation: React.FC = () => {
  return (
    <>
      <h2 id="presentation">🔈 登壇・寄稿 🔈</h2>
      <ul className={styles.articles}>
        <li>
          Google Cloud SaaS Summit 2021「
          <a
            href="https://cloudonair.withgoogle.com/events/saas-summit?talk=d3-04"
            target="_blank"
          >
            大量の防災用データをリアルタイムに集める、サーバーレスなシステムの作り方
          </a>
          」
        </li>
        <li>
          PyCon JP 2020「
          <a href="https://pycon.jp/2020/timetable/?id=203955" target="_blank">
            Python 3.9 時代の型安全な Pythonの極め方
          </a>
          」
        </li>
        <li>
          技術評論社 WEB+DB PRESS Vol.105{' '}
          <a
            href="https://gihyo.jp/magazine/wdpress/archive/2018/vol105"
            target="_blank"
          >
            「サーバーレス」特集寄稿
          </a>
        </li>
        <li>
          エンジニアHub 「
          <a
            href="https://eh-career.com/engineerhub/entry/2018/07/03/110000"
            target="_blank"
          >
            サーバーレスのメリット＆本質を、AWS Lambdaを使って理解しよう
          </a>
          」寄稿
        </li>
        <li>
          Developers 2018「
          <a
            href="https://event.shoeisha.jp/devboost/20181215/session/1907/"
            target="_blank"
          >
            なぜサーバーレス『と』Dockerなのか
            〜インフラ運用を最小化するサービス開発〜
          </a>
          」
        </li>
        <li>
          Developers Summit 2018「
          <a
            href="https://event.shoeisha.jp/devsumi/20180215/session/1649/"
            target="_blank"
          >
            サーバーレスを活用して少数精鋭で開発するニュースアプリ
          </a>
          」
        </li>
        <li>
          builderscon tokyo 2017「
          <a
            href="https://speakerdeck.com/yamitzky/kokogaxin-iyosabaresu-dagasi-hacheng-riyue-eta-number-builderscon"
            target="_blank"
          >
            ここが辛いよサーバーレス。だが私は乗り越えた
          </a>
          」
        </li>
      </ul>
    </>
  )
}
