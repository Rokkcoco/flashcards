import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import Typography from '@/components/ui/typography/typography'
import * as Label from '@radix-ui/react-label'
import * as TabsRadix from '@radix-ui/react-tabs'

import s from './tabs.module.scss'

type TabItemProps = {
  disabled?: boolean
} & ComponentPropsWithoutRef<typeof TabsRadix.Trigger>

const TabItem = forwardRef<ElementRef<typeof TabsRadix.Trigger>, TabItemProps>((props, ref) => {
  const { children, value, ...rest } = props

  //Наверное совсем дичь
  return (
    <TabsRadix.Trigger asChild className={s.trigger} {...rest} ref={ref} value={value}>
      <Typography as={'button'} variant={'body_1'}>
        {children}
      </Typography>
    </TabsRadix.Trigger>
  )
})

type Props = {
  indexToDisable?: number[]
  onChange: (value: string) => void
  options: Record<string, string>
  title: string
  value: string
} & Omit<ComponentPropsWithoutRef<typeof TabsRadix.Root>, 'onChange' | 'onValueChange' | 'value'>

export const Tabs = forwardRef<ElementRef<typeof TabsRadix.Root>, Props>((props, ref) => {
  const { defaultValue, indexToDisable, onChange, options, title, value, ...rest } = props

  return (
    <TabsRadix.Root
      className={s.root}
      defaultValue={value}
      onValueChange={onChange}
      ref={ref}
      {...rest}
    >
      {title && (
        <Label.Root asChild className={s.label}>
          <Typography as={'label'} variant={'body_2'}>
            {title}
          </Typography>
        </Label.Root>
      )}
      <TabsRadix.List aria-label={'Manage your deck'} className={s.list}>
        {Object.keys(options).map((t, i) => (
          <TabItem disabled={indexToDisable?.includes(i)} key={options[t]} value={t}>
            {options[t]}
          </TabItem>
        ))}
      </TabsRadix.List>
    </TabsRadix.Root>
  )
})
