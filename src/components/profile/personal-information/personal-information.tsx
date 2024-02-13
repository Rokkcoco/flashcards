import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Edit2Outline, LogOut } from '@/assets'
import { Button, Card, Typography } from '@/components/ui'
import { Avatar } from '@/components/ui/avatar'
import { ControlledTextField } from '@/components/ui/controlled'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { z } from 'zod'

import s from './personal-information.module.scss'

const MAX_FILE_SIZE = 2000000
//const MAX_FILE_SIZE = 2
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const imageSchema = z.object({
  avatar: z
    .any()
    .refine(file => file?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 2MB.`)
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
})
const schema = z.object({
  name: z.string().min(3).optional(),
})

type ImageFormType = z.infer<typeof imageSchema>
type FormTypes = z.infer<typeof schema>
type Props = {
  alt: string
  email: string
  name: string
  onLogOut: () => void
  onSubmit: (data: FormData) => void
  src: string
}
export const PersonalInformation = (props: Props) => {
  const { alt, email, name, onLogOut, onSubmit, src } = props
  const [editMode, setEditMode] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | undefined>()
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<FormTypes>({
    defaultValues: {
      name,
    },
    resolver: zodResolver(schema),
  })

  const {
    formState: { errors: imgErrors },
    handleSubmit: handleIMGsubmit,
    register,
  } = useForm<ImageFormType>({
    defaultValues: {
      avatar: undefined,
    },
    resolver: zodResolver(imageSchema),
  })
  const { onChange: onIMGChange, ref: refZ, ...restZ } = register('avatar')

  console.log('errors', imgErrors)
  console.log('errors', errors)
  //todo try add picture in form
  const classNames = {
    avatarWrapper: clsx(
      s.avatarWrapper,
      editMode ? s.avatarWrapperEditMode : s.avatarWrapperNotEditMode
    ),
    root: clsx(s.root, editMode && s.rootEditMode),
  }
  const inputRef = useRef<HTMLInputElement>(null)
  const customRef = useRef<HTMLInputElement | null>(null)
  const avatarUploaderButtonClick = () => {
    //inputRef.current?.click()
    customRef.current?.click()
  }

  useEffect(() => {
    console.log(selectedImage)
  }, [selectedImage])

  const setEditModeTrue = () => setEditMode(true)
  const onSubmitHandler = (data: FormData) => {
    isDirty && onSubmit(data)
    setEditMode(false)
  }

  const imgSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    setSelectedImage(e.target.files?.[0])
    const formData = new FormData()

    formData.append('avatar', file)
    onSubmit(formData)
  }

  const customSubmit = (data: any) => {
    console.log(data.avatar[0])
    console.log(data)
    const formData = new FormData()

    formData.append('avatar', data.avatar[0])
    onSubmit(formData)
  }

  return (
    <Card className={classNames.root}>
      <div className={s.contentWrapper}>
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          Personal Information
        </Typography>
        <div className={classNames.avatarWrapper}>
          <Avatar alt={alt} size={'large'} src={src}>
            {name[0].toUpperCase()}
          </Avatar>
          {!editMode && (
            <form onSubmit={handleIMGsubmit(customSubmit)}>
              <Button
                className={s.avatarButton}
                onClick={avatarUploaderButtonClick}
                type={'button'}
                variant={'secondary'}
              >
                <Edit2Outline />
                <input
                  className={s.fileLoader}
                  id={'fileUploader'}
                  onChange={e => imgSubmit(e)}
                  ref={inputRef}
                  type={'file'}
                />
              </Button>
              <input
                type={'file'}
                {...restZ}
                onChange={e => {
                  onIMGChange(e)
                  handleIMGsubmit(customSubmit)()
                }}
                ref={e => {
                  refZ(e)
                  customRef.current = e
                }}
              />
            </form>
          )}
        </div>
        <div className={s.profileWrapper}>{editableProfile()}</div>
      </div>
    </Card>
  )

  function editableProfile() {
    if (!editMode) {
      return (
        <>
          <div className={s.nameWrapper}>
            <Typography as={'h2'} className={s.name} variant={'h2'}>
              {name}
            </Typography>
            <button className={s.nameButton} onClick={setEditModeTrue} type={'button'}>
              <Edit2Outline />
            </button>
          </div>
          <Typography as={'span'} className={s.email} variant={'body_2'}>
            {email}
          </Typography>
          <Button onClick={onLogOut} type={'button'} variant={'secondary'}>
            <LogOut />
            Logout
          </Button>
        </>
      )
    }

    return (
      <form className={s.formWrapper} onSubmit={handleSubmit(onSubmitHandler)}>
        <DevTool control={control} />
        <div className={s.textFieldWrapper}>
          <ControlledTextField
            className={s.textField}
            control={control}
            errorMessage={errors?.name?.message}
            label={'Nickname'}
            name={'name'}
            placeholder={'Minimum X symbols'}
          />
        </div>
        <Button fullWidth type={'submit'} variant={'primary'}>
          Save Changes
        </Button>
      </form>
    )
  }
}
