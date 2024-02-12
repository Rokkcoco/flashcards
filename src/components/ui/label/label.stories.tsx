import { Meta, StoryObj } from '@storybook/react'

import { Label } from '.'

const meta = {
  component: Label,
  tags: ['autodocs'],
  title: 'Components/UI/Label',
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>
export const LabelStory: Story = {}
