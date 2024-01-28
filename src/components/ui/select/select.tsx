import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

import { ArrowIosDownOutline } from '@/assets'
import { Typography } from '@/components/ui'
import * as Label from '@radix-ui/react-label'
import * as SelectRadix from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

type SelectItemWithoutTextProps = { isPagination?: boolean } & Omit<
  ComponentPropsWithoutRef<typeof SelectRadix.Item>,
  'onChange'
>

export const SelectItemWithoutText = forwardRef<
  ElementRef<typeof SelectRadix.Item>,
  SelectItemWithoutTextProps
>(({ children, className, isPagination, ...rest }, ref) => {
  const classNames = {
    item: clsx(s.selectItem, isPagination && s.paginationSelectItem, className),
  }

  return (
    <SelectRadix.Item {...rest} className={classNames.item} ref={ref}>
      {children}
      <SelectRadix.ItemIndicator />
    </SelectRadix.Item>
  )
})

SelectItemWithoutText.displayName = 'SelectItemWithoutText'

type SelectItemWithTextProps = { isPagination?: boolean } & Omit<
  ComponentPropsWithoutRef<typeof SelectRadix.Item>,
  'onChange'
>

export const SelectItemWithText = forwardRef<
  ElementRef<typeof SelectRadix.Item>,
  SelectItemWithTextProps
>(({ children, className, isPagination, ...rest }, ref) => {
  const classNames = {
    item: clsx(s.selectItem, isPagination && s.paginationSelectItem, className),
  }

  return (
    <SelectRadix.Item {...rest} className={classNames.item} ref={ref}>
      <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
      <SelectRadix.ItemIndicator />
    </SelectRadix.Item>
  )
})

SelectItemWithText.displayName = 'SelectItemWithText'

export type SelectProps = {
  label?: string
  variant?: 'default' | 'pagination'
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>

export const Select = forwardRef<ElementRef<typeof SelectRadix.Trigger>, SelectProps>(
  ({ children, label, value, variant = 'default', ...rest }, ref) => {
    const isPagination = variant === 'pagination'
    const selectID = useId()

    //todo create new component for label

    const classNames = {
      content: clsx(s.selectContent, isPagination && s.paginationSelectContent),
      label: s.label,
      selectIcon: clsx(s.selectIcon, isPagination && s.paginationSelectIcon),
      selectViewport: s.s,
      trigger: clsx(s.selectTrigger, isPagination && s.paginationSelectTrigger),
    }

    return (
      <>
        {label && (
          <Label.Root asChild className={classNames.label}>
            <Typography as={'label'} htmlFor={selectID} variant={'body_2'}>
              {label}
            </Typography>
          </Label.Root>
        )}
        <SelectRadix.Root value={value} {...rest}>
          <SelectRadix.Trigger className={classNames.trigger} id={selectID} ref={ref}>
            <SelectRadix.Value aria-label={value} />
            <SelectRadix.Icon asChild className={classNames.selectIcon}>
              <ArrowIosDownOutline />
            </SelectRadix.Icon>
          </SelectRadix.Trigger>
          <SelectRadix.Portal>
            <SelectRadix.Content className={classNames.content} position={'popper'} sideOffset={0}>
              <SelectRadix.Viewport>{children}</SelectRadix.Viewport>
            </SelectRadix.Content>
          </SelectRadix.Portal>
        </SelectRadix.Root>
      </>
    )
  }
)

Select.displayName = 'Select'
