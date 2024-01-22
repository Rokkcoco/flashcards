import { useForm } from 'react-hook-form'

import { Button, Card, Typography } from '@/components/ui'
import { ControlledTextField } from '@/components/ui/controlled'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-up.module.scss'

const schema = z
  .object({
    confirmPassword: z.string().min(3),
    email: z.string().email('Enter your email'),
    password: z.string().min(3),
  })
  .refine(({ confirmPassword, password }) => password === confirmPassword, {
    message: 'Passwords must match!',
    path: ['confirmPassword'],
  })

type FormTypes = z.infer<typeof schema>
export const SignUp = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormTypes>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormTypes) => {
    console.log(data)
  }

  return (
    <Card className={s.root}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <div className={s.titleContainer}>
          <Typography variant={'h1'}>Sign Up</Typography>
        </div>
        <div className={s.inputsContainer}>
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
            autoComplete={'password'}
            control={control}
            errorMessage={errors?.password?.message}
            label={'Password'}
            name={'password'}
            placeholder={'**********'}
            type={'password'}
          />
          <ControlledTextField
            autoComplete={'password'}
            control={control}
            errorMessage={errors?.confirmPassword?.message}
            label={'Password'}
            name={'confirmPassword'}
            placeholder={'**********'}
            type={'password'}
          />
        </div>
        <div className={s.buttonsContainer}>
          <Button as={'button'} className={s.signInButton} fullWidth>
            Send
          </Button>
          <Typography className={s.buttonSubTitle} variant={'body_2'}>
            Already have an account?
          </Typography>
          <Button as={'a'} href={'/'} style={{ textDecoration: 'underline' }} variant={'link'}>
            Sign in
          </Button>
        </div>
      </form>
    </Card>
  )
}
