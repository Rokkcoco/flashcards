import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { ArrowIosDownOutline, ArrowIosUp, KeyboardArrowDown } from '@/assets'
import Typography from '@/components/ui/typography/typography'
import * as Label from '@radix-ui/react-label'
import * as SelectRadix from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

type SelectItemProps = { variant?: 'default' | 'pagination' } & ComponentPropsWithoutRef<
  typeof SelectRadix.Item
>

const SelectItem = forwardRef<ElementRef<typeof SelectRadix.Item>, SelectItemProps>(
  (props, ref) => {
    const { children, variant = 'default', ...rest } = props

    return (
      <Typography as={'label'} variant={variant === 'pagination' ? 'body_2' : 'body_1'}>
        <SelectRadix.Item
          className={clsx(s.SelectItem, variant === 'pagination' ? s.PaginationSelectItem : '')}
          {...rest}
          ref={ref}
        >
          <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
          <SelectRadix.ItemIndicator className={s.SelectItemIndicators}></SelectRadix.ItemIndicator>
        </SelectRadix.Item>
      </Typography>
    )
  }
)

export type SelectProps = {
  onChange: (value: string) => void
  options: Record<string, string>
  title?: string
  value: string
  variant?: 'default' | 'pagination'
} & Omit<ComponentPropsWithoutRef<typeof SelectRadix.Root>, 'onValueChange' | 'value'>
export const Select = forwardRef<ElementRef<typeof SelectRadix.Trigger>, SelectProps>(
  ({ onChange, open, options, title, value, variant = 'default', ...rest }, ref) => {
    console.log(open)

    return (
      <>
        {title && (
          <Label.Root className={s.label}>
            <Typography as={'label'} variant={'body_2'}>
              {title}
            </Typography>
          </Label.Root>
        )}
        <Typography as={'label'} variant={variant === 'pagination' ? 'body_2' : 'body_1'}>
          <SelectRadix.Root onValueChange={onChange} open={open} value={value} {...rest}>
            <SelectRadix.Trigger
              className={clsx(
                s.SelectTrigger,
                variant === 'pagination' ? s.PaginationSelectTrigger : ''
              )}
              ref={ref}
            >
              <SelectRadix.Value aria-label={value}>{options[value]}</SelectRadix.Value>
              <SelectRadix.Icon asChild className={s.SelectIcon}>
                {variant === 'pagination' ? (
                  <KeyboardArrowDown />
                ) : open ? (
                  <ArrowIosUp />
                ) : (
                  <ArrowIosDownOutline />
                )}
              </SelectRadix.Icon>
            </SelectRadix.Trigger>
            <SelectRadix.Portal>
              <SelectRadix.Content
                className={clsx(
                  s.SelectContent,
                  variant === 'pagination' ? s.PaginationSelectContent : ''
                )}
                position={'popper'}
                sideOffset={0}
              >
                <SelectRadix.Viewport className={s.SelectViewport}>
                  {Object.keys(options).map(t => (
                    <SelectItem key={t} value={t} variant={variant}>
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
  }
)
