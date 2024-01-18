import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import Typography from '@/components/ui/typography/typography'
import * as Label from '@radix-ui/react-label'
import * as RadioGroupRadix from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

import s from './radio-group.module.scss'
type RadioItemProps = {
  label: string
  value: number | string
} & Omit<ComponentPropsWithoutRef<typeof RadioGroupRadix.Item>, 'asChild'>

const RadioItem = forwardRef<ElementRef<typeof RadioGroupRadix.Item>, RadioItemProps>(
  (props: RadioItemProps, ref) => {
    const { disabled, label, ...rest } = props

    const classNames = {
      icon: s.icon,
      indicator: s.indicator,
      label: clsx(s.label, disabled && s.disabled),
    }

    return (
      <Label.Root asChild>
        <Typography as={'label'} className={classNames.label} variant={'body_2'}>
          <RadioGroupRadix.Item ref={ref} {...rest} className={classNames.icon} disabled={disabled}>
            <RadioGroupRadix.Indicator className={classNames.indicator} />
          </RadioGroupRadix.Item>
          {label}
        </Typography>
      </Label.Root>
    )
  }
)

RadioItem.displayName = 'RadioItem'

type Props = {
  onChange: (value: string) => void
  options: RadioItemProps[]
  value: string
} & Omit<
  ComponentPropsWithoutRef<typeof RadioGroupRadix.Root>,
  'asChild' | 'onChange' | 'onValueChange' | 'value'
>

export const RadioGroup = forwardRef<ElementRef<typeof RadioGroupRadix.Root>, Props>(
  (props: Props, ref) => {
    const { className, onChange, options, ...rest } = props

    const classNames = {
      root: clsx(s.root, className),
    }

    return (
      <RadioGroupRadix.Root
        className={classNames.root}
        ref={ref}
        {...rest}
        aria-label={'View density'}
        onValueChange={onChange}
      >
        {options.map(t => (
          <RadioItem key={t.value} {...t} />
        ))}
      </RadioGroupRadix.Root>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'
