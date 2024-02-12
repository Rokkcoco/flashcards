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
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <Typography as={'h1'} variant={'h1'}>
          Sign In
        </Typography>
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
        {/*        todo remove button inside typography*/}
        <Typography as={'span'} className={s.passwordForgot} variant={'body_2'}>
          <Button as={Link} className={s.buttonForgot} to={'/forgot-password'} variant={'link'}>
            Forgot password?
          </Button>
        </Typography>
        <Button className={s.buttonSignIn} fullWidth type={'submit'}>
          Sign In
        </Button>
        <Typography as={'span'} className={s.isUser} variant={'body_2'}>
          Don't have an account?
        </Typography>
        <Button as={Link} className={s.buttonSignUp} to={'/sign-up'} variant={'link'}>
          Sign Up
        </Button>
      </form>
    </Card>
  )
}
