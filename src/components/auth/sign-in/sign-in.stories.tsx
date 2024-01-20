import { Meta, StoryObj } from '@storybook/react'

import { SignIn } from './'

const meta = {
  component: SignIn,
  tags: ['autodocs'],
  title: 'Components/Auth/SignIn',
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const SignInStory: Story = {
  args: {},
  render: args => {
    const callback = (data: any) => console.log(data)

    return <SignIn {...args} onSubmit={callback} />
  },
}
