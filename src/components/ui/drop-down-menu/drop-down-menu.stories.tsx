import { Avatar } from '@/components/ui/avatar'
import { Meta, StoryObj } from '@storybook/react'

import { DropdownMenu } from './'

const meta = {
  component: DropdownMenu,
  tags: ['autodocs'],
  title: 'Components/DropdownMenu',
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DropdownMenuStory: Story = {
  args: {
    items: [
      {
        content: (
          <>
            <Avatar>JJ</Avatar>
            <div>yes</div>
            <div>yes</div>
          </>
        ),
      },
      {
        content: 'NO',
      },
    ],
    trigger: 'TEST',
  },
  render: args => {
    return <DropdownMenu {...args} />
  },
}
