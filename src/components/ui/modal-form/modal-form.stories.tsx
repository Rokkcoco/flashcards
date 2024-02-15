import { useState } from 'react'

import { Button, Checkbox, TextField } from '@/components/ui'
import { Meta, StoryObj } from '@storybook/react'

import { ModalForm } from './'

const meta = {
  component: ModalForm,
  tags: ['autodocs'],
  title: 'Components/UI/ModalForm',
} satisfies Meta<typeof ModalForm>

export default meta
type Story = StoryObj<typeof meta>

export const ModalFormWithTitleAndButtons: Story = {
  args: {
    children: (
      <>
        <TextField label={'New deck name'} />
        <TextField label={'New card name'} />
        <Checkbox checked label={'Check'} />
      </>
    ),
    title: 'New card form',
    trigger: <Button variant={'primary'}>Click me</Button>,
  },
  render: args => {
    const [open, setOpen] = useState(false)
    const openHandler = () => setOpen(prevState => !prevState)

    return (
      <ModalForm
        {...args}
        controlButtons={
          <>
            <Button onClick={() => alert('click')} variant={'primary'}>
              Click me
            </Button>
            <Button onClick={openHandler} variant={'secondary'}>
              Cancel
            </Button>
          </>
        }
        onOpenChange={openHandler}
        open={open}
      />
    )
  },
}
