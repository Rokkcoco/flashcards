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

export const Default: Story = {
  args: {
    open: true,
    options: { first: 'Picture', second: 'Video', third: 'Audio' },
    title: 'Select one answer',
  },
  render: args => {
    const [open, setOpen] = useState(false)
    const onChange = () => setOpen(prevState => !prevState)

    return <Select {...args} onChange={onChange} open={open} />
  },
}
