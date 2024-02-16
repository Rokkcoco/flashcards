import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Edit2Outline, ImageOutline } from '@/assets'
import { imgSchema } from '@/common/schema'
import { Button, ControlledCheckbox, ControlledTextField, Typography } from '@/components/ui'
import { ModalForm } from '@/components/ui/modal-form'
import { useUpdateDeckMutation } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './edit-deck-modal.module.scss'
const schema = z.object({
  isPrivate: z.boolean(),
  name: z.string().min(3),
  newCover: imgSchema('newCover').shape['newCover'],
})

type FormType = z.infer<typeof schema>
type Props = {
  deck: { cover: string; id: string; isPrivate: boolean; name: string }
}
export const EditDeckModal = ({ deck }: Props) => {
  const { cover, id, isPrivate, name } = deck
  const [modalOpen, setModalOpen] = useState(false)
  const [updateDeck] = useUpdateDeckMutation()

  const imageCustomRef = useRef<HTMLInputElement | null>(null)
  const addCoverHandler = () => {
    imageCustomRef.current?.click()
  }

  const {
    control,
    formState: { dirtyFields, errors },
    handleSubmit,
    register,
    reset,
    trigger,
    watch,
  } = useForm<FormType>({
    defaultValues: {
      isPrivate,
      name,
      newCover: undefined,
    },
    resolver: zodResolver(schema),
  })

  const { onChange: imageOnChange, ref: imageRef, ...restImage } = register('newCover')
  const newCoverWatcher = watch('newCover')

  const updateDeckHandler = (data: FormType) => {
    Object.keys(dirtyFields).length &&
      updateDeck({
        ...data,
        cover: data.newCover.length > 0 ? data.newCover : undefined,
        id,
      })

    setModalOpen(false)
  }

  //: data.newCover.length > 0 ? data.newCover : undefined
  useEffect(() => {
    if (!modalOpen) {
      reset()
    }
  }, [modalOpen])

  const classNames = {
    error: s.error,
    imagePreview: s.imagePreview,
    imageUploader: s.imageUploader,
  }

  const closeModalHandler = () => setModalOpen(false)

  const imageUploaderHandler = (e: ChangeEvent<HTMLInputElement>) => {
    imageOnChange(e)
    trigger('newCover')
  }

  const imageUploaderRef = (e: HTMLInputElement | null) => {
    imageRef(e)
    imageCustomRef.current = e
  }

  return (
    <ModalForm
      control={control}
      controlButtons={
        <>
          <Button type={'submit'}>Update Deck</Button>
          <Button onClick={closeModalHandler} type={'button'} variant={'secondary'}>
            Cancel
          </Button>
        </>
      }
      onFormSubmit={handleSubmit(updateDeckHandler)}
      onOpenChange={setModalOpen}
      open={modalOpen}
      title={'Edit Deck'}
      trigger={
        <button>
          <Edit2Outline />
        </button>
      }
    >
      <ControlledTextField
        control={control}
        errorMessage={errors.name?.message}
        label={'Name Pack'}
        name={'name'}
        placeholder={'Minimum X symbols'}
      />
      <Typography variant={'subtitle_2'}>Cover:</Typography>
      {!cover && <Typography variant={'body_2'}>No cover</Typography>}
      {cover && <img alt={'cover image'} className={classNames.imagePreview} src={cover} />}
      {errors.newCover && (
        <Typography className={classNames.error} variant={'caption'}>
          {errors.newCover?.message}
        </Typography>
      )}
      {!errors.newCover && newCoverWatcher?.length > 0 && (
        <>
          <Typography variant={'subtitle_2'}>New Cover:</Typography>{' '}
          <img
            alt={'new cover image'}
            className={classNames.imagePreview}
            src={URL.createObjectURL(newCoverWatcher?.[0])}
          />
        </>
      )}
      <Button fullWidth onClick={addCoverHandler} type={'button'} variant={'secondary'}>
        <ImageOutline />
        Upload Image
      </Button>
      <ControlledCheckbox control={control} label={'Private Deck'} name={'isPrivate'} />
      <input
        {...restImage}
        className={classNames.imageUploader}
        id={'imageUploader'}
        onChange={imageUploaderHandler}
        ref={imageUploaderRef}
        type={'file'}
      />
    </ModalForm>
  )
}
