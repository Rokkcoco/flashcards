import { useState } from 'react'

import { Button, Checkbox } from '@/components/ui'
import { Meta, StoryObj } from '@storybook/react'

import { Modal } from './'

const meta = {
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/UI/Modal',
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const ModalWithTitleAndButtons: Story = {
  args: {
    children: (
      <>
        <div>
          Accusantium aliquid aperiam assumenda consequatur culpa cum cupiditate deserunt dicta ea
          eaque eligendi est eum eveniet ex explicabo impedit, in magnam maiores nam necessitatibus
          pariatur porro provident quasi vero voluptatum!
        </div>
        <div>
          Aliquam aliquid at aut delectus esse excepturi exercitationem fugiat impedit, inventore
          ipsum magni minima nihil nobis non nostrum placeat provident quas quasi, similique
          suscipit temporibus, velit veniam. Aliquid, aspernatur, dignissimos.
        </div>
      </>
    ),
    title: 'Card',
    trigger: <Button variant={'primary'}>Click me</Button>,
  },
  render: args => {
    const [open, setOpen] = useState(false)
    const openHandler = () => setOpen(prevState => !prevState)

    return (
      <Modal
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

export const ModalTextWithTitle: Story = {
  args: {
    children: (
      <>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus consectetur dicta
          distinctio ex expedita fuga maiores minus neque, nesciunt nobis, officiis omnis porro
          possimus provident, quod rem saepe vel vitae?
        </div>
      </>
    ),
    title: 'Lorem ipsum',
    trigger: <Button variant={'primary'}>Click me</Button>,
  },
  render: args => {
    const [open, setOpen] = useState(false)
    const openHandler = () => setOpen(prevState => !prevState)

    return <Modal {...args} onOpenChange={openHandler} open={open} />
  },
}

export const ModalOnlyText: Story = {
  args: {
    children: (
      <>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus consectetur dicta
          distinctio ex expedita fuga maiores minus neque, nesciunt nobis, officiis omnis porro
          possimus provident, quod rem saepe vel vitae?
        </div>
      </>
    ),

    trigger: <Button variant={'primary'}>Click me</Button>,
  },
  render: args => {
    const [open, setOpen] = useState(false)
    const openHandler = () => setOpen(prevState => !prevState)

    return <Modal {...args} onOpenChange={openHandler} open={open} />
  },
}
export const ModalTesting: Story = {
  args: {
    children: (
      <>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus consectetur dicta
          distinctio ex expedita fuga maiores minus neque, nesciunt nobis, officiis omnis porro
          possimus provident, quod rem saepe vel vitae?
        </div>
      </>
    ),
  },
  render: args => {
    const [open, setOpen] = useState(true)
    const openHandler = () => setOpen(prevState => !prevState)

    return <Modal {...args} onOpenChange={openHandler} open={open} />
  },
}
