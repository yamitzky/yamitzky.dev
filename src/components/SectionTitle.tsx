type Props = {
  children: React.ReactNode
  icon: React.ReactNode
}

export const SectionTitle = ({ children, icon }: Props) => {
  return (
    <h2 className="text-xl font-bold flex items-center">
      <span className="mr-4 text-3xl">{icon}</span>
      <span>{children}</span>
    </h2>
  )
}
