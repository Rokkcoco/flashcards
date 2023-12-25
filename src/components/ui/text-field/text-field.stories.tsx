import { useState } from 'react'

import logOut from '@/assets/icons/log-out'
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
  render: args => {
    const [text, setText] = useState('')
    const changeInputValue = (value: string) => {
      setText(value)
    }
    const onKey = () => console.log('alert')

    return <TextField {...args} onChange={changeInputValue} onKeyDown={onKey} value={text} />
  },
}
export const PasswordTextField: Story = {
  args: {
    error: 'Wrong password!',
    label: 'Enter your password',
    placeholder: 'Input',
    type: 'password',
  },
  render: args => {
    const [text, setText] = useState('')
    const changeInputValue = (value: string) => {
      setText(value)
    }

    return <TextField {...args} onChange={changeInputValue} value={text} />
  },
}
export const DefaultTextField: Story = {
  args: {
    error: 'Wrong password!',
    label: 'Enter your password',
    placeholder: 'Input',
  },
  render: args => {
    const [text, setText] = useState('')
    const changeInputValue = (value: string) => {
      setText(value)
    }

    return <TextField {...args} onChange={changeInputValue} value={text} />
  },
}
