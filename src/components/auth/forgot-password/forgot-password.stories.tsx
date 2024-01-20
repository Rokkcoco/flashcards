import { Meta, StoryObj } from '@storybook/react'

import { ForgotPassword } from './'

const meta = {
  component: ForgotPassword,
  tags: ['autodocs'],
  title: 'Components/Auth/ForgotPassword',
} satisfies Meta<typeof ForgotPassword>

export default meta
type Story = StoryObj<typeof meta>

export const ForgotPasswordStory: Story = {
  args: {},
  render: args => {
    const callback = (data: any) => console.log(data)

    return <ForgotPassword {...args} onSubmit={callback} />
  },
}
