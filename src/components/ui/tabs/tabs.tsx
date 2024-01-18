import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import Typography from '@/components/ui/typography/typography'
import * as Label from '@radix-ui/react-label'
import * as TabsRadix from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

import s from './tabs.module.scss'

type TabItemProps = {
  disabled?: boolean
} & ComponentPropsWithoutRef<typeof TabsRadix.Trigger>

const TabItem = forwardRef<ElementRef<typeof TabsRadix.Trigger>, TabItemProps>((props, ref) => {
  const { children, value, ...rest } = props

  return (
    <TabsRadix.Trigger {...rest} asChild className={s.trigger} ref={ref} value={value}>
      <Typography as={'button'} variant={'body_1'}>
        {children}
      </Typography>
    </TabsRadix.Trigger>
  )
})

TabItem.displayName = 'TabItem'

type Props = {
  disabled?: boolean
  indexToDisable?: number[]
  label: string
  onChange: (value: string) => void
  options: Record<string, string>
  value: string
} & Omit<
  ComponentPropsWithoutRef<typeof TabsRadix.Root>,
  'asChild' | 'onChange' | 'onValueChange' | 'value'
>

export const Tabs = forwardRef<ElementRef<typeof TabsRadix.Root>, Props>((props, ref) => {
  const {
    className,
    defaultValue,
    disabled,
    indexToDisable,
    label,
    onChange,
    options,
    value,
    ...rest
  } = props

  //todo object => array
  //todo maybe refactor same as dropdown

  return (
    <TabsRadix.Root
      className={clsx(s.root, className)}
      defaultValue={value}
      onValueChange={onChange}
      ref={ref}
      {...rest}
    >
      {label && (
        <Label.Root asChild className={s.label}>
          <Typography as={'label'} variant={'body_2'}>
            {label}
          </Typography>
        </Label.Root>
      )}
      <TabsRadix.List aria-label={'Manage your deck'} className={s.list}>
        {Object.keys(options).map((t, i) => (
          <TabItem disabled={disabled || indexToDisable?.includes(i)} key={options[t]} value={t}>
            {options[t]}
          </TabItem>
        ))}
      </TabsRadix.List>
    </TabsRadix.Root>
  )
})

Tabs.displayName = 'Tabs'
