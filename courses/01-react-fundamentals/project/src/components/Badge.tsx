interface BadgeProps {
  children: React.ReactNode
  variant?: string
}

export default function Badge({
  children,
  variant = "default",
}: BadgeProps) {
  return (
    <span data-variant={variant}>
      {children}
    </span>
  )
}