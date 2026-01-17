type Props = {
  icon?: string
  children: React.ReactNode
}

export function SectionTitle({ icon, children }: Props) {
  return (
    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
      {icon && <span>{icon}</span>}
      {children}
    </h2>
  )
}
