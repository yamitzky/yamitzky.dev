import React from 'react'
import styles from '~/styles/Divider.module.css'

type Props = {}

export const Divider: React.FC<Props> = () => {
  return <div className={styles.divider} />
}
