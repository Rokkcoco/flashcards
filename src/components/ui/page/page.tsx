import { CSSProperties, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './page.module.scss'
type Props = ComponentPropsWithoutRef<'div'> & {
  mt?: CSSProperties['marginTop']
}
export const Page = forwardRef<ElementRef<'div'>, Props>(
  ({ className, mt = '33px', style, ...rest }, ref) => {
    const classNames = {
      page: clsx(className, s.container),
    }
    const styles: CSSProperties = { marginTop: mt, ...style }

    return <div className={classNames.page} ref={ref} style={styles} {...rest} />
  }
)
