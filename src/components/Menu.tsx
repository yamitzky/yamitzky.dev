import Link from 'next/link'
import React from 'react'

type Props = {}

export const Menu: React.FC<Props> = () => {
  return (
    <section className="flex justify-center">
      <ul className="flex flex-row items-center text-sm font-semibold md:text-md rounded-full text-white bg-zinc-700 dark:text-gray-300 dark:bg-zinc-800 py-2 justify-center w-fit px-8 shadow-md">
        <li className="hidden md:block ml-4 md:ml-0">
          <a href="/#profile">Profile</a>
        </li>
        <li className="md:ml-8">
          <a href="/#presentation">Presentations</a>
        </li>
        <li className="ml-4 md:ml-8">
          <Link href="/blog">Blog</Link>
        </li>
        <li className="ml-4 md:ml-8">
          <a href="/#oss">Works</a>
        </li>
        <li className="ml-4 md:ml-8">
          <a href="/#career">Career</a>
        </li>
      </ul>
    </section>
  )
}
