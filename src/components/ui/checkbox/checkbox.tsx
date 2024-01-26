import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

import { Vector } from '@/assets'
import { Typography } from '@/components/ui'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { CheckedState } from '@radix-ui/react-checkbox'
import * as Label from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  label?: string
} & Omit<ComponentPropsWithoutRef<typeof CheckboxRadix.Root>, 'onChange'>

export const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxProps>(
  (props, ref) => {
    const { checked = false, disabled, id, label, onCheckedChange, ...rest } = props

    const classNames = {
      buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled),
      label: clsx(s.label, disabled && s.disabled),
      root: s.root,
    }

    const useID = useId()
    const checkboxID = id ?? useID

    return (
      <div className={classNames.buttonWrapper}>
        <CheckboxRadix.Root
          checked={checked}
          className={classNames.root}
          disabled={disabled}
          id={checkboxID}
          onCheckedChange={onCheckedChange}
          ref={ref}
          {...rest}
        >
          <CheckboxRadix.CheckboxIndicator>
            <Vector />
          </CheckboxRadix.CheckboxIndicator>
        </CheckboxRadix.Root>
        <Label.Root asChild htmlFor={checkboxID}>
          <Typography as={'label'} className={classNames.label} variant={'body_2'}>
            {label}
          </Typography>
        </Label.Root>
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
