import { KeyboardArrowLeft, KeyboardArrowRight } from '@/assets'
import { usePagination } from '@/common/hooks/usePagination'
import { Typography } from '@/components/ui'
import { SelectItem } from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './pagination.module.scss'

import { Select } from '../select'

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
  selectOptions = { 5: '5', 7: '7', 10: '10', 15: '15', 20: '20' },
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
      <Select onValueChange={onChangePageSize} value={pageSize.toString()} variant={'pagination'}>
        <SelectItem value={selectOptions['5']}>{selectOptions['5']}</SelectItem>
        <SelectItem value={selectOptions['7']}>{selectOptions['7']}</SelectItem>
        <SelectItem value={selectOptions['10']}>{selectOptions['10']}</SelectItem>
        <SelectItem value={selectOptions['15']}>{selectOptions['15']}</SelectItem>
        <SelectItem value={selectOptions['20']}>{selectOptions['20']}</SelectItem>
      </Select>
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
