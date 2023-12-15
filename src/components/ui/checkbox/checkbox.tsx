import { Vector } from '@/assets'
import { Typography } from '@/components/ui/typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as Label from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from './checkbox.module.scss'

type CheckboxProps = {
  checked?: boolean
  disabled?: boolean
  id?: string
  label?: string
  onChange?: (checked: boolean) => void
  required?: boolean
}

export const Checkbox = ({ checked, disabled, id, label, onChange, required }: CheckboxProps) => {
  const classNames = {
    buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled),
    container: s.container,
    label: clsx(s.label, disabled && s.disabled),
    root: s.root,
  }

  return (
    <div className={classNames.container}>
      <Label.Root asChild>
        <Typography as={'label'} className={classNames.label} variant={'body_2'}>
          <div className={classNames.buttonWrapper}>
            <CheckboxRadix.Root
              checked={checked}
              className={classNames.root}
              disabled={disabled}
              id={id}
              onCheckedChange={onChange}
              required={required}
            >
              {checked && (
                <CheckboxRadix.CheckboxIndicator forceMount>
                  <Vector />
                </CheckboxRadix.CheckboxIndicator>
              )}
            </CheckboxRadix.Root>
          </div>
          {label}
        </Typography>
      </Label.Root>
    </div>
  )
}
