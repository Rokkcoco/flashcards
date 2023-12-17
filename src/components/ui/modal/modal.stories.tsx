import { useState } from 'react'

import { Button, Checkbox } from '@/components/ui'
import { Meta, StoryObj } from '@storybook/react'

import { Modal } from './'

const meta = {
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/Modal',
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
        <Checkbox checked label={'Check'} />
      </>
    ),
    title: 'Card',
    trigger: <Button variant={'primary'}>Click me</Button>,
  },
  render: args => {
    const [open, setOpen] = useState(false)
    const openHandler = () => setOpen(checked => !checked)

    return (
      <Modal
        onOpenChange={openHandler}
        open={open}
        {...args}
        controlButtons={
          <>
            <Button variant={'primary'}>Click me</Button>
            <Button onClick={openHandler} variant={'secondary'}>
              Cancel
            </Button>
          </>
        }
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
    const openHandler = () => setOpen(checked => !checked)

    return <Modal onOpenChange={openHandler} open={open} {...args} />
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
    const openHandler = () => setOpen(checked => !checked)

    return <Modal onOpenChange={openHandler} open={open} {...args} />
  },
}
