import type { Meta, StoryObj } from '@storybook/react'

import { Logout } from '@/assets'

import { Button } from './'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary', 'link'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
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
    // eslint-disable-next-line react/no-unescaped-entities
    children: (
      <>
        <Logout fill={'white'} />
        Button primary
      </>
    ),
    disabled: false,
    style: {
      display: 'flex',
      gap: '10px',
    },
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
        <Logout fill={'white'} />
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
    children: 'Link-button',
    disabled: false,
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
