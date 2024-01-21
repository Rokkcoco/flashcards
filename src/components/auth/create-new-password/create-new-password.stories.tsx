import { Meta, StoryObj } from '@storybook/react'

import { CreateNewPassword } from './'

const meta = {
  component: CreateNewPassword,
  tags: ['autodocs'],
  title: 'Components/Auth/CreateNewPassword',
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const CreateNewPasswordStory: Story = {
  args: {},
  render: args => {
    const callback = (data: any) => console.log(data)

    return <CreateNewPassword {...args} onSubmit={callback} />
  },
}
