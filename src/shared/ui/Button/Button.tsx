import classNames from 'classnames'
import { Link } from 'react-router-dom'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline-primary'
  | 'outline-secondary'
  | 'success'

type ButtonBaseProps = {
  variant?: ButtonVariant
  className?: string
  disabled?: boolean
  children: React.ReactNode
}

type ButtonAsButton = ButtonBaseProps & {
  to?: never
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

type ButtonAsLink = ButtonBaseProps & {
  to: string
  type?: never
  onClick?: never
}

export type ButtonProps = ButtonAsButton | ButtonAsLink

const variantToClass: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  'outline-primary': 'btn-outline-primary',
  'outline-secondary': 'btn-outline-secondary',
  success: 'btn-success',
}

export function Button({
  variant = 'primary',
  type = 'button',
  className,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const btnClass = classNames('btn', variantToClass[variant], className)

  if ('to' in rest && rest.to) {
    return (
      <Link to={rest.to} className={btnClass}>
        {children}
      </Link>
    )
  }

  const { onClick } = rest as ButtonAsButton
  return (
    <button type={type} className={btnClass} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
