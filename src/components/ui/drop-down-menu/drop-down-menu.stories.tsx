import {
  CloseOutline,
  Edit2Outline,
  MoreVerticalOutline,
  PlayCircleOutline,
  TrashOutline,
} from '@/assets'
import { Avatar, Button, DropdownLabel } from '@/components/ui'
import { Meta, StoryObj } from '@storybook/react'

import { DropdownItem, DropdownMenu, DropdownSeparator } from './'

const meta = {
  component: DropdownMenu,
  tags: ['autodocs'],
  title: 'Components/UI/DropdownMenu',
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DropdownMenuWithAvatarStory: Story = {
  args: {
    trigger: (
      <button>
        <Avatar size={'small'}>John</Avatar>
      </button>
    ),
  },
  render: args => {
    return (
      <div style={{ marginLeft: '150px' }}>
        <DropdownMenu {...args}>
          <DropdownLabel>
            Label test <CloseOutline />
          </DropdownLabel>
          <DropdownSeparator />
          <DropdownItem>
            Sup sup sup
            <CloseOutline />
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem>
            Click click click <CloseOutline />
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem>
            <Button>LogOut</Button>
          </DropdownItem>
        </DropdownMenu>
      </div>
    )
  },
}
export const DropdownMenuWithIconrStory: Story = {
  args: {
    trigger: (
      <button
        style={{
          borderRadius: '50%',
          display: 'inline-flex',
          fill: 'white',
        }}
      >
        <MoreVerticalOutline />
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
