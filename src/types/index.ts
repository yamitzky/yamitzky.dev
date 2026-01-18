// Profile
export type Profile = {
  name: string
  englishName: string
  handle: string
  bio: string
  avatars: {
    virtual: string
    real: string
  }
}

// SNS Links
export type SNSLink = {
  name: string
  url: string
  icon?: string
}

// Presentations
export type Presentation = {
  event: string
  title: string
  url: string
  year?: number
  badge?: string
}

// OSS Projects
export type OSSProject = {
  title: string
  url: string
  github: string
  demo?: string
  image?: string
  description: string
}

export type OSSItem = {
  title: string
  url: string
}

// Career
export type CareerItem = {
  startDate: string
  endDate: string
  title: string
  description?: string
}

// Skills
export type Skill = {
  name: string
  category?: string
}

// Blog Articles
export type Platform =
  | 'yamitzky'
  | 'jxpress'
  | 'qiita'
  | 'note'
  | 'zenn'
  | 'findy-tools'
  | 'cyberz-dev'

export type Article = {
  title: string
  published: string
  link: string
  platform: Platform
}

// RSS Feeds
export type RSSFeed = {
  platform: Platform
  url: string
  label: string
}
