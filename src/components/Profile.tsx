import React from 'react'

export const Profile: React.FC = () => {
  return (
    <section className="space-y-8" id="profile">
      <div className="flex flex-row space-x-4 items-center justify-center md:justify-start">
        <div className="glitch-container">
          <img
            src="/yamitzky.png"
            width="127"
            height="128"
            alt="yamitzky virtual icon"
            className="w-16 h-16 md:w-24 md:h-24"
          />
        </div>
        <img
          src="/ogasahara.png"
          width="127"
          height="128"
          alt="ogasahara real photo"
          className="rounded-full shadow-md w-16 h-16 md:w-24 md:h-24"
        />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold">小笠原みつき @yamitzky</h1>
      <p className="text-slate-500 text-slate-500 dark:text-gray-400">
        サーバーレスとPythonとReactとBigQueryと猫とKPOPをこよなく愛するCTO。登壇・執筆依頼と美味しいガパオの情報はX(Twitter)でお願いします。メールは迷惑メールと一緒に見逃してしまう可能性があります。
      </p>
    </section>
  )
}
