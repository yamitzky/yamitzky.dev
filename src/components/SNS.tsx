import React from 'react'
import { SectionTitle } from './SectionTitle'

export const SNS: React.FC = () => {
  return (
    <section className="space-y-4" id="sns">
      <SectionTitle icon="🧙‍♂️">Links</SectionTitle>
      <ul className="flex flex-row space-x-4 md:space-x-8 flex-wrap font-semibold">
        <li>
          <a href="https://twitter.com/yamitzky">X(formerly Twitter)</a>
        </li>
        <li>
          <a href="https://facebook.com/yamitzky">Facebook</a>
        </li>
        <li>
          <a href="https://speakerdeck.com/yamitzky">Speaker Deck</a>
        </li>
        <li>
          <a href="https://github.com/yamitzky">GitHub</a>
        </li>
        <li>
          <a href="https://hub.docker.com/r/yamitzky">Docker Hub</a>
        </li>
      </ul>
      <p>💌 negiga@gmail.com</p>
    </section>
  )
}
