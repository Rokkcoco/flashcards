import { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from './'

const meta = {
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/RadioGroup',
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>
export const RadioStory: Story = {
  args: {
    options: [
      { label: 'Value1', value: '1' },
      { label: 'Value2', value: '2' },
      { label: 'Value3', value: '3' },
    ],
  },
}
