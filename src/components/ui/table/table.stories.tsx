import { Table } from '@/components/ui/table/table'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Table,
  tags: ['autodocs'],
  title: 'Components/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const TableStory: Story = {
  args: {
    options: [
      {
        cardsNumber: 1,
        createdBy: '01',
        lastUpdated: '2023-01-31T12:45:00.000Z',
        name: 'English test',
      },
      {
        cardsNumber: 1,
        createdBy: '01',
        lastUpdated: '2023-01-31T12:45:00.000Z',
        name: 'Dogs test',
      },
      {
        cardsNumber: 1,
        createdBy: '01',
        lastUpdated: '2023-01-31T12:45:00.000Z',
        name: 'Cats test',
      },
      {
        cardsNumber: 1,
        createdBy: '01',
        lastUpdated: '2023-01-31T12:45:00.000Z',
        name: 'Movies test',
      },
    ],
  },
}
