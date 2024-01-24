import { Card } from '@/components/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
    as: {
      control: { type: 'radio' },
      options: ['div', 'article', 'section'],
    },
  },
  component: Card,
  tags: ['autodocs'],
  title: 'Components/UI/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const EmptyCard: Story = {
  args: {
    children: 'Card testing',
    style: {
      height: '550px',
      padding: '24px',
      width: '420px',
    },
  },
}
