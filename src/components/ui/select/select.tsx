import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { ArrowIosDownOutline, ArrowIosUp } from '@/assets'
import Typography from '@/components/ui/typography/typography'
import * as Label from '@radix-ui/react-label'
import * as SelectRadix from '@radix-ui/react-select'

import s from './select.module.scss'

type SelectItemProps = {} & ComponentPropsWithoutRef<typeof SelectRadix.Item>

const SelectItem = forwardRef<ElementRef<typeof SelectRadix.Item>, SelectItemProps>(
  (props, ref) => {
    const { children, ...rest } = props

    return (
      <Typography as={'label'} variant={'body_1'}>
        <SelectRadix.Item className={s.SelectItem} {...rest} ref={ref}>
          <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
        </SelectRadix.Item>
      </Typography>
    )
  }
)

type Props = {
  label: string
  onChange: (value: string) => void
  options: Record<string, string>
  value: string
} & Omit<ComponentPropsWithoutRef<typeof SelectRadix.Root>, 'onValueChange' | 'value'>
export const Select = forwardRef<ElementRef<typeof SelectRadix.Trigger>, Props>((props, ref) => {
  const { label, onChange, open, options, value, ...rest } = props

  //todo htmlFor

  //todo check label or title
  return (
    <>
      <Label.Root asChild className={s.label}>
        <Typography as={'label'} variant={'body_2'}>
          {label}
        </Typography>
      </Label.Root>
      <SelectRadix.Root onValueChange={onChange} open={open} value={value} {...rest}>
        <SelectRadix.Trigger className={s.SelectTrigger} ref={ref}>
          <SelectRadix.Value aria-label={options[value]}>{options[value]}</SelectRadix.Value>
          <SelectRadix.Icon asChild className={s.SelectIcon}>
            {open ? <ArrowIosUp /> : <ArrowIosDownOutline />}
          </SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content className={s.SelectContent} position={'popper'} sideOffset={0}>
            <SelectRadix.Viewport className={s.SelectViewport}>
              {Object.keys(options).map(t => (
                <SelectItem key={t} value={t}>
                  {options[t]}
                </SelectItem>
              ))}
            </SelectRadix.Viewport>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </>
  )
})
