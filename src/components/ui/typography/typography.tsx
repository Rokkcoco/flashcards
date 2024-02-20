import { ComponentPropsWithoutRef, ElementType, ReactNode, forwardRef } from 'react'

import { PolymorphicRef } from '@/common'

import s from './typography.module.scss'

type Props<T extends ElementType> = {
  as?: T
  text?: string
  variant?:
    | 'body_1'
    | 'body_2'
    | 'caption'
    | 'error'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'label'
    | 'large'
    | 'link_1'
    | 'link_2'
    | 'overline'
    | 'subtitle_1'
    | 'subtitle_2'
}

type TypographyProps<T extends ElementType> = Props<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>

type TypographyComponent = <T extends ElementType = 'p'>(
  props: TypographyProps<T> & { ref?: PolymorphicRef<T> }
) => ReactNode

//todo сделать зависимость as к variant, чтобы по умолчанию уже было
//todo проверить css стили по макету
export const Typography: TypographyComponent = forwardRef(
  <T extends ElementType = 'p'>(props: TypographyProps<T>, ref: PolymorphicRef<T>) => {
    const { as, children, className, text = '', variant = 'body_1', ...rest } = props

    function exhaustiveCheck(value: never) {
      return value
    }
    //todo review this function
    function typographyVar(as: ElementType = 'p', variant: Props<T>['variant'] = 'body_1') {
      switch (variant) {
        case 'body_1':
        case 'body_2':
        case 'caption':
        case 'subtitle_1':
        case 'subtitle_2':
        case 'overline':
        case 'link_1':
        case 'link_2':
        case 'large':
        case 'error':
          return { as }
        case 'label':
          return { as: 'label' }
        case 'h1':
          return { as: 'h1' }
        case 'h2':
          return { as: 'h2' }
        case 'h3':
          return { as: 'h3' }
        default:
          return exhaustiveCheck(variant)
      }
    }

    // const Component = as || 'p'
    const Component = typographyVar(as, variant).as

    return (
      <Component className={`${s.typography} ${s[variant]} ${className}`} ref={ref} {...rest}>
        {children ?? text}
      </Component>
    )
  }
)
