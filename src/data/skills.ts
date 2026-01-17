import type { Skill } from '@/types'

export const skills: Skill[] = [
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Python', category: 'Backend' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'Pydantic', category: 'Backend' },
  { name: 'Go', category: 'Backend' },
  { name: 'Ruby', category: 'Backend' },
  { name: 'GraphQL', category: 'Backend' },
  { name: 'Serverless', category: 'Cloud' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Google Cloud', category: 'Cloud' },
  { name: 'Firebase', category: 'Cloud' },
  { name: 'BigQuery', category: 'Cloud' },
  { name: 'Docker', category: 'Cloud' },
  { name: 'Machine Learning', category: 'AI / ML' },
  { name: 'LLM', category: 'AI / ML' },
]

export const skillCategories = [
  'Frontend',
  'Backend',
  'Cloud',
  'AI / ML',
] as const
