import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets'
import {
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRoot,
  TableRow,
} from '@/components/ui/table/table'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: TableRoot,
  tags: ['autodocs'],
  title: 'Components/Ui/Table',
} satisfies Meta<typeof TableRoot>

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
      <TableRoot {...args}>
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
              <TableDataCell>{t.name}</TableDataCell>
              <TableDataCell>{t.cardsNumber}</TableDataCell>
              <TableDataCell>{t.name}</TableDataCell>
              <TableDataCell>
                {new Date(t.lastUpdated).toLocaleString('ru', { dateStyle: 'short' })}
              </TableDataCell>
              <TableDataCell>
                <TrashOutline />
                <Edit2Outline />
                <PlayCircleOutline />
              </TableDataCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    )
  },
}
