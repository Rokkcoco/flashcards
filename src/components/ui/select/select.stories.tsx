import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Select } from './'

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const SelectStory: Story = {
  args: {
    options: { audio: 'Audio', picture: 'Picture', video: 'Video' },
    title: 'Select one answer',
    value: 'picture',
  },
  render: args => {
    const [value, setValue] = useState('picture')

    return <Select {...args} onChange={setValue} value={value} />
  },
}
export const Disabled: Story = {
  args: {
    disabled: true,
    options: { audio: 'Audio', picture: 'Picture', video: 'Video' },
    title: 'Select one answer',
    value: 'picture',
  },
  render: args => {
    const [value, setValue] = useState('picture')

    return <Select {...args} onChange={setValue} value={value} />
  },
}

export const PaginationSelect: Story = {
  args: {
    options: { 10: '10', 20: '20', 30: '30', 50: '50', 100: '100' },
    value: '10',
    variant: 'pagination',
  },
  render: args => {
    const [value, setValue] = useState('10')

    return <Select {...args} onChange={setValue} value={value} />
  },
}
