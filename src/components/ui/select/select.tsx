import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { ArrowIosDownOutline, ArrowIosUp, KeyboardArrowDown } from '@/assets'
import { Typography } from '@/components/ui'
import * as Label from '@radix-ui/react-label'
import * as SelectRadix from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

type SelectItemProps = { variant?: 'default' | 'pagination' } & ComponentPropsWithoutRef<
  typeof SelectRadix.Item
>

const SelectItem = forwardRef<ElementRef<typeof SelectRadix.Item>, SelectItemProps>(
  ({ children, variant = 'default', ...rest }, ref) => {
    return (
      <Typography as={'label'} variant={VariantIsPagination(variant) ? 'body_2' : 'body_1'}>
        <SelectRadix.Item
          {...rest}
          className={clsx(s.SelectItem, VariantIsPagination(variant) && s.PaginationSelectItem)}
          ref={ref}
        >
          <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
          <SelectRadix.ItemIndicator className={s.SelectItemIndicators}></SelectRadix.ItemIndicator>
        </SelectRadix.Item>
      </Typography>
    )
  }
)

SelectItem.displayName = 'SelectItem'

export type SelectProps = {
  label?: string
  options: Record<string, string>
  value: string
  variant?: 'default' | 'pagination'
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>
export const Select = forwardRef<ElementRef<typeof SelectRadix.Trigger>, SelectProps>(
  ({ label, open, options, value, variant = 'default', ...rest }, ref) => {
    const GetTopicalIcon = (variant: 'default' | 'pagination', open: false | true | undefined) => {
      if (VariantIsPagination(variant)) {
        return <KeyboardArrowDown />
      }
      if (open) {
        return <ArrowIosUp />
      }

      return <ArrowIosDownOutline />
    }

    //todo rotate svg with styles, not with function. Data-state='open'
    //todo check shadcn select, maybe refactor
    //todo split selectItem with selectItemText
    //todo create new component for label
    return (
      <>
        {label && (
          <Label.Root className={s.label}>
            <Typography as={'label'} variant={'body_2'}>
              {label}
            </Typography>
          </Label.Root>
        )}
        <Typography as={'label'} variant={VariantIsPagination(variant) ? 'body_2' : 'body_1'}>
          <SelectRadix.Root open={open} {...rest}>
            <SelectRadix.Trigger
              className={clsx(
                s.SelectTrigger,
                VariantIsPagination(variant) && s.PaginationSelectTrigger
              )}
              ref={ref}
            >
              <SelectRadix.Value aria-label={value}>{options[value]}</SelectRadix.Value>
              <SelectRadix.Icon asChild className={s.SelectIcon}>
                {GetTopicalIcon(variant, open)}
              </SelectRadix.Icon>
            </SelectRadix.Trigger>
            <SelectRadix.Portal>
              <SelectRadix.Content
                className={clsx(
                  s.SelectContent,
                  VariantIsPagination(variant) && s.PaginationSelectContent
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

function VariantIsPagination(variant: 'default' | 'pagination'): boolean {
  return variant === 'pagination'
}

Select.displayName = 'Select'
