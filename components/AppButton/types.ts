export interface iAppButton {
  title?: string
  tooltip?: string
  onClick?: () => void
  Icon?: any
  iconOnRight?: boolean
  className?: string
  [id: string]: any
}
