import { useState } from 'react'

import { PersonalInformation } from '@/components/profile/personal-information/personal-information'
import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  args: {
    onLogOut: action('Log out'),
  },
  component: PersonalInformation,
  tags: ['autodocs'],
  title: 'Components/Auth/PersonalInformation',
} satisfies Meta<typeof PersonalInformation>

export default meta
type Story = StoryObj<typeof meta>

export const PersonalInformationStory: Story = {
  args: {
    alt: 'ye',
    email: 'youremail@email.com',
    name: '',
    src: 'https://xsgames.co/randomusers/avatar.php?g=female',
  },
  render: args => {
    const [firstName, setFirstName] = useState('Lisa')
    const callback = (data: any) => setFirstName(data.name)

    return <PersonalInformation {...args} name={firstName} onSubmit={callback} />
  },
}
