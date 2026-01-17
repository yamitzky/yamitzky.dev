import type { OSSProject, OSSItem } from '@/types'

export const mainOSSProjects: OSSProject[] = [
  {
    title: 'Serverless Headless CMS',
    url: 'https://serverless-headless-cms.vercel.app/',
    github: 'https://github.com/yamitzky/serverless-headless-cms',
    demo: 'https://serverless-headless-cms.vercel.app/',
    image: '/serverless-headless-cms.png',
    description:
      'Firebase、Chakra UI、Next.jsなどで作られた、サーバーレスで運用コストがほぼゼロ円の本格的CMSです。',
  },
  {
    title: 'ailingo',
    url: 'https://github.com/yamitzky/ailingo',
    github: 'https://github.com/yamitzky/ailingo',
    image: '/ailingo.gif',
    description:
      '生成AIを使って多言語に翻訳する、CLIプログラムです。gpt-4oやGemini、Claude Opusなどに対応しています(Python製)。',
  },
  {
    title: 'Built-in AI Translator',
    url: 'https://github.com/yamitzky/builtin-ai-translator',
    github: 'https://github.com/yamitzky/builtin-ai-translator',
    demo: 'https://builtin-ai-translator.yamitzky.dev',
    image: '/builtin-ai-translator.gif',
    description:
      'Chrome(127)から実験的に組み込まれたローカルLLMの「Gemini Nano」を使った、完全ローカルで動作するAI翻訳のデモです。PWAです。実用性はありません。',
  },
  {
    title: 'Redash bot',
    url: 'https://github.com/yamitzky/redashbot',
    github: 'https://github.com/yamitzky/redashbot',
    description:
      'Redash上のグラフやダッシュボードを、Slack上にポストするbotです(TypeScript製)。Slack boltを使っています。会社をよりデータドリブンにするために作ったものです。',
  },
]

export const otherOSSItems: OSSItem[] = [
  {
    title: 'Custom Kibela -> Slack Webhook (Python)',
    url: 'https://github.com/jxpress/kibela-to-slack',
  },
  {
    title: 'Japanese Wikipedia Corpus for Language Modeling',
    url: 'https://github.com/yamitzky/ja-wikipedia-corpus-soso',
  },
  {
    title: 'Chatbot framework "bottoku" (Python)',
    url: 'https://github.com/yamitzky/bottoku',
  },
  {
    title: 'Scala on AWS Lambda',
    url: 'https://github.com/yamitzky/Scala-Lambda-Apex-Kuromoji',
  },
  {
    title: 'NEologd Docker image',
    url: 'https://hub.docker.com/r/yamitzky/miniconda-neologd/',
  },
  {
    title: 'NEologd Mecab API',
    url: 'https://hub.docker.com/r/yamitzky/mecab-bottle/',
  },
  {
    title: 'お家ハック',
    url: 'https://github.com/yamitzky/ouchihack',
  },
  {
    title: 'Review reminder bot for Gitlab',
    url: 'https://github.com/yamitzky/review-reminder',
  },
  {
    title: 'AdaBoost (Javascript)',
    url: 'https://github.com/yamitzky/adaboost.js',
  },
  {
    title: 'Latent Dirichlet Allocation (Scipy.weave, C++)',
    url: 'https://github.com/yamitzky/LDA-inline-c',
  },
  {
    title: 'Regularized SVD (Cython)',
    url: 'https://github.com/yamitzky/Regularized-SVD',
  },
]
