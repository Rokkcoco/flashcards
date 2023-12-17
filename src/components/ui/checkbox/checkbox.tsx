import { ElementRef, forwardRef } from 'react'

import { Vector } from '@/assets'
import { Typography } from '@/components/ui/typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as Label from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from './checkbox.module.scss'

type Props = {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  id?: string
  label?: string
  name?: string
  onChange?: (checked: boolean) => void
  required?: boolean
  value?: string
}

export const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, Props>((props, ref) => {
  const { checked, disabled, label, onChange: onCheckedChange, ...rest } = props

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
              onCheckedChange={onCheckedChange}
              ref={ref}
              {...rest}
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
})
