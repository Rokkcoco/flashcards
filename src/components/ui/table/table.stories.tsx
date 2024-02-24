import { useMemo, useState } from 'react'

import { Column, Sort, TableHeader } from '@/components/ui'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table/table'
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
    const columns: Column[] = [
      {
        key: 'name',
        sortable: true,
        title: 'Name',
      },
      {
        key: 'cardsCount',
        sortable: true,
        title: 'Cards',
      },

      {
        key: 'createdBy',
        sortable: true,
        title: 'Created by',
      },
      {
        key: 'updated',
        sortable: true,
        title: 'Last Updated',
      },
    ]

    const [sort, setSort] = useState<Sort>(null)

    const options = [
      {
        cardsCount: 7,
        createdBy: '01',
        lastUpdated: '2023-01-31T12:45:00.000Z',
        name: 'English',
      },
      {
        cardsCount: 3,
        createdBy: '02',
        lastUpdated: '2023-02-31T12:45:00.000Z',
        name: 'Dogs',
      },
      {
        cardsCount: 2,
        createdBy: '03',
        lastUpdated: '2023-03-31T12:45:00.000Z',
        name: 'Cats',
      },
      {
        cardsCount: 4,
        createdBy: '04',
        lastUpdated: '2023-04-31T12:45:00.000Z',
        name: 'Movies',
      },
    ]
    const sortedString = useMemo(() => {
      if (!sort) {
        return null
      }

      return `${sort.key}-${sort.direction}`
    }, [sort])

    console.log('sortedStringForBackend', sortedString)

    return (
      <Table {...args}>
        <TableHeader columns={columns} onSort={setSort} sort={sort} />
        <TableBody>
          {options.map(t => (
            <TableRow key={t.lastUpdated}>
              <TableCell>{t.name}</TableCell>
              <TableCell>{t.cardsCount}</TableCell>
              <TableCell>{t.createdBy}</TableCell>
              <TableCell>
                {new Date(t.lastUpdated).toLocaleString('ru', { dateStyle: 'short' })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  },
}
