import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Typography } from '@/components/ui'
import * as Label from '@radix-ui/react-label'
import * as TabsRadix from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

import s from './tabs.module.scss'

type TabItemProps = ComponentPropsWithoutRef<typeof TabsRadix.Trigger>

export const TabItem = forwardRef<ElementRef<typeof TabsRadix.Trigger>, TabItemProps>(
  (props, ref) => {
    const { children, ...rest } = props

    return (
      <TabsRadix.Trigger {...rest} asChild className={s.trigger} ref={ref}>
        <Typography as={'button'} variant={'body_1'}>
          {children}
        </Typography>
      </TabsRadix.Trigger>
    )
  }
)

TabItem.displayName = 'TabItem'

type Props = {
  label?: string
} & Omit<ComponentPropsWithoutRef<typeof TabsRadix.Root>, 'onChange'>

export const Tabs = forwardRef<ElementRef<typeof TabsRadix.Root>, Props>((props, ref) => {
  const { children, className, defaultValue, label, value, ...rest } = props

  const classNames = {
    label: s.label,
    list: s.list,
    root: clsx(s.root, className),
  }

  return (
    <TabsRadix.Root className={classNames.root} defaultValue={value} ref={ref} {...rest}>
      {label && (
        <Label.Root asChild className={classNames.label}>
          <Typography as={'label'} variant={'body_2'}>
            {label}
          </Typography>
        </Label.Root>
      )}
      <TabsRadix.List aria-label={'Manage your deck'} className={classNames.list}>
        {children}
      </TabsRadix.List>
    </TabsRadix.Root>
  )
})

Tabs.displayName = 'Tabs'
