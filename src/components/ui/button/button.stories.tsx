import type { Meta, StoryObj } from '@storybook/react'

import { Logout } from '@/assets'
import { Button } from '@/components/ui'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary', 'link'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Ui/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Button primary',
    disabled: false,
    variant: 'primary',
  },
}
export const PrimaryWithIcon: Story = {
  args: {
    children: (
      <>
        <Logout />
        Button primary
      </>
    ),
    disabled: false,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Button secondary',
    disabled: false,
    variant: 'secondary',
  },
}
export const SecondaryWithIcon: Story = {
  args: {
    children: (
      <>
        <Logout />
        Button secondary
      </>
    ),
    disabled: false,
    style: {
      display: 'flex',
      gap: '10px',
    },
    variant: 'secondary',
  },
}
export const Tertiary: Story = {
  args: {
    children: 'Tertiary',
    disabled: false,
    variant: 'tertiary',
  },
}
export const Link: Story = {
  args: {
    as: 'a',
    children: 'Link-button',
    href: 'https://google.com',
    variant: 'link',
  },
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
}
