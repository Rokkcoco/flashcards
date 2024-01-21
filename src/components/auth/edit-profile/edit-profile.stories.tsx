import { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { EditProfile } from './'

const meta = {
  args: {
    onLogOut: action('Log out'),
  },
  component: EditProfile,
  tags: ['autodocs'],
  title: 'Components/EditProfile',
} satisfies Meta<typeof EditProfile>

export default meta
type Story = StoryObj<typeof meta>

export const EditProfileStory: Story = {
  args: {
    alt: 'ye',
    email: 'youremail@email.com',
    name: '',
    src: 'https://xsgames.co/randomusers/avatar.php?g=female',
  },
  render: args => {
    const [firstName, setFirstName] = useState('Lisa')
    const callback = (data: any) => setFirstName(data.name)

    return <EditProfile {...args} name={firstName} onSubmit={callback} />
  },
}
