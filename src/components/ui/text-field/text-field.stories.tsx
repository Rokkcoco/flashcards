import { Meta, StoryObj } from '@storybook/react'

import { TextField } from './'

const meta = {
  component: TextField,
  tags: ['autodocs'],
  title: 'Components/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const SearchTextField: Story = {
  args: {
    error: 'Error!',
    label: 'Search field',
    placeholder: 'Input search',
    type: 'search',
  },
}
export const PasswordTextField: Story = {
  args: {
    error: 'Wrong password!',
    label: 'Enter your password',
    placeholder: 'Input',
    type: 'password',
  },
}
export const DefaultTextField: Story = {
  args: {
    error: 'Wrong password!',
    label: 'Enter your password',
    placeholder: 'Input',
  },
}
