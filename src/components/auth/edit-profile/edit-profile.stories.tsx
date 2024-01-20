import { Meta, StoryObj } from '@storybook/react'

import { EditProfile } from './'

const meta = {
  component: EditProfile,
  tags: ['autodocs'],
  title: 'Components/EditProfile',
} satisfies Meta<typeof EditProfile>

export default meta
type Story = StoryObj<typeof meta>

export const EditProfileStory: Story = {
  args: {
    alt: '',
    email: 'youremail@email.com',
    name: 'John',
    onSubmit: x => x,
    src: '',
  },
  render: args => {
    const callback = (data: any) => console.log(data)

    return <EditProfile {...args} onSubmit={callback} />
  },
}
