import { useRef, useState } from 'react'
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
  onLogOut: () => void
  onSubmit: (data: FormTypes) => void
  src: string
}
export const EditProfile = (props: Props) => {
  const { alt, email, name, onLogOut, onSubmit, src } = props
  const [editMode, setEditMode] = useState(false)
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormTypes>({
    defaultValues: {
      name,
    },
    resolver: zodResolver(schema),
  })

  const inputRef = useRef<HTMLInputElement | null>(null)
  const avatarUploaderButtonClick = () => {
    inputRef.current?.click()
  }

  const setEditModeTrue = () => setEditMode(true)
  const handlerOnSubmit = (data: FormTypes) => {
    onSubmit(data)
    setEditMode(false)
  }

  return (
    <Card className={s.root}>
      <form className={s.form} onSubmit={handleSubmit(handlerOnSubmit)}>
        <DevTool control={control} />
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          Personal Information
        </Typography>
        <div className={s.avatarWrapper}>
          <Avatar alt={alt} size={'large'} src={src}>
            {name[0].toUpperCase()}
          </Avatar>
          {!editMode && (
            <>
              <Button
                className={s.avatarButton}
                onClick={avatarUploaderButtonClick}
                type={'button'}
                variant={'secondary'}
              >
                <Edit2Outline />
                <input className={s.fileLoader} id={'fileUploader'} ref={inputRef} type={'file'} />
              </Button>
            </>
          )}
        </div>
        <div className={s.profileWrapper}>{editableProfile()}</div>
      </form>
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
      <>
        <div className={s.textFieldWrapper}>
          <ControlledTextField
            className={s.textField}
            control={control}
            error={errors?.name?.message}
            label={'Nickname'}
            name={'name'}
            placeholder={'Minimum X symbols'}
          />
        </div>
        <Button fullWidth type={'submit'} variant={'primary'}>
          Save Changes
        </Button>
      </>
    )
  }
}

// const ImageUploader = () => {
//     const [selectedImage, setSelectedImage] = useState(null);
//
//     const handleImageChange = (event) => {
//         const file = event.target.files[0];
//
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 setSelectedImage(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };
//
//     return (
//         <div>
//             <input type="file" accept="image/*" onChange={handleImageChange} />
//             {selectedImage && (
//                 <div>
//                     <p>Selected Image:</p>
//                     <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%' }} />
//                 </div>
//             )}
//         </div>
//     );
// };
//
