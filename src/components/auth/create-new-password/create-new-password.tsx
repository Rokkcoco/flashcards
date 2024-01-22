import { useForm } from 'react-hook-form'

import { Button, Card } from '@/components/ui'
import { ControlledTextField } from '@/components/ui/controlled'
import Typography from '@/components/ui/typography/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './create-new-password.module.scss'

const schema = z.object({
  password: z.string().min(3),
})

type FormTypes = z.infer<typeof schema>
type Props = { onSubmit: (data: FormTypes) => void }
export const CreateNewPassword = ({ onSubmit }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormTypes>({
    defaultValues: {
      password: '',
    },
    resolver: zodResolver(schema),
  })

  return (
    <Card className={s.root}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          Create new password
        </Typography>
        <div className={s.wrapper}>
          <ControlledTextField
            autoComplete={'new-password'}
            className={s.textfield}
            control={control}
            errorMessage={errors?.password?.message}
            label={'Password'}
            name={'password'}
            placeholder={'Minimum X symbols'}
            type={'password'}
          />
        </div>

        <Typography as={'span'} className={s.instructions} variant={'body_2'}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button fullWidth type={'submit'}>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
