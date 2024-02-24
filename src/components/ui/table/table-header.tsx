import { ComponentPropsWithoutRef, useMemo } from 'react'

type Column = {
  key: string
  title: string
}
type Sort = {
  direction: 'asc' | 'desc'
  key: string
} | null

type Props = Omit<
  ComponentPropsWithoutRef<'thead'> & {
    columns: Column[]
    onSort?: (sort: Sort) => void
    sort?: Sort
  },
  'children'
>
export const TableHeader = ({ columns, onSort, sort, ...restProps }: Props) => {
  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || !sortable) {
      return
    }

    if (sort?.key !== key) {
      return onSort({ direction: 'asc', key })
    }

    if (sort.direction === 'desc') {
      return onSort(null)
    }

    return onSort({
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
      key,
    })
  }

  const sortedString = useMemo(() => {
    if (!sort) {
      return null
    }

    return `${sort.key}-${sort.direction}`
  }, [sort])

  return (
    <thead {...restProps}>
      <tr>
        {columns.map(({ key, sortable, title }) => (
          <th key={key} onClick={handleSort(key, sortable)}>
            {title}
            {sort && sort.key === key && <span>{sort.direction === 'asc' ? '▲' : '▼'}</span>}
          </th>
        ))}
      </tr>
    </thead>
  )
}
