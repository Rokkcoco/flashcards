import { CloseOutline } from '@/assets'
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
      { content: 'Text' },
      {
        content: (
          <>
            Yes <CloseOutline />
          </>
        ),
      },
    ],
  },
  render: args => {
    return <DropdownMenu {...args} />
  },
}
