import { useMemo } from 'react'

type Args = {
  currentPage: number
  pageSize: number
  siblingCount: number
  totalCount: number
}

const range = (start: number, end: number) => {
  const result = []

  for (let i = start; i <= end; i++) {
    result.push(i)
  }

  return result
}

const a = range(1, 10)

console.log(a)

export const usePagination = ({
  currentPage,
  pageSize,
  siblingCount = 1,
  totalCount,
}: {
  currentPage: number
  pageSize: number
  siblingCount: number
  totalCount: number
}) => {
  const paginationRange = useMemo(() => {
    const totalPages = Math.ceil(totalCount / pageSize)

    const DOTS = '...'

    if (currentPage < totalPages && currentPage !== 0) {
      return range(1, currentPage)
    }
  }, [totalCount, pageSize, siblingCount, currentPage])

  return paginationRange
}
