import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import Typography from '@/components/ui/typography/typography'
import * as RadioGroupRadix from '@radix-ui/react-radio-group'

import s from './radio-group.module.scss'
type SingleRadioProps = {
  label: string
} & Omit<ComponentPropsWithoutRef<typeof RadioGroupRadix.Item>, 'asChild'>

const SingleRadio = forwardRef<ElementRef<typeof RadioGroupRadix.Item>, SingleRadioProps>(
  (props: SingleRadioProps, ref) => {
    const { label, ...rest } = props

    return (
      <Typography as={'label'} variant={'body_2'}>
        <RadioGroupRadix.Item ref={ref} {...rest} className={s.icon}>
          <RadioGroupRadix.Indicator className={s.indicator} forceMount />
        </RadioGroupRadix.Item>
        {label}
      </Typography>
    )
  }
)

type Options = {
  label: string
  value: string
}

type Props = {
  options: Options[]
} & Omit<ComponentPropsWithoutRef<typeof RadioGroupRadix.Root>, 'asChild'>

export const RadioGroup = forwardRef<ElementRef<typeof RadioGroupRadix.Root>, Props>(
  (props: Props, ref) => {
    const { options, ...rest } = props
    const RadioButtons = options.map(t => <SingleRadio key={t.label} {...t} />)

    return (
      <RadioGroupRadix.Root className={s.root} ref={ref} {...rest}>
        {RadioButtons}
      </RadioGroupRadix.Root>
    )
  }
)
