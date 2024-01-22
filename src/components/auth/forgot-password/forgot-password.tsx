import { useForm } from 'react-hook-form'

import { Button, Card } from '@/components/ui'
import { ControlledTextField } from '@/components/ui/controlled'
import Typography from '@/components/ui/typography/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './forgot-password.module.scss'

const schema = z.object({
  email: z.string().email('Enter your email'),
})

type FormTypes = z.infer<typeof schema>
type Props = { onSubmit: (data: FormTypes) => void }
export const ForgotPassword = ({ onSubmit }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormTypes>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(schema),
  })

  return (
    <Card className={s.root}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          Forgot your password?
        </Typography>
        <div className={s.wrapper}>
          <ControlledTextField
            autoComplete={'email'}
            className={s.textfield}
            control={control}
            errorMessage={errors?.email?.message}
            label={'Email'}
            name={'email'}
            placeholder={'example@yourmail.com'}
            type={'email'}
          />
        </div>

        <Typography as={'span'} className={s.instructions} variant={'body_2'}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button className={s.buttonSend} fullWidth type={'submit'}>
          Send Instructions
        </Button>
        <Typography as={'span'} className={s.userPassword} variant={'body_2'}>
          Did you remember your password?
        </Typography>
        <Button as={'a'} className={s.buttonLogIn} href={'https://google.com'} variant={'link'}>
          Try logging in
        </Button>
      </form>
    </Card>
  )
}
