import { ComponentPropsWithoutRef, ElementType, ForwardedRef, forwardRef } from 'react'

import { InferType } from '@/common'
import { clsx } from 'clsx'

import s from './card.module.scss'

export type Props<T extends ElementType = 'div'> = {
  as?: T
} & ComponentPropsWithoutRef<T>

export const Card = forwardRef(
  <T extends ElementType = 'div'>(
    props: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>,
    ref: ForwardedRef<InferType<T>>
  ) => {
    const { as: Component = 'div', className, ...rest } = props

    const classNames = {
      root: clsx(s.root, className),
    }

    return <Component className={classNames.root} ref={ref} {...rest} />
  }
)
