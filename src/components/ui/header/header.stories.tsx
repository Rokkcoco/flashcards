import { Meta, StoryObj } from '@storybook/react'

import { Header } from './'

const meta = {
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Ui/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderStory: Story = {
  args: {
    authorized: false,
  },
  render: args => {
    return <Header {...args} />
  },
}
