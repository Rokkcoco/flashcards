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
    step: 1,
    value: [],
  },
  render: args => {
    const [value, setValue] = useState([0, 100])

    return <Slider {...args} onChange={setValue} value={value} />
  },
}
