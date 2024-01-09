import { useState } from 'react'

import { Pagination } from './components/ui/pagination'

export type OnPageChangeArgs = { currentPage?: number; pageSize?: number }

export function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const onPageChange = ({ currentPage, pageSize }: OnPageChangeArgs) => {
    if (currentPage && pageSize) {
      setCurrentPage(currentPage)
      setPageSize(pageSize)

      return
    }
    if (currentPage && !pageSize) {
      setCurrentPage(currentPage)

      return
    }
    if (!currentPage && pageSize) {
      setPageSize(pageSize)

      return
    }
    console.log('Пустой вызов')
  }

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        pageSize={pageSize}
        totalCount={71}
      />
    </div>
  )
}
