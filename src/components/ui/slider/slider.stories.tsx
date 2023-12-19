import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Slider } from './'

const meta = {
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>
export const SliderStory: Story = {
  args: {
    max: 10,
    min: 0,
    step: 1,
    value: [0, 10],
  },
  render: args => {
    const [value, setValue] = useState([0, 10])

    return <Slider {...args} onValueChange={setValue} value={value} />
  },
}
