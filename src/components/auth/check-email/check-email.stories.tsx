import { Meta, StoryObj } from '@storybook/react'

import { CheckEmail } from './'

const meta = {
  component: CheckEmail,
  tags: ['autodocs'],
  title: 'Components/Auth/CheckEmail',
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const CheckEmailStory: Story = {
  args: {
    mail: 'Example@yourmail.com',
  },
}
