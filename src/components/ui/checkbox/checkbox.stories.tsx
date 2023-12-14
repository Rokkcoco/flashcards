import { useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox/checkbox'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Controlled: Story = {
  render: args => {
    const [checked, setChecked] = useState(true)

    return (
      <>
        <Checkbox
          {...args}
          checked={checked}
          label={'Check-box'}
          onChange={() => setChecked(!checked)}
        />
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
