import { CSSProperties, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'

import { Header } from '@/components/ui/header'
import { useMeQuery } from '@/services'

import s from './layout.module.scss'
type AuthContext = {
  isAuthenticated: boolean
}
export function useAuthContext() {
  return useOutletContext<AuthContext>()
}
type Props = ComponentPropsWithoutRef<'div'> & {
  contentMarginTop?: CSSProperties['marginTop']
}
export const Layout = forwardRef<ElementRef<'div'>, Props>(
  ({ children, className, ...rest }, ref) => {
    // const { isError, isLoading } = useMeQuery()
    // const isAuthenticated = !isError && !isLoading
    //context={{ isAuthenticated } satisfies AuthContext}
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
