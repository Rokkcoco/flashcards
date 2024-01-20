import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@/components/ui'

const meta = {
  component: Typography,
  tags: ['autodocs'],
  title: 'Components/Ui/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

const text =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias ea, voluptatum quasi eveniet quas ab mollitia illo sit illum, perspiciatis quam eius dolores tempore sapiente animi iste aliquam, ipsum modi.'

export const Large: Story = {
  args: {
    text,
    variant: 'large',
  },
}

export const Body_1: Story = {
  args: {
    text,
    variant: 'body_1',
  },
}

export const Body_2: Story = {
  args: {
    text,
    variant: 'body_2',
  },
}

export const H1: Story = {
  args: {
    text,
    variant: 'h1',
  },
}

export const H2: Story = {
  args: {
    text,
    variant: 'h2',
  },
}

export const H3: Story = {
  args: {
    text,
    variant: 'h3',
  },
}

export const Link_1: Story = {
  args: {
    text,
    variant: 'link_1',
  },
}

export const Link_2: Story = {
  args: {
    text,
    variant: 'link_2',
  },
}

export const Caption: Story = {
  args: {
    text,
    variant: 'caption',
  },
}

export const Overline: Story = {
  args: {
    text,
    variant: 'overline',
  },
}

export const Subtitle_1: Story = {
  args: {
    text,
    variant: 'subtitle_1',
  },
}

export const Subtitle_2: Story = {
  args: {
    text,
    variant: 'subtitle_2',
  },
}
