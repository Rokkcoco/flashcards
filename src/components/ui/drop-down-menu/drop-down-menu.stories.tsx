import { CloseOutline, Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets'
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
    trigger: (
      <button>
        <Avatar>John</Avatar>
      </button>
    ),
  },
  render: args => {
    return (
      <div style={{ marginLeft: '150px' }}>
        <DropdownMenu {...args}>
          <DropdownItem>
            YOooooooo <CloseOutline />
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem>
            COOLOOOOoooooo <CloseOutline />
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem>
            <Avatar>DG</Avatar>
          </DropdownItem>
        </DropdownMenu>
      </div>
    )
  },
}
export const DropdownMenuWithoutTriggerStory: Story = {
  args: {
    trigger: (
      <button>
        <Avatar>John</Avatar>
      </button>
    ),
  },

  render: args => {
    return (
      <div style={{ marginLeft: '150px' }}>
        <DropdownMenu {...args}>
          <DropdownItem>
            <PlayCircleOutline /> Learn
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem>
            <Edit2Outline /> Edit
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem>
            <TrashOutline />
            Delete
          </DropdownItem>
        </DropdownMenu>
      </div>
    )
  },
}
