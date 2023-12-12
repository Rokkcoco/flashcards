import type { Meta, StoryObj } from '@storybook/react'

import { Typeography } from './typeography'

const meta = {
  component: Typeography,
  tags: ['autodocs'],
  title: 'Components/Typeography',
} satisfies Meta<typeof Typeography>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
