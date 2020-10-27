import React from 'react'
import styles from '~/styles/Profile.module.css'

export const Profile: React.FC = () => {
  return (
    <div className={styles.top}>
      <img src="/yamitzky.png" width="127" height="128" />
      <img
        src="/ogasahara.jpg"
        width="127"
        height="128"
        className={styles.photo}
      />
      <h1>I'm 小笠原みつき(@yamitzky), a developer.</h1>
      <p>
        JX通信社
        取締役CDO。サーバーレスとPythonとReactとBigQueryをこよなく愛する。登壇・執筆依頼と美味しいガパオの情報は
        Twitter
        でお願いします。(メールは迷惑メールと一緒に見逃してしまう可能性があります)
      </p>
    </div>
  )
}
