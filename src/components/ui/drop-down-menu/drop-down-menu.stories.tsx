import { CloseOutline } from '@/assets'
import { Avatar } from '@/components/ui/avatar'
import { Meta, StoryObj } from '@storybook/react'

import { DropdownItem, DropdownMenu, DropdownSeparator } from './'

const meta = {
  component: DropdownMenu,
  tags: ['autodocs'],
  title: 'Components/DropdownMenu',
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DropdownMenuStory: Story = {
  args: {
    trigger: 'YES',
  },
  render: args => {
    return (
      <DropdownMenu {...args}>
        <DropdownItem>
          YO <CloseOutline />
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem>
          COOL <CloseOutline />
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem>
          <Avatar>DG</Avatar>
        </DropdownItem>
      </DropdownMenu>
    )
  },
}
