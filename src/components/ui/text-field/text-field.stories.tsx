import { ChangeEvent, useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { TextField } from './'

const meta = {
  component: TextField,
  tags: ['autodocs'],
  title: 'Components/UI/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const SearchTextFieldWithError: Story = {
  args: {
    errorMessage: 'Error!',
    label: 'Search field',
    placeholder: 'Input search',
    type: 'search',
  },
  render: args => {
    const [text, setText] = useState('')
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.currentTarget.value)
    }
    const onClear = () => setText('')
    const onKey = () => console.log(text)

    return (
      <TextField
        {...args}
        onChange={changeInputValue}
        onInputClear={onClear}
        onKeyEnter={onKey}
        value={text}
      />
    )
  },
}
export const SearchTextFieldWithoutError: Story = {
  args: {
    label: 'Search field',
    placeholder: 'Input search',
    type: 'search',
  },
  render: args => {
    const [text, setText] = useState('')
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.currentTarget.value)
    }
    const onClear = () => setText('')
    const onKey = () => console.log(text)

    return (
      <TextField
        {...args}
        onChange={changeInputValue}
        onInputClear={onClear}
        onKeyEnter={onKey}
        value={text}
      />
    )
  },
}
export const SearchTextFieldDisabled: Story = {
  args: {
    label: 'Search field',
    placeholder: 'Input search',
    type: 'search',
  },
  render: args => {
    const [text, setText] = useState('')
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.currentTarget.value)
    }
    const onClear = () => setText('')
    const onKey = () => console.log(text)

    return (
      <TextField
        {...args}
        onChange={changeInputValue}
        onInputClear={onClear}
        onKeyEnter={onKey}
        value={text}
      />
    )
  },
}
export const PasswordTextFieldWithError: Story = {
  args: {
    errorMessage: 'Wrong password!',
    label: 'Enter your password',
    placeholder: 'Input',
    type: 'password',
  },
  render: args => {
    const [text, setText] = useState('')
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.currentTarget.value)
    }
    const onClear = () => setText('')
    const onKey = () => console.log(text)

    return (
      <TextField
        {...args}
        onChange={changeInputValue}
        onInputClear={onClear}
        onKeyEnter={onKey}
        value={text}
      />
    )
  },
}
export const PasswordTextFieldWithoutError: Story = {
  args: {
    label: 'Enter your password',
    placeholder: 'Input',
    type: 'password',
  },
  render: args => {
    const [text, setText] = useState('')
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.currentTarget.value)
    }
    const onClear = () => setText('')
    const onKey = () => console.log(text)

    return (
      <TextField
        {...args}
        onChange={changeInputValue}
        onInputClear={onClear}
        onKeyEnter={onKey}
        value={text}
      />
    )
  },
}
export const PasswordTextFieldDisabled: Story = {
  args: {
    label: 'Enter your password',
    placeholder: 'Input',
    type: 'password',
  },
  render: args => {
    const [text, setText] = useState('')
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.currentTarget.value)
    }
    const onClear = () => setText('')
    const onKey = () => console.log(text)

    return (
      <TextField
        {...args}
        onChange={changeInputValue}
        onInputClear={onClear}
        onKeyEnter={onKey}
        value={text}
      />
    )
  },
}
export const DefaultTextFieldWithError: Story = {
  args: {
    errorMessage: 'Wrong login!',
    label: 'Enter your login',
    placeholder: 'Input',
  },
  render: args => {
    const [text, setText] = useState('')
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.currentTarget.value)
    }
    const onClear = () => setText('')
    const onKey = () => console.log(text)

    return (
      <TextField
        {...args}
        onChange={changeInputValue}
        onInputClear={onClear}
        onKeyEnter={onKey}
        value={text}
      />
    )
  },
}
export const DefaultTextFieldWithoutError: Story = {
  args: {
    label: 'Enter your login',
    placeholder: 'Input',
  },
  render: args => {
    const [text, setText] = useState('')
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.currentTarget.value)
    }
    const onClear = () => setText('')
    const onKey = () => console.log(text)

    return (
      <TextField
        {...args}
        onChange={changeInputValue}
        onInputClear={onClear}
        onKeyEnter={onKey}
        value={text}
      />
    )
  },
}
export const DefaultTextFieldDisabled: Story = {
  args: {
    label: 'Enter your login',
    placeholder: 'Input',
  },
  render: args => {
    const [text, setText] = useState('')
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.currentTarget.value)
    }
    const onClear = () => setText('')
    const onKey = () => console.log(text)

    return (
      <TextField
        {...args}
        onChange={changeInputValue}
        onInputClear={onClear}
        onKeyEnter={onKey}
        value={text}
      />
    )
  },
}
