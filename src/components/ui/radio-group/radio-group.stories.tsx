import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { RadioGroup, RadioItem } from './'

const meta = {
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/UI/RadioGroup',
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>
export const RadioStory: Story = {
  args: {},
  render: () => {
    const [value, setValue] = useState('1')

    const onChangeHandler = (newValue: string) => setValue(newValue)

    return (
      <RadioGroup defaultValue={value} onValueChange={onChangeHandler}>
        <RadioItem value={'1'}>Value1</RadioItem>
        <RadioItem value={'2'}>Value2</RadioItem>
        <RadioItem disabled value={'3'}>
          Value3
        </RadioItem>
        <RadioItem disabled value={'4'}>
          Value4
        </RadioItem>
      </RadioGroup>
    )
  },
}
