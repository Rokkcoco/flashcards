import type { Meta, StoryObj } from '@storybook/react'

import Typography from '@/components/ui/typography/typography'

const meta = {
  component: Typography,
  tags: ['autodocs'],
  title: 'Components/Auth/SignUpForm',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
