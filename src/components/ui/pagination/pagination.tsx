import { OnPageChangeArgs } from '@/App'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@/assets'
import { usePagination } from '@/common/hooks/usePagination'
import clsx from 'clsx'
import { v4 } from 'uuid'

import s from './pagination.module.scss'

import { Select } from '../select'
import Typography from '../typography/typography'

type PaginationProps = {
  currentPage: number
  onPageChange: ({ currentPage, pageSize }: OnPageChangeArgs) => void
  pageSize: number
  totalCount: number
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  pageSize,
  totalCount,
}) => {
  const paginationRange = usePagination({
    currentPage,
    pageSize,
    siblingCount: 1,
    totalCount,
  })
  const totalPageCount = Math.ceil(totalCount / pageSize)

  const back = () => {
    onPageChange({ currentPage: currentPage - 1 })
  }

  const forward = () => {
    onPageChange({ currentPage: currentPage + 1 })
  }

  const buttons = paginationRange.map((item: number | string) => {
    return (
      <DefaultNavigateButton
        currentPage={currentPage}
        item={item}
        key={v4()}
        onPageChange={onPageChange}
      />
    )
  })

  return (
    <div className={clsx(s.paginationWrapp)}>
      <PaginationPrevButton disabled={currentPage === 1} onClick={back} />
      {buttons}
      <PaginationNextButton disabled={currentPage === totalPageCount} onClick={forward} />
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

const DefaultNavigateButton: React.FC<NavigateButtonProps> = ({
  currentPage,
  item,
  onPageChange,
}) => {
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

const PaginationPrevButton: React.FC<NavigateButtonProps> = ({ disabled, onClick }) => {
  return (
    <button className={s.navigateButton} disabled={disabled} onClick={onClick}>
      <KeyboardArrowLeft />
    </button>
  )
}

const PaginationNextButton: React.FC<NavigateButtonProps> = ({ disabled, onClick }) => {
  return (
    <button className={s.navigateButton} disabled={disabled} onClick={onClick}>
      <KeyboardArrowRight />
    </button>
  )
}
