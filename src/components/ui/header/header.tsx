import { ComponentPropsWithoutRef } from 'react'

import { Avatar, Button } from '@/components/ui'
import { clsx } from 'clsx'

import s from './header.module.scss'

type Props = {
  authorized: boolean
} & ComponentPropsWithoutRef<'header'>

export const Header = ({ authorized }: Props) => {
  const classNames = {
    root: clsx(s.root, authorized ? s.authorized : s.notAuthorized),
  }

  return (
    <header className={classNames.root}>
      <Button variant={'primary'}>Click</Button>
      {authorized && <Avatar size={'small'}>J</Avatar>}
      {!authorized && <Button variant={'secondary'}>Sign In</Button>}
    </header>
  )
}
