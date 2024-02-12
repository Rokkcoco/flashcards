import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Link } from 'react-router-dom'

import { HeaderLogo, LogOut, PersonOutline } from '@/assets'
import { Avatar, Button, DropdownLabel, Typography } from '@/components/ui'
import { DropdownItem, DropdownMenu, DropdownSeparator } from '@/components/ui/drop-down-menu'
import { useLogoutMutation } from '@/services'
import { baseApi } from '@/services/base-api'
import { clsx } from 'clsx'

import s from './header.module.scss'

type Props = {
  alt: string
  authorized: boolean
  email: string
  name: string
  src: string
} & ComponentPropsWithoutRef<'header'>

export const Header = forwardRef<ElementRef<'header'>, Props>(
  ({ alt, authorized, className, email, name, src }, ref) => {
    const classNames = {
      root: clsx(s.root, authorized ? s.authorized : s.notAuthorized, className),
    }

    const maxNameLengthCharacter = 10
    const finalUserName =
      name.length >= maxNameLengthCharacter ? `${name.slice(0, maxNameLengthCharacter)}...` : name

    const [logOut] = useLogoutMutation()
    const logOutButtonHandler = () => {
      logOut()
      baseApi.util?.resetApiState()
    }

    return (
      <header className={classNames.root} ref={ref}>
        <Link className={s.logoButton} to={'/'}>
          <HeaderLogo />
        </Link>

        {authorized && (
          <span className={s.avatarWrapper}>
            <Typography className={s.name} variant={'subtitle_1'}>
              {finalUserName}
            </Typography>
            <DropdownMenu
              trigger={
                <Avatar alt={alt} size={'small'} src={src}>
                  {name !== '' && name[0].toUpperCase()}
                </Avatar>
              }
            >
              <DropdownLabel>
                <AvatarItem alt={alt} email={email} name={name} src={src} />
              </DropdownLabel>
              <DropdownSeparator />
              <DropdownItem asChild className={s.profileLink}>
                <Link to={'/profile'}>
                  <PersonOutline />
                  My profile
                </Link>
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem asChild onClick={logOutButtonHandler}>
                <button className={s.logoutButton}>
                  <LogOut />
                  Sign Out
                </button>
              </DropdownItem>
            </DropdownMenu>
          </span>
        )}
        {!authorized && <Button variant={'secondary'}>Sign In</Button>}
      </header>
    )
  }
)
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
