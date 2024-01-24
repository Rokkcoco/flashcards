import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Select, SelectItemWithText } from './'

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/UI/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const SelectStory: Story = {
  args: {
    label: 'Select one answer',
  },
  render: args => {
    const options = { audio: 'Audio', picture: 'Picture', video: 'Video' }
    const [value, setValue] = useState(options['audio'])

    return (
      <Select {...args} onValueChange={setValue} value={value}>
        <SelectItemWithText value={options['audio']}>{options['audio']}</SelectItemWithText>
        <SelectItemWithText value={options['picture']}>{options['picture']}</SelectItemWithText>
        <SelectItemWithText value={options['video']}>{options['video']}</SelectItemWithText>
      </Select>
    )
  },
}
export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Select one answer',
  },
  render: args => {
    const options = { audio: 'Audio', picture: 'Picture', video: 'Video' }
    const [value, setValue] = useState(options['audio'])

    return (
      <Select {...args} onValueChange={setValue} value={value}>
        <SelectItemWithText value={options['audio']}>{options['audio']}</SelectItemWithText>
        <SelectItemWithText value={options['picture']}>{options['picture']}</SelectItemWithText>
        <SelectItemWithText value={options['video']}>{options['video']}</SelectItemWithText>
      </Select>
    )
  },
}

export const PaginationSelect: Story = {
  args: {
    value: '10',
    variant: 'pagination',
  },
  render: args => {
    const options = { 5: '5', 7: '7', 10: '10', 15: '15', 20: '20' }
    const [value, setValue] = useState(options['10'])

    return (
      <Select {...args} onValueChange={setValue} value={value}>
        <SelectItemWithText isPagination value={options['5']}>
          {options['5']}
        </SelectItemWithText>
        <SelectItemWithText isPagination value={options['7']}>
          {options['7']}
        </SelectItemWithText>
        <SelectItemWithText isPagination value={options['10']}>
          {options['10']}
        </SelectItemWithText>
        <SelectItemWithText isPagination value={options['15']}>
          {options['15']}
        </SelectItemWithText>
        <SelectItemWithText isPagination value={options['20']}>
          {options['20']}
        </SelectItemWithText>
      </Select>
    )
  },
}
