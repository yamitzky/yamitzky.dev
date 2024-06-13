import React from 'react'
import { SectionTitle } from './SectionTitle'

export const Skill: React.FC = () => {
  return (
    <section className="space-y-4" id="skill">
      <SectionTitle icon="😻">好きな技術</SectionTitle>
      <ul className="space-y-2">
        <li>TypeScript, React, Next.js</li>
        <li>Python, FastAPI, Pydantic</li>
        <li>GraphQL</li>
        <li>Serverless</li>
        <li>BigQuery</li>
        <li>AWS, Google Cloud, Firebase</li>
        <li>Machine Learning, LLM</li>
        <li>Go</li>
        <li>Docker 🐳</li>
        <li>Ruby</li>
      </ul>
    </section>
  )
}
