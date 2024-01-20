import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { LogOut } from '@/assets'
import { Button, Card } from '@/components/ui'
import { Avatar } from '@/components/ui/avatar'
import { ControlledTextField } from '@/components/ui/controlled'
import Typography from '@/components/ui/typography/typography'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './edit-profile.module.scss'

const schema = z.object({
  name: z.string().min(3),
})

type FormTypes = z.infer<typeof schema>
type Props = {
  alt: string
  email: string
  name: string
  onSubmit: (data: FormTypes) => void
  src: string
}
export const EditProfile = (props: Props) => {
  const { alt, email, name, onSubmit, src } = props
  const [edit, setEdit] = useState(false)
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormTypes>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(schema),
  })

  return (
    <Card className={s.root}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} />
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          Personal Information
        </Typography>
        <Avatar alt={alt} src={src}>
          {name}
        </Avatar>
        <div className={s.wrapper}>{editableProfile(edit, name, email, control, errors)}</div>
      </form>
    </Card>
  )
}

function editableProfile(edit: boolean, name: string, email: string, control: any, errors: any) {
  if (!edit) {
    return (
      <>
        <Typography as={'h2'} className={s.instructions} variant={'h2'}>
          {name}
        </Typography>
        <Typography as={'span'} className={s.instructions} variant={'body_2'}>
          {email}
        </Typography>
        <Button variant={'secondary'}>
          <LogOut />
          Logout
        </Button>
      </>
    )
  }

  return (
    <>
      <ControlledTextField
        control={control}
        error={errors?.name?.message}
        name={'Nickname'}
        placeholder={'Minimum X symbols'}
      />
      <Button fullWidth variant={'primary'}>
        <LogOut />
        Save Changes
      </Button>
    </>
  )
}
