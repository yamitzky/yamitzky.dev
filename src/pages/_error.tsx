import { NextPage, NextPageContext } from 'next'

type Props = {
  message: string
}

const Error: NextPage<Props> = ({ message }) => {
  return <p>{message}</p>
}

export const getInitialProps = ({ err }: NextPageContext) => {
  return { message: err.message }
}

export default Error
