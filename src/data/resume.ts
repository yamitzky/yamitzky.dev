// Resume Data

// =============================================================================
// 職務経歴（会社 ∋ {経歴, プロジェクト}）
// =============================================================================

export type Artifact = {
  title: string
  url: string
}

export type Project = {
  title: string
  achievements: string[]
  description?: string
  technologies?: string[]
  artifacts?: Artifact[]
}

export type WorkExperience = {
  company: string
  companyEn?: string
  period: string
  note?: string
  roles: { title: string; period: string }[]
  projects: Project[]
}

// workExperiences: projects are encrypted in resume.encrypted.json
export const workExperiences: Omit<WorkExperience, 'projects'>[] = [
  {
    company: '株式会社JX通信社',
    companyEn: 'JX Press Corporation',
    period: '2016年1月 〜 現在',
    roles: [
      { title: '執行役員CTO', period: '2022年10月 〜 現在' },
      { title: '取締役CDO', period: '2019年10月 〜 2022年9月' },
      { title: 'VPoE', period: '2018年6月 〜 2019年9月' },
      { title: 'エンジニア', period: '2016年1月 〜 2018年5月' },
    ],
  },
  {
    company: '株式会社サイバーエージェント',
    companyEn: 'CyberAgent, Inc.',
    period: '2014年4月 〜 2015年12月',
    note: '株式会社CyberZに配属',
    roles: [{ title: 'エンジニア', period: '2014年4月 〜 2015年12月' }],
  },
]

// Map of company -> projects (encrypted data structure)
export type EncryptedProjects = Record<string, Project[]>

// =============================================================================
// その他（サマリー、強み、学歴）
// =============================================================================

export type Education = {
  school: string
  schoolEn?: string
  degree?: string
  period: string
}

export const resumeSummary =
  '大学在学中からモバイルアプリ開発、サーバーサイドの開発を経験し、新卒入社したサイバーエージェントでは機械学習を活用したアドテクノロジー領域で即戦力として複数プロジェクトを主導しました。その後2016年JX通信社に入社し、リードエンジニア、VPoE、取締役CDO、執行役員CTOへとロールを変え、経営と技術の両軸で組織をリードしてきました。直近では、サーバーコスト削減のプロジェクトや、AIコーディングの全社導入などを担当しています。フルスタックなエンジニアリングの専門性と経営視点を兼ね備え、事業成長と技術革新の両立を実現できることが強みです。'

export type Capability = {
  title: string
  description: string
}

export const capabilities: Capability[] = [
  {
    title: '経営視点・チーム視点でのITコスト削減',
    description:
      'ITコストをプロダクト単位・施策単位まで分解・可視化し、クラウドインフラだけでなく、Salesforceなど業務系SaaSを横断した削減施策の立案・優先順位付けができます。アーキテクチャ最適化や内製移行といった技術的アプローチから、施策ごとのROI分析による廃止検討まで、経営視点での意思決定を支援します。また、ダッシュボードでの費用可視化など、全社的なコスト意識・FinOps文化を醸成する仕組みづくりにも対応できます。',
  },
  {
    title: 'データ基盤の設計から分析・施策立案などの、データ活用',
    description:
      'データ基盤の設計・構築、BigQueryを活用したビッグデータ解析、KPIツリーの設計、ダッシュボードの構築などができます。基盤構築から分析・施策提案まで一貫して対応できます。',
  },
  {
    title: 'フルスタックな開発',
    description:
      'バックエンド（Go, Python, GraphQL、TypeScript）、フロントエンド（React, TypeScript, Next.js）、インフラ構築（Terraform, Cloud Run、DatadogなどのObservabilityツール）、データ関連（BigQuery, Airflow）、AI関連(LLM、エージェント)など、プロダクト開発に必要な領域を横断して対応できます。',
  },
  {
    title: 'エンジニア組織の設計',
    description:
      'エンジニア組織の採用・評価・マネジメント体制の設計と構築ができます。面接フローの構築から、1on1の仕組み化、チームの横断管理体制など、採用のミスマッチ低減やエンジニア組織の定着率の改善を支援できます。',
  },
]

export const education: Education[] = [
  {
    school: '早稲田大学',
    schoolEn: 'Waseda University',
    degree: '先進理工学部 電気・情報生命工学科',
    period: '2010年4月 〜 2014年3月',
  },
]
