import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button, Card, Typography } from '@/components/ui'
import { ControlledCheckbox, ControlledTextField } from '@/components/ui/controlled'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-in.module.scss'

const schema = z.object({
  email: z.string().email('Enter your email'),
  password: z.string().min(3),
  rememberMe: z.boolean().optional(),
})

type FormTypes = z.infer<typeof schema>
type Props = {
  onSubmit: (data: FormTypes) => void
}
export const SignIn = ({ onSubmit }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormTypes>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    resolver: zodResolver(schema),
  })

  return (
    <Card className={s.root}>
      <Typography as={'h1'} variant={'h1'}>
        Sign In
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <div className={s.inputContainer}>
          <ControlledTextField
            autoComplete={'email'}
            control={control}
            errorMessage={errors?.email?.message}
            label={'Email'}
            name={'email'}
            placeholder={'example@yourmail.com'}
            type={'email'}
          />
          <ControlledTextField
            autoComplete={'current-password'}
            control={control}
            errorMessage={errors?.password?.message}
            label={'Password'}
            name={'password'}
            placeholder={'Minimum X symbols'}
            type={'password'}
          />
          <ControlledCheckbox control={control} label={'Remember Me'} name={'rememberMe'} />
        </div>
        <Typography
          as={Link}
          className={s.passwordForgot}
          to={'/forgot-password'}
          variant={'body_2'}
        >
          Forgot password?
        </Typography>
        <Button className={s.buttonSignIn} fullWidth type={'submit'}>
          Sign In
        </Button>
      </form>
      <Typography as={'span'} className={s.isUser} variant={'body_2'}>
        Don't have an account?
      </Typography>
      <Typography as={Link} className={s.buttonSignUp} to={'/sign-up'} variant={'subtitle_1'}>
        Sign Up
      </Typography>
    </Card>
  )
}
