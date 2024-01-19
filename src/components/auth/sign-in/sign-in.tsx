import { useForm } from 'react-hook-form'

import { Button, Card } from '@/components/ui'
import { ControlledCheckbox, ControlledTextField } from '@/components/ui/controlled'
import Typography from '@/components/ui/typography/typography'
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
type Props = { onSubmit: (data: FormTypes) => void }
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
      <form className={s.title} onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <Typography as={'h1'} variant={'h1'}>
          Sign In
        </Typography>
        <div className={s.inputContainer}>
          <ControlledTextField
            autoComplete={'email'}
            control={control}
            error={errors?.email?.message}
            label={'Email'}
            name={'email'}
            placeholder={'Enter your email'}
            type={'email'}
          />
          <ControlledTextField
            control={control}
            error={errors?.password?.message}
            label={'Password'}
            name={'password'}
            placeholder={'Enter your password'}
            type={'password'}
          />

          <span className={s.checkbox}>
            <ControlledCheckbox control={control} label={'Remember Me'} name={'rememberMe'} />
          </span>
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
