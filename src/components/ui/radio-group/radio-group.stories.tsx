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
      { label: 'ye', value: 'ye' },
      { label: 'ye1', value: 'ye1' },
      { label: 'ye2', value: 'ye2' },
    ],
  },
}
