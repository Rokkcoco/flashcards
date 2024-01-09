import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { OnPageChangeArgs, Pagination } from './pagination'

const meta = {
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentPage: 5,
    onPageChange: () => {},
    pageSize: 3,
    totalCount: 20,
  },
  render: args => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const onPageChange = ({ currentPage, pageSize }: OnPageChangeArgs) => {
      if (currentPage) {
        setCurrentPage(currentPage)
      }

      if (pageSize) {
        setPageSize(pageSize)
      }

      if (!currentPage && !pageSize) {
        console.log('Пустой вызов')
      }
    }

    return (
      <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        pageSize={pageSize}
        totalCount={71}
      />
    )
  },
}
