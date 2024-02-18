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

  console.log(paginationRange)
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
      <PaginationNextButton disabled={currentPage === lastPage} onClick={onNext} />
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
  onClick?: () => void
  onPageChange?: (page: number) => void
}

const DefaultNavigateButton = ({ currentPage, item, onPageChange }: NavigateButtonProps) => {
  return (
    <button
      className={clsx(s.defaultButton, s.navigateButton, currentPage === item ? s.active : '')}
      onClick={() => {
        if (onPageChange && typeof item === 'number') {
          onPageChange(item)
        }
      }}
    >
      <Typography variant={'body_2'}>{item}</Typography>
    </button>
  )
}

const PaginationPrevButton = ({ disabled, onClick }: NavigateButtonProps) => {
  return (
    <button className={s.navigateButton} disabled={disabled} onClick={onClick}>
      <KeyboardArrowLeft />
    </button>
  )
}

const PaginationNextButton = ({ disabled, onClick }: NavigateButtonProps) => {
  return (
    <button
      className={clsx(s.navigateButton, s.navigateLastButton)}
      disabled={disabled}
      onClick={onClick}
    >
      <KeyboardArrowRight />
    </button>
  )
}
