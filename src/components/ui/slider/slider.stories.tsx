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
    defaultValue: [0, 100],
    max: 100,
    step: 1,
    value: [0, 100],
  },
}
