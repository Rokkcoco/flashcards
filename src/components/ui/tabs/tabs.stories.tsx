import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { TabItem, Tabs } from './'

const meta = {
  component: Tabs,
  tags: ['autodocs'],
  title: 'Components/Ui/Tabs',
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const TabsWithControl: Story = {
  args: {
    label: 'Choose one',
    value: '1',
  },
  render: args => {
    const [value, setValue] = useState('1')

    return (
      <Tabs {...args} onValueChange={setValue} value={value}>
        <TabItem value={'1'}>Test1</TabItem>
        <TabItem disabled value={'2'}>
          Test2
        </TabItem>
        <TabItem value={'3'}>Test3</TabItem>
        <TabItem disabled value={'4'}>
          Test4
        </TabItem>
        <TabItem value={'5'}>Test5</TabItem>
        <TabItem value={'6'}>Test6</TabItem>
      </Tabs>
    )
  },
}
// export const TabsDisabled: Story = {
//   args: {
//     disabled: true,
//     label: 'Choose one',
//     onChange: x => x,
//     options: { '1': 'Test1', '2': 'Test2', '3': 'Test3', '4': 'Test4', '5': 'Test5', '6': 'Test6' },
//     value: '1',
//   },
//   render: args => {
//     const [value, setValue] = useState('1')
//
//     return <Tabs {...args} onChange={setValue} value={value} />
//   },
// }
