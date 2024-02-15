import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { ImageOutline } from '@/assets'
import { imgSchema } from '@/common/schema'
import { Button, ControlledCheckbox, ControlledTextField, Modal } from '@/components/ui'
import { useCreateDeckMutation } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './add-deck-modal.module.scss'
const schema = z.object({
  cover: imgSchema('cover').shape.cover,
  isPrivate: z.boolean(),
  name: z.string().min(3),
})

//  .merge(imgSchema('cover'))
type FormType = z.infer<typeof schema>
export const AddDeckModal = () => {
  const [modalOpenStatus, setModalOpenStatus] = useState(false)
  const [createDeck] = useCreateDeckMutation()
  const addDeckHanlder = (data: FormType) => {
    createDeck(data)
    setModalOpenStatus(false)
    reset()
  }

  const fileCustomRef = useRef<HTMLInputElement | null>(null)

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<FormType>({
    defaultValues: {
      cover: undefined,
      isPrivate: false,
      name: '',
    },
    resolver: zodResolver(schema),
  })
  const { ref: fileRef, ...restFile } = register('cover')

  const uploadCover = watch('cover')

  useEffect(() => {
    if (!modalOpenStatus) {
      reset()
    }
  }, [modalOpenStatus, reset])

  const classNames = {
    fileLoader: s.fileLoader,
  }

  return (
    <Modal
      className={s.root}
      onOpenChange={setModalOpenStatus}
      open={modalOpenStatus}
      title={'Add New Deck'}
      trigger={<Button>Add New Deck</Button>}
    >
      <form onSubmit={handleSubmit(addDeckHanlder)}>
        <ControlledTextField
          control={control}
          label={'Name Pack'}
          name={'name'}
          placeholder={'Minimum X symbols'}
        />
        <Button fullWidth type={'button'} variant={'secondary'}>
          <ImageOutline />
          Upload Image
        </Button>
        {uploadCover?.length > 0 && (
          <img
            alt={'FIX LATER'}
            src={URL.createObjectURL(uploadCover?.[0])}
            style={{ width: '211px' }}
          />
        )}

        <input
          className={classNames.fileLoader}
          id={'fileUploader'}
          type={'file'}
          {...restFile}
          ref={e => {
            fileRef(e)
            fileCustomRef.current = e
          }}
        />
        {errors.cover?.message && <p>{errors.cover.message}</p>}
        <ControlledCheckbox control={control} name={'isPrivate'} />
        <Button type={'submit'}>Add New Deck</Button>
        <Button type={'button'} variant={'secondary'}>
          Cancel
        </Button>
      </form>
    </Modal>
  )
}
