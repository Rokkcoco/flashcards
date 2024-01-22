import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Typography } from '@/components/ui'
import * as Label from '@radix-ui/react-label'
import * as RadioGroupRadix from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

import s from './radio-group.module.scss'
type RadioItemProps = {
  label?: string
  value: number | string
} & Omit<ComponentPropsWithoutRef<typeof RadioGroupRadix.Item>, 'asChild'>

export const RadioItem = forwardRef<ElementRef<typeof RadioGroupRadix.Item>, RadioItemProps>(
  (props: RadioItemProps, ref) => {
    const { children, disabled, label, ...rest } = props

    const classNames = {
      icon: s.icon,
      indicator: s.indicator,
      label: clsx(s.label, disabled && s.disabled),
    }

    return (
      <Label.Root asChild>
        <Typography as={'label'} className={classNames.label} variant={'body_2'}>
          <RadioGroupRadix.Item {...rest} className={classNames.icon} disabled={disabled} ref={ref}>
            <RadioGroupRadix.Indicator className={classNames.indicator} />
          </RadioGroupRadix.Item>
          {label ?? children}
        </Typography>
      </Label.Root>
    )
  }
)

RadioItem.displayName = 'RadioItem'

export type RadioGroupProps = Omit<
  ComponentPropsWithoutRef<typeof RadioGroupRadix.Root>,
  'asChild' | 'onChange' | 'value'
>

export const RadioGroup = forwardRef<ElementRef<typeof RadioGroupRadix.Root>, RadioGroupProps>(
  (props, ref) => {
    const { children, className, ...rest } = props

    const classNames = {
      root: clsx(s.root, className),
    }

    return (
      <RadioGroupRadix.Root
        aria-label={'View density'}
        className={classNames.root}
        ref={ref}
        {...rest}
      >
        {children}
      </RadioGroupRadix.Root>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'
