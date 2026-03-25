import { Button, type ButtonProps } from '@tamagui/core'

export type ActionButtonProps = ButtonProps & {
  variant?: 'primary' | 'secondary' | 'critical'
}

export function ActionButton({ variant = 'primary', ...props }: ActionButtonProps) {
  return <Button {...props} />
}
