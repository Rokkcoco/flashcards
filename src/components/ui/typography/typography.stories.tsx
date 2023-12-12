import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './typography'

const meta = {
  component: Typography,
  tags: ['autodocs'],
  title: 'Components/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, officiis labore reiciendis accusamus harum expedita repellat consequatur! Deserunt reiciendis, placeat suscipit tempore dolor sequi fuga! Molestiae voluptate alias quas soluta?',
  },
}
