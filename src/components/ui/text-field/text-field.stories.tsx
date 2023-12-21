import { TextField } from '@/components/ui/text-field/text-field'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: TextField,
  tags: ['autodocs'],
  title: 'Components/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    error: 'Error!',
    label: 'Error',
    placeholder: 'Input search',
  },
}
