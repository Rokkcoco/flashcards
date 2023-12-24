import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets'

import s from './table.module.scss'

const TableRoot = forwardRef<HTMLTableElement, ComponentPropsWithoutRef<'table'>>((props, ref) => {
  return <table {...props} className={s.root} ref={ref} />
})

const TableHead = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  (props, ref) => {
    return <thead {...props} className={s.head} ref={ref} />
  }
)

const TableBody = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  (props, ref) => {
    return <tbody {...props} ref={ref} />
  }
)

const TableDataCell = forwardRef<ElementRef<'td'>, ComponentPropsWithoutRef<'td'>>((props, ref) => {
  return <td {...props} className={`${s.cell} ${s.data}`} ref={ref} />
})

const TableRow = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>((props, ref) => {
  return <tr {...props} className={s.row} ref={ref} />
})

const TableHeadCell = forwardRef<ElementRef<'th'>, ComponentPropsWithoutRef<'th'>>((props, ref) => {
  return <th {...props} className={s.cell} ref={ref} />
})

type Props = {
  options: { cardsNumber: number; createdBy: string; lastUpdated: string; name: string }[]
}
export const Table = forwardRef<HTMLTableElement, Props>((props, ref) => {
  const { options, ...rest } = props

  return (
    <TableRoot ref={ref} {...rest}>
      <TableHead>
        <TableRow>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Cards</TableHeadCell>
          <TableHeadCell>Last Updated</TableHeadCell>
          <TableHeadCell>Created By</TableHeadCell>
          <TableHeadCell></TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {options.map(t => (
          <TableRow key={t.lastUpdated}>
            <TableDataCell>{t.name}</TableDataCell>
            <TableDataCell>{t.cardsNumber}</TableDataCell>
            <TableDataCell>{t.name}</TableDataCell>
            <TableDataCell>
              {new Date(t.lastUpdated).toLocaleString('ru', { dateStyle: 'short' })}
            </TableDataCell>
            <TableDataCell>
              <TrashOutline />
              <Edit2Outline />
              <PlayCircleOutline />
            </TableDataCell>
          </TableRow>
        ))}
      </TableBody>
    </TableRoot>
  )
})
