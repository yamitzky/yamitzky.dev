import Link from 'next/link'
import React from 'react'

type Props = {}

export const Breadcrumb: React.FC<Props> = () => {
  return (
    <section className="flex justify-center">
      <ul className="flex flex-row items-center space-x-4 text-sm font-semibold md:text-md rounded-full text-white bg-zinc-700 dark:text-gray-300 dark:bg-zinc-800 py-2 justify-center w-fit px-8 shadow-md">
        <li>
          <Link href="/">Top</Link>
        </li>
        <li>▶</li>
        <li>Blog</li>
      </ul>
    </section>
  )
}
