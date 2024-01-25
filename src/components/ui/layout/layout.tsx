import { CSSProperties, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '@/components/ui/header'

import s from './layout.module.scss'

type Props = ComponentPropsWithoutRef<'div'> & {
  contentMarginTop?: CSSProperties['marginTop']
}
export const Layout = forwardRef<ElementRef<'div'>, Props>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div ref={ref} {...rest}>
        <Header
          alt={'ye'}
          authorized
          email={'youremail@email.com'}
          name={'Liza'}
          src={'https://xsgames.co/randomusers/avatar.php?g=female'}
        />
        <main className={s.main}>
          <Outlet />
        </main>
      </div>
    )
  }
)
