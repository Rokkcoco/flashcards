import { KeyboardArrowLeft, KeyboardArrowRight } from '@/assets'
import { usePagination } from '@/common/hooks/usePagination'
import clsx from 'clsx'

import s from './pagination.module.scss'

import { Select } from '../select'
import Typography from '../typography/typography'

export type OnPageChangeArgs = { currentPage?: number; pageSize?: number }

type PaginationProps = {
  currentPage: number
  onPageChange: ({ currentPage, pageSize }: OnPageChangeArgs) => void
  pageSize: number
  selectOptions?: Record<string, string>
  totalCount: number
}

export const Pagination = ({
  currentPage,
  onPageChange,
  pageSize,
  selectOptions = { 10: '10', 20: '20', 30: '30', 50: '50', 100: '100' },
  totalCount,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    pageSize,
    siblingCount: 1,
    totalCount,
  })
  const totalPageCount = Math.ceil(totalCount / pageSize)

  const onChangePageSize = (value: string) => {
    onPageChange({ currentPage: 1, pageSize: Number(value) })
  }

  const back = () => {
    onPageChange({ currentPage: currentPage - 1 })
  }

  const forward = () => {
    onPageChange({ currentPage: currentPage + 1 })
  }

  const buttons = paginationRange.map((item: number | string, index) => {
    return (
      <DefaultNavigateButton
        currentPage={currentPage}
        item={item}
        key={index}
        onPageChange={onPageChange}
      />
    )
  })

  return (
    <div className={clsx(s.paginationWrapp)}>
      <PaginationPrevButton disabled={currentPage === 1} onClick={back} />
      {buttons}
      <PaginationNextButton disabled={currentPage === totalPageCount} onClick={forward} />
      <Typography variant={'body_2'}>Показать</Typography>
      <Select
        onChange={onChangePageSize}
        options={selectOptions}
        value={pageSize.toString()}
        variant={'pagination'}
      />
      <Typography variant={'body_2'}>на странице</Typography>
    </div>
  )
}

type NavigateButtonProps = {
  currentPage?: number
  disabled?: boolean
  item?: number | string
  onClick?: () => void
  onPageChange?: ({ currentPage, pageSize }: OnPageChangeArgs) => void
}

const DefaultNavigateButton = ({ currentPage, item, onPageChange }: NavigateButtonProps) => {
  return (
    <button
      className={clsx(s.defaultButton, s.navigateButton, currentPage === item ? s.active : '')}
      onClick={() => {
        if (onPageChange && typeof item === 'number') {
          onPageChange({ currentPage: item })
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
    <button className={s.navigateButton} disabled={disabled} onClick={onClick}>
      <KeyboardArrowRight />
    </button>
  )
}
