interface ErrorViewProps {
  hidden: boolean
  display: string
  internal?: Error
}

export default function ErrorView({
  hidden,
  display,
  internal
}: ErrorViewProps) {
  return (
    <div hidden={hidden}>
      <h3>{display}</h3>
      <blockquote>{internal?.name} <br/>{internal?.message}</blockquote>
    </div>
  )
}
