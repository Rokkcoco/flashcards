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
    const { data: meData, isError, isLoading, isSuccess } = useMeQuery()
    //const isAuthenticated = !isError && !isLoading
    const isAuthenticated = isSuccess

    console.log('isSuccess', isSuccess)

    if (isLoading) {
      return <div>123</div>
    }

    return (
      <div ref={ref} {...rest}>
        <Header
          alt={'user avatar'}
          authorized={isAuthenticated}
          email={meData?.email ?? ''}
          name={meData?.name ?? ''}
          src={meData?.avatar ?? ''}
        />
        <main className={s.main}>
          <Outlet context={{ isAuthenticated: isSuccess } satisfies AuthContext} />
        </main>
      </div>
    )
  }
)
