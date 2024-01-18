import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './table.module.scss'

export const TableRoot = forwardRef<ElementRef<'table'>, ComponentPropsWithoutRef<'table'>>(
  (props, ref) => {
    const { className, ...rest } = props
    const classNames = {
      root: clsx(s.root, className),
    }

    return <table {...rest} className={classNames.root} ref={ref} />
  }
)

TableRoot.displayName = 'TableRoot'

export const TableHead = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  (props, ref) => {
    const { className, ...rest } = props
    const classNames = {
      head: clsx(s.head, className),
    }

    return <thead {...rest} className={classNames.head} ref={ref} />
  }
)

TableHead.displayName = 'TableHead'

export const TableBody = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  (props, ref) => {
    return <tbody {...props} ref={ref} />
  }
)

TableBody.displayName = 'TableBody'

export const TableDataCell = forwardRef<ElementRef<'td'>, ComponentPropsWithoutRef<'td'>>(
  (props, ref) => {
    const { className, ...rest } = props
    const classNames = {
      cell: clsx(s.cell, s.data, className),
    }

    return <td {...rest} className={classNames.cell} ref={ref} />
  }
)

TableDataCell.displayName = 'TableDataCell'

export const TableRow = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  (props, ref) => {
    const { className, ...rest } = props
    const classNames = {
      row: clsx(s.row, className),
    }

    return <tr {...rest} className={classNames.row} ref={ref} />
  }
)

TableRow.displayName = 'TableRow'

export const TableHeadCell = forwardRef<ElementRef<'th'>, ComponentPropsWithoutRef<'th'>>(
  (props, ref) => {
    const { className, ...rest } = props
    const classNames = {
      headCell: clsx(s.headCell, s.cell, className),
    }

    return <th {...rest} className={classNames.headCell} ref={ref} />
  }
)

TableHeadCell.displayName = 'TableHeadCell'
