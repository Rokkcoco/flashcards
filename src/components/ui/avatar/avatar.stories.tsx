import { Meta, StoryObj } from '@storybook/react'

import { Avatar } from './'

const meta = {
  component: Avatar,
  tags: ['autodocs'],
  title: 'Components/Ui/Avatar',
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const AvatarStory: Story = {
  args: {},
  render: args => {
    return <Avatar {...args}>EP</Avatar>
  },
}
