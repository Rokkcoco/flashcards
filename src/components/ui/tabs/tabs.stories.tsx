import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Tabs } from './'

const meta = {
  component: Tabs,
  tags: ['autodocs'],
  title: 'Components/Tabs',
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const TabsWithControl: Story = {
  args: {
    label: 'Choose one',
    onChange: x => x,
    options: { '1': 'Test1', '2': 'Test2', '3': 'Test3', '4': 'Test4', '5': 'Test5', '6': 'Test6' },
    value: '1',
  },
  render: args => {
    const [value, setValue] = useState('1')
    const indexToDisable: number[] = [1, 3]

    return <Tabs {...args} indexToDisable={indexToDisable} onChange={setValue} value={value} />
  },
}
export const TabsDisabled: Story = {
  args: {
    disabled: true,
    label: 'Choose one',
    onChange: x => x,
    options: { '1': 'Test1', '2': 'Test2', '3': 'Test3', '4': 'Test4', '5': 'Test5', '6': 'Test6' },
    value: '1',
  },
  render: args => {
    const [value, setValue] = useState('1')

    return <Tabs {...args} onChange={setValue} value={value} />
  },
}
