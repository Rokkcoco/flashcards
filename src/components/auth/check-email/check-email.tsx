import { CheckEmailIcon } from '@/assets'
import { Button, Card, Typography } from '@/components/ui'
import { clsx } from 'clsx'

import s from './check-email.module.scss'

type Props = { mail: string }
export const CheckEmail = ({ mail }: Props) => {
  const message = clsx(`We’ve sent an Email with instructions to `, mail)

  return (
    <Card className={s.root}>
      <div className={s.wrapper}>
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          Check Email
        </Typography>
        <div className={s.icon}>
          <CheckEmailIcon />
        </div>
        <Typography as={'span'} className={s.instructions} variant={'body_2'}>
          {message}
        </Typography>
        <Button as={'a'} fullWidth href={'https://google.com'} type={'submit'}>
          Send Instructions
        </Button>
      </div>
    </Card>
  )
}
