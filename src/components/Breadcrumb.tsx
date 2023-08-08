import Link from 'next/link'
import React from 'react'
import styles from '~/styles/Breadcrumb.module.css'

type Props = {}

export const Breadcrumb: React.FC<Props> = () => {
  return (
    <ul className={styles.breadcrumb}>
      <li>
        <Link href="/">Top</Link>
      </li>
      <li>Blog</li>
    </ul>
  )
}
