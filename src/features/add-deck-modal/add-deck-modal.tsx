import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { ImageOutline } from '@/assets'
import { imgSchema } from '@/common/schema'
import { Button, ControlledCheckbox, ControlledTextField, Typography } from '@/components/ui'
import { ModalForm } from '@/components/ui/modal-form'
import { useCreateDeckMutation } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './add-deck-modal.module.scss'
//todo перекинуть в общие, она еще используется
const schema = z.object({
  cover: imgSchema('cover').shape['cover'],
  isPrivate: z.boolean(),
  name: z.string().min(3),
})

type FormType = z.infer<typeof schema>
export const AddDeckModal = () => {
  const [modalOpenStatus, setModalOpenStatus] = useState(false)

  const [createDeck] = useCreateDeckMutation()
  const addDeckHanlder = (data: FormType) => {
    createDeck(data)
    setModalOpenStatus(false)
  }

  const closeModalHanlder = () => setModalOpenStatus(false)

  const fileCustomRef = useRef<HTMLInputElement | null>(null)

  const addCoverHandler = () => {
    fileCustomRef.current?.click()
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    trigger,
    watch,
  } = useForm<FormType>({
    defaultValues: {
      cover: undefined,
      isPrivate: false,
      name: '',
    },
    resolver: zodResolver(schema),
  })
  const { onChange: imageOnChange, ref: fileRef, ...restFile } = register('cover')

  const coverWatcher = watch('cover')

  useEffect(() => {
    if (!modalOpenStatus) {
      reset()
    }
  }, [modalOpenStatus])

  const classNames = {
    error: s.error,
    fileLoader: s.fileLoader,
    imagePreview: s.imagePreview,
  }

  const imgLoaderRef = (e: HTMLInputElement | null) => {
    fileRef(e)
    fileCustomRef.current = e
  }
  const imgLoaderHandler = (e: ChangeEvent<HTMLInputElement>) => {
    imageOnChange(e)
    trigger('cover')
  }

  return (
    <ModalForm
      className={s.root}
      control={control}
      controlButtons={
        <>
          <Button type={'submit'}>Add New Deck</Button>
          <Button onClick={closeModalHanlder} type={'button'} variant={'secondary'}>
            Cancel
          </Button>
        </>
      }
      formSubmit={handleSubmit(addDeckHanlder)}
      onOpenChange={setModalOpenStatus}
      open={modalOpenStatus}
      title={'Add New Deck'}
      trigger={<Button>Add New Deck</Button>}
    >
      <ControlledTextField
        control={control}
        errorMessage={errors.name?.message}
        label={'Name Pack'}
        name={'name'}
        placeholder={'Minimum X symbols'}
      />
      <Button fullWidth onClick={addCoverHandler} type={'button'} variant={'secondary'}>
        <ImageOutline />
        Upload Image
      </Button>
      {!errors.cover && coverWatcher?.length > 0 && (
        <img
          alt={'FIX LATER'}
          className={classNames.imagePreview}
          src={URL.createObjectURL(coverWatcher?.[0])}
        />
      )}
      <input
        className={classNames.fileLoader}
        id={'fileUploader'}
        type={'file'}
        {...restFile}
        onChange={imgLoaderHandler}
        ref={imgLoaderRef}
      />
      {errors.cover && (
        <Typography className={classNames.error} variant={'caption'}>
          {errors.cover?.message}
        </Typography>
      )}
      <ControlledCheckbox control={control} label={'Private Deck'} name={'isPrivate'} />
    </ModalForm>
  )
}
