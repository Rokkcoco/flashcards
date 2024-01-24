import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table/table'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Table,
  tags: ['autodocs'],
  title: 'Components/UI/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const TableStory: Story = {
  args: {},
  render: args => {
    const options = [
      {
        cardsNumber: 1,
        createdBy: '01',
        lastUpdated: '2023-01-31T12:45:00.000Z',
        name: 'English',
      },
      {
        cardsNumber: 1,
        createdBy: '01',
        lastUpdated: '2023-01-31T12:45:00.000Z',
        name: 'Dogs',
      },
      {
        cardsNumber: 1,
        createdBy: '01',
        lastUpdated: '2023-01-31T12:45:00.000Z',
        name: 'Cats',
      },
      {
        cardsNumber: 1,
        createdBy: '01',
        lastUpdated: '2023-01-31T12:45:00.000Z',
        name: 'Movies',
      },
    ]

    return (
      <Table {...args}>
        <TableHead>
          <TableRow>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Cards</TableHeadCell>
            <TableHeadCell>Last Updated</TableHeadCell>
            <TableHeadCell>Created By</TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {options.map(t => (
            <TableRow key={t.lastUpdated}>
              <TableCell>{t.name}</TableCell>
              <TableCell>{t.cardsNumber}</TableCell>
              <TableCell>{t.name}</TableCell>
              <TableCell>
                {new Date(t.lastUpdated).toLocaleString('ru', { dateStyle: 'short' })}
              </TableCell>
              <TableCell>
                <TrashOutline />
                <Edit2Outline />
                <PlayCircleOutline />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  },
}
