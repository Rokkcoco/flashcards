import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './'

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/UI/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Controlled: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Check-box',
  },
  render: args => {
    const [checked, setChecked] = useState(true)
    const onChangeHandler = () => setChecked(!checked)

    return (
      <>
        <Checkbox {...args} checked={checked} onCheckedChange={onChangeHandler} />
      </>
    )
  },
}

export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Check-box',
  },
}
export const Unchecked: Story = {
  args: {
    checked: false,
    disabled: false,
    label: 'Check-box',
  },
}
export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'Check-box',
  },
}
export const CheckedAndDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Check-box',
  },
}
