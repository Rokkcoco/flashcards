/*
type Props = {
  value?: string
}
*/
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import s from './table.module.scss'

const Table = forwardRef<HTMLTableElement, ComponentPropsWithoutRef<'table'>>((props, ref) => {
  return <table {...props} ref={ref} />
})

const TableHead = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  (props, ref) => {
    return <thead {...props} ref={ref} />
  }
)

const TableBody = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  (props, ref) => {
    return <tbody {...props} ref={ref} />
  }
)

const TableDataCell = forwardRef<ElementRef<'td'>, ComponentPropsWithoutRef<'td'>>((props, ref) => {
  return <td {...props} ref={ref} />
})

const TableRow = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>((props, ref) => {
  return <tr {...props} ref={ref} />
})

const TableHeadCell = forwardRef<ElementRef<'th'>, ComponentPropsWithoutRef<'th'>>((props, ref) => {
  return <th {...props} ref={ref} />
})


const TableHeader =