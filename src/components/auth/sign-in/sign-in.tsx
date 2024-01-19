import { useForm } from 'react-hook-form'

import Button from '@/components/ui/button/button'
import Card from '@/components/ui/card/card'
import { ControlledTextField } from '@/components/ui/controlled'
import Typography from '@/components/ui/typography/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-in.module.scss'

const schema = z.object({
  email: z.string().email('Enter your email'),
  password: z.string().min(3),
  passwordConfirm: z.string(),
})

type FormValues = z.infer<typeof schema>
export const SignIn = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  //todo add type email for 1st textfield
  return (
    <Card className={s.root}>
      <form className={s.title} onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <Typography as={'h1'} variant={'h1'}>
          Sign Up
        </Typography>
        <div className={s.inputContainer}>
          <ControlledTextField
            control={control}
            error={errors?.email?.message}
            label={'Email'}
            name={'email'}
            placeholder={'Enter your email'}
          />
          <ControlledTextField
            control={control}
            error={errors?.password?.message}
            label={'Password'}
            name={'password'}
            placeholder={'Enter your password'}
            type={'password'}
          />
          <ControlledTextField
            control={control}
            error={errors?.passwordConfirm?.message}
            label={'Confirm password'}
            name={'passwordConfirm'}
            placeholder={'Confirm your password'}
            type={'password'}
          />
        </div>
        <Button className={s.buttonContainer} fullWidth type={'submit'}>
          Sign Up
        </Button>
        <Typography as={'span'} className={s.isUser} variant={'body_2'}>
          Already have an account?
        </Typography>
        <Button as={'a'} className={s.buttonSignIn} variant={'link'}>
          Sign In
        </Button>
      </form>
    </Card>
  )
}
