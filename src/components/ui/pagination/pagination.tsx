import { Link, useLocation } from 'react-router-dom'

import { KeyboardArrowLeft, KeyboardArrowRight } from '@/assets'
import { Select, SelectItemWithText, Typography } from '@/components/ui'
import { usePagination } from '@/components/ui/pagination/usePagination'
import clsx from 'clsx'

import s from './pagination.module.scss'

type Props = {
  className?: string
  currentPage: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: string) => void
  pageSize: number
  selectOptions?: Record<string, string>
  siblingCount?: number
  totalCount: number
}
//todo buttons -> links
export const Pagination = ({
  className,
  currentPage = 1,
  onPageChange,
  onPageSizeChange,
  pageSize,
  selectOptions,
  siblingCount = 1,
  totalCount,
}: Props) => {
  const paginationRange = usePagination({
    currentPage,
    pageSize,
    siblingCount,
    totalCount,
  })

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null
  }

  const lastPage = paginationRange?.at(-1)
  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const buttons = paginationRange?.map((item: number | string, index) => {
    return (
      <DefaultNavigateButton
        currentPage={currentPage}
        item={item}
        key={index}
        onPageChange={onPageChange}
      />
    )
  })

  const onValueChangeHandler = (newPageSize: string) => {
    onPageSizeChange?.(newPageSize)
    let page

    if (+newPageSize < pageSize) {
      page = Math.ceil((currentPage * pageSize) / +newPageSize) - 1
    } else {
      page = Math.ceil((currentPage * pageSize) / +newPageSize)
    }

    onPageChange(page)
  }

  return (
    <div className={clsx(s.paginationWrapp, className)}>
      <PaginationPrevButton disabled={currentPage === 1} onClick={onPrevious} />
      {buttons}
      <PaginationNextButton
        disabled={currentPage === lastPage}
        lastPage={lastPage}
        onClick={onNext}
      />
      {selectOptions && (
        <>
          <Typography variant={'body_2'}>Показать</Typography>
          <Select isPagination onValueChange={onValueChangeHandler} value={pageSize.toString()}>
            {Object.keys(selectOptions).map((t, i) => (
              <SelectItemWithText isPagination key={i} value={selectOptions[t]}>
                {selectOptions[t]}
              </SelectItemWithText>
            ))}
          </Select>
          <Typography variant={'body_2'}>на странице</Typography>
        </>
      )}
    </div>
  )
}

type NavigateButtonProps = {
  currentPage?: number
  disabled?: boolean
  item?: number | string
  lastPage?: number | string
  onClick?: () => void
  onPageChange?: (page: number) => void
}

const DefaultNavigateButton = ({ currentPage, item, onPageChange }: NavigateButtonProps) => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  if (item !== 1) {
    searchParams.set('currentPage', String(item))
  }
  if (item === 1) {
    searchParams.delete('currentPage')
  }

  return (
    <Link
      className={clsx(
        s.defaultButton,
        s.navigateButton,
        currentPage === item ? s.active : '',
        typeof item !== 'number' && s.notALink
      )}
      onClick={() => {
        if (onPageChange && typeof item === 'number') {
          onPageChange(item)
        }
      }}
      to={{
        pathname: '/',
        search: searchParams.toString(),
      }}
    >
      <Typography variant={'body_2'}>{item}</Typography>
    </Link>
  )
}
const PaginationPrevButton = ({ disabled, onClick }: NavigateButtonProps) => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const curPage = searchParams.get('currentPage')

  if (curPage) {
    if (+curPage > 1) {
      searchParams.set('currentPage', String(+curPage - 1))
    }
    if (+curPage === 2) {
      searchParams.delete('currentPage')
    }
  }

  return (
    <Link
      className={clsx(s.navigateButton, disabled && s.disabledLink)}
      onClick={onClick}
      to={{
        pathname: '/',
        search: searchParams.toString(),
      }}
    >
      <KeyboardArrowLeft />
    </Link>
  )
}

const PaginationNextButton = ({ disabled, lastPage, onClick }: NavigateButtonProps) => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const curPage = searchParams.get('currentPage')

  if (curPage && lastPage) {
    if (+curPage < +lastPage) {
      searchParams.set('currentPage', String(+curPage + 1))
    }
  }
  if (!curPage) {
    searchParams.set('currentPage', '2')
  }

  return (
    <Link
      className={clsx(s.navigateButton, s.navigateLastButton, disabled && s.disabledLink)}
      onClick={onClick}
      to={{
        pathname: '/',
        search: searchParams.toString(),
      }}
    >
      <KeyboardArrowRight />
    </Link>
  )
}
