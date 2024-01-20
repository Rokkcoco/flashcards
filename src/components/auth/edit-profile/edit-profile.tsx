import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Edit2Outline, LogOut } from '@/assets'
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

  //    <DevTool control={control} />
  return (
    <Card className={s.root}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          Personal Information
        </Typography>
        <div className={s.avatarWrapper}>
          <Avatar alt={alt} size={'large'} src={src}>
            {name}
          </Avatar>
          <button className={s.avatarButton}>
            <Edit2Outline />
          </button>
        </div>
        <div className={s.profileWrapper}>
          {editableProfile(edit, name, email, control, errors)}
        </div>
      </form>
    </Card>
  )
}

function editableProfile(edit: boolean, name: string, email: string, control: any, errors: any) {
  if (!edit) {
    return (
      <>
        <div className={s.nameWrapper}>
          <Typography as={'h2'} className={s.name} variant={'h2'}>
            {name}
          </Typography>
          <button className={s.nameButton}>
            <Edit2Outline />
          </button>
        </div>

        <Typography as={'span'} className={s.email} variant={'body_2'}>
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
      <div className={s.textFieldWrapper}>
        <ControlledTextField
          className={s.textField}
          control={control}
          error={errors?.name?.message}
          label={'Nickname'}
          name={'nickname'}
          placeholder={'Minimum X symbols'}
        />
      </div>

      <Button fullWidth variant={'primary'}>
        Save Changes
      </Button>
    </>
  )
}
