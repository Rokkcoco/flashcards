import { Meta, StoryObj } from '@storybook/react'

import { Header } from './'

const meta = {
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Ui/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderAuthorizedStory: Story = {
  args: {
    alt: 'ye',
    authorized: true,
    email: 'coolguy88@coolmail.usa',
    name: 'Liza',
    src: 'https://xsgames.co/randomusers/avatar.php?g=female',
  },
  render: args => {
    return <Header {...args} />
  },
}
export const HeaderNotAuthorizedStory: Story = {
  args: {
    alt: 'ye',
    authorized: false,
    email: 'coolguy88@coolmail.usa',
    name: 'Liza',
    src: 'https://xsgames.co/randomusers/avatar.php?g=female',
  },
  render: args => {
    return <Header {...args} />
  },
}
