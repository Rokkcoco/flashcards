import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Edit2Outline, LogOut } from '@/assets'
import { imgSchema } from '@/common/schema'
import { Button, Card, Typography } from '@/components/ui'
import { Avatar } from '@/components/ui/avatar'
import { ControlledTextField } from '@/components/ui/controlled'
import { UpdateMeArgs } from '@/services'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { z } from 'zod'

import s from './personal-information.module.scss'

const imageSchema = imgSchema('avatar')
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
  onSubmit: (data: UpdateMeArgs) => void
  src: string
}
export const PersonalInformation = (props: Props) => {
  const { alt, email, name, onLogOut, onSubmit, src } = props
  const [editMode, setEditMode] = useState(false)
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<FormTypes>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(schema),
  })
  //todo fix span styles, fix variable names, type for avatar | name
  //todo проверить паддинги по макету
  const {
    clearErrors,
    control: imageControl,
    formState: { errors: imageErrors },
    handleSubmit: handleImageSubmit,
    register,
  } = useForm<ImageFormType>({
    defaultValues: {
      avatar: undefined,
    },
    resolver: zodResolver(imageSchema),
  })
  const { onChange: onImageChange, ref: imageRef, ...restZ } = register('avatar')

  const classNames = {
    avatar: s.avatar,
    avatarButton: s.avatarButton,
    avatarWrapper: clsx(
      s.avatarWrapper,
      editMode ? s.avatarWrapperEditMode : s.avatarWrapperNotEditMode
    ),
    contentWrapper: s.contentWrapper,
    email: s.email,
    fileLoader: s.fileLoader,
    formWrapper: s.formWrapper,
    imageError: s.imageError,
    name: s.name,
    nameButton: s.nameButton,
    nameWrapper: s.nameWrapper,
    profileWrapper: s.profileWrapper,
    root: clsx(s.root, editMode && s.rootEditMode),
    textField: s.textField,
    textFieldWrapper: s.textFieldWrapper,
    title: s.title,
  }

  const customRef = useRef<HTMLInputElement | null>(null)
  const avatarUploaderButtonClick = () => {
    customRef.current?.click()
  }

  const setEditModeTrue = () => setEditMode(true)
  const onSubmitHandler = ({ name }: FormTypes) => {
    isDirty && onSubmit({ name })
    setEditMode(false)
  }

  const customSubmit = ({ avatar }: ImageFormType) => {
    onSubmit({ avatar })
  }

  return (
    <Card className={classNames.root}>
      <div className={classNames.contentWrapper}>
        <Typography as={'h1'} className={classNames.title} variant={'h1'}>
          Personal Information
        </Typography>
        <div className={classNames.avatarWrapper}>
          <Avatar alt={alt} className={classNames.avatar} size={'large'} src={src}>
            {name[0].toUpperCase()}
          </Avatar>
          {!editMode && (
            <form onSubmit={handleImageSubmit(customSubmit)}>
              <DevTool control={imageControl} />
              <Button
                className={classNames.avatarButton}
                onClick={avatarUploaderButtonClick}
                type={'button'}
                variant={'secondary'}
              >
                <Edit2Outline />
              </Button>
              <input
                className={classNames.fileLoader}
                id={'fileUploader'}
                type={'file'}
                {...restZ}
                onChange={e => {
                  clearErrors()
                  onImageChange(e)
                  handleImageSubmit(customSubmit)()
                }}
                ref={e => {
                  imageRef(e)
                  customRef.current = e
                }}
              />
              {imageErrors.avatar && (
                <Typography className={classNames.imageError} variant={'caption'}>
                  {imageErrors.avatar.message}
                </Typography>
              )}
            </form>
          )}
        </div>
        <div className={classNames.profileWrapper}>{editableProfile()}</div>
      </div>
    </Card>
  )

  function editableProfile() {
    if (!editMode) {
      return (
        <>
          <div className={classNames.nameWrapper}>
            <Typography as={'h2'} className={classNames.name} variant={'h2'}>
              {name}
            </Typography>
            <button className={classNames.nameButton} onClick={setEditModeTrue} type={'button'}>
              <Edit2Outline />
            </button>
          </div>
          <Typography as={'span'} className={classNames.email} variant={'body_2'}>
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
      <form className={classNames.formWrapper} onSubmit={handleSubmit(onSubmitHandler)}>
        <DevTool control={control} />
        <div className={classNames.textFieldWrapper}>
          <ControlledTextField
            className={classNames.textField}
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
