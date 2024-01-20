import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from './'

const meta = {
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/Ui/RadioGroup',
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>
export const RadioStory: Story = {
  args: {
    onChange: x => x,
    options: [
      { label: 'Value1', value: '1' },
      { label: 'Value2', value: '2' },
      { disabled: true, label: 'Value3', value: '3' },
      { checked: true, disabled: true, label: 'Value4', value: '4' },
    ],
    value: '1',
  },
  render: args => {
    const [value, setValue] = useState('1')

    const onChangeHandler = (newValue: string) => setValue(newValue)

    return <RadioGroup {...args} onChange={onChangeHandler} value={value} />
  },
}
