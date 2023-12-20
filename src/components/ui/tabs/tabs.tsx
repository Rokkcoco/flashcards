import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as TabsRadix from '@radix-ui/react-tabs'
type Props = {
  value?: string
} & ComponentPropsWithoutRef<typeof TabsRadix.Root>

export const Tabs = forwardRef<ElementRef<typeof TabsRadix.Root>, Props>((props, ref) => {
  return (
    <TabsRadix.Root defaultValue={'tab1'} orientation={'vertical'} ref={ref} {...props}>
      <TabsRadix.List aria-label={'tabs example'}>
        <TabsRadix.Trigger value={'tab1'}>One</TabsRadix.Trigger>
        <TabsRadix.Trigger value={'tab2'}>Two</TabsRadix.Trigger>
        <TabsRadix.Trigger value={'tab3'}>Three</TabsRadix.Trigger>
      </TabsRadix.List>
      <TabsRadix.Content value={'tab1'}>Tab one content</TabsRadix.Content>
      <TabsRadix.Content value={'tab2'}>Tab two content</TabsRadix.Content>
      <TabsRadix.Content value={'tab3'}>Tab three content</TabsRadix.Content>
    </TabsRadix.Root>
  )
})
