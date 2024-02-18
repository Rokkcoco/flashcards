import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Pagination } from './pagination'

const meta = {
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/UI/Pagination',
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const PaginationWithSelect: Story = {
  args: {
    currentPage: 1,
    onPageChange: x => x,
    onPageSizeChange: x => x,
    pageSize: 1,
    selectOptions: {},
    totalCount: 1,
  },

  render: () => {
    const pageSizeOptions = {
      5: '5',
      7: '7',
      10: '10',
      15: '15',
      20: '20',
    }
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(pageSizeOptions['5'])
    const totalCount = 84
    const onPageChange = (page: number) => {
      setCurrentPage(page)
    }

    return (
      <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        onPageSizeChange={setPageSize}
        pageSize={Number(pageSize)}
        selectOptions={pageSizeOptions}
        totalCount={totalCount}
      />
    )
  },
}
