import { ComponentPropsWithoutRef } from 'react'

import { HeaderLogo, LogOut, PersonOutline } from '@/assets'
import { Avatar, Button, Typography } from '@/components/ui'
import { DropdownItem, DropdownMenu, DropdownSeparator } from '@/components/ui/drop-down-menu'
import { clsx } from 'clsx'

import s from './header.module.scss'

type Props = {
  alt: string
  authorized: boolean
  email: string
  name: string
  src: string
} & ComponentPropsWithoutRef<'header'>

export const Header = ({ alt, authorized, className, email, name, src }: Props) => {
  const classNames = {
    root: clsx(s.root, authorized ? s.authorized : s.notAuthorized, className),
  }
  const maxNameLenghtCharacter = 10
  const finalUserName =
    name.length >= maxNameLenghtCharacter ? `${name.slice(0, maxNameLenghtCharacter)}...` : name

  return (
    <header className={classNames.root}>
      <button className={s.logoButton}>
        <HeaderLogo />
      </button>

      {authorized && (
        <span className={s.avatarWrapper}>
          <Typography className={s.name} variant={'subtitle_1'}>
            {finalUserName}
          </Typography>
          <DropdownMenu
            trigger={
              <Avatar alt={alt} size={'small'} src={src}>
                {name[0].toUpperCase()}
              </Avatar>
            }
          >
            <DropdownItem>
              <AvatarItem alt={alt} email={email} name={name} src={src} />
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem>
              <PersonOutline />
              My profile
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem>
              <LogOut />
              Sign Out
            </DropdownItem>
          </DropdownMenu>
        </span>
      )}
      {!authorized && <Button variant={'secondary'}>Sign In</Button>}
    </header>
  )
}

type AvatarProps = {
  alt: string
  email: string
  name: string
  src: string
}

const AvatarItem = ({ alt, email, name, src }: AvatarProps) => {
  return (
    <span className={s.avatarRoot}>
      <Avatar alt={alt} size={'small'} src={src} />
      <span className={s.userWrapper}>
        <Typography variant={'subtitle_2'}>{name}</Typography>
        <Typography className={s.email} variant={'caption'}>
          {email}
        </Typography>
      </span>
    </span>
  )
}
