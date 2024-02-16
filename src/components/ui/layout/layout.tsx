import { CSSProperties, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'

import { Header } from '@/components/ui/header'
import { Loader } from '@/components/ui/loader'
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
    const { data: meData, isError, isLoading } = useMeQuery()
    const isAuthenticated = !isError && !isLoading

    if (isLoading) {
      return <Loader />
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
          <Outlet context={{ isAuthenticated } satisfies AuthContext} />
        </main>
      </div>
    )
  }
)
