import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './table.module.scss'

export const TableRoot = forwardRef<ElementRef<'table'>, ComponentPropsWithoutRef<'table'>>(
  (props, ref) => {
    const { className, ...rest } = props

    const classNames = {
      root: clsx(s.root, className),
    }

    return <table className={classNames.root} ref={ref} {...rest} />
  }
)

TableRoot.displayName = 'TableRoot'

export const TableHead = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  (props, ref) => {
    const { className, ...rest } = props

    const classNames = {
      head: clsx(s.head, className),
    }

    return <thead className={classNames.head} ref={ref} {...rest} />
  }
)

TableHead.displayName = 'TableHead'

export const TableBody = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  (props, ref) => {
    return <tbody ref={ref} {...props} />
  }
)

TableBody.displayName = 'TableBody'

export const TableDataCell = forwardRef<ElementRef<'td'>, ComponentPropsWithoutRef<'td'>>(
  (props, ref) => {
    const { className, ...rest } = props

    const classNames = {
      cell: clsx(s.cell, s.data, className),
    }

    return <td className={classNames.cell} ref={ref} {...rest} />
  }
)

TableDataCell.displayName = 'TableDataCell'

export const TableRow = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  (props, ref) => {
    const { className, ...rest } = props

    const classNames = {
      row: clsx(s.row, className),
    }

    return <tr className={classNames.row} ref={ref} {...rest} />
  }
)

TableRow.displayName = 'TableRow'

export const TableHeadCell = forwardRef<ElementRef<'th'>, ComponentPropsWithoutRef<'th'>>(
  (props, ref) => {
    const { className, ...rest } = props

    const classNames = {
      headCell: clsx(s.headCell, s.cell, className),
    }

    return <th className={classNames.headCell} ref={ref} {...rest} />
  }
)

TableHeadCell.displayName = 'TableHeadCell'
