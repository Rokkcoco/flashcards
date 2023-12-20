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
          <SelectRadix.ItemIndicator className={s.SelectItemIndicators}></SelectRadix.ItemIndicator>
        </SelectRadix.Item>
      </Typography>
    )
  }
)

type Props = {
  onChange: (value: string) => void
  options: Record<string, string>
  title: string
  value: string
} & Omit<ComponentPropsWithoutRef<typeof SelectRadix.Root>, 'onValueChange' | 'value'>
export const Select = forwardRef<ElementRef<typeof SelectRadix.Trigger>, Props>((props, ref) => {
  const { onChange, open, options, title, value, ...rest } = props

  return (
    <>
      <Label.Root className={s.label}>
        <Typography as={'label'} variant={'body_2'}>
          {title}
        </Typography>
      </Label.Root>
      <Typography as={'label'} variant={'body_1'}>
        <SelectRadix.Root onValueChange={onChange} open={open} value={value} {...rest}>
          <SelectRadix.Trigger className={s.SelectTrigger} ref={ref}>
            <SelectRadix.Value aria-label={value}>{options[value]}</SelectRadix.Value>
            <SelectRadix.Icon asChild className={s.SelectIcon}>
              {!open ? <ArrowIosDownOutline /> : <ArrowIosUp />}
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
      </Typography>
    </>
  )
})
