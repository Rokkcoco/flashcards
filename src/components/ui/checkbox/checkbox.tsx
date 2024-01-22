import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Vector } from '@/assets'
import Typography from '@/components/ui/typography/typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as Label from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  label?: string
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxProps>(
  (props, ref) => {
    const { disabled, label, ...rest } = props

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
                className={classNames.root}
                disabled={disabled}
                ref={ref}
                {...rest}
              >
                <CheckboxRadix.CheckboxIndicator>
                  <Vector />
                </CheckboxRadix.CheckboxIndicator>
              </CheckboxRadix.Root>
            </div>
            {label}
          </Typography>
        </Label.Root>
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
