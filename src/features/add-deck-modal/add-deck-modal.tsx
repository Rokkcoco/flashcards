import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { ImageOutline } from '@/assets'
import { imgSchema } from '@/common/schema'
import { Button, ControlledCheckbox, ControlledTextField, Modal } from '@/components/ui'
import { CreateDeckArgs, useCreateDeckMutation } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  deck: z.string().min(3),
  image: imgSchema('image').shape.image,
  isPrivate: z.boolean(),
})

//  .merge(imgSchema('cover'))
type FormType = z.infer<typeof schema>
export const AddDeckModal = () => {
  const [modalOpenStatus, setModalOpenStatus] = useState(false)
  const [coverForNewDeck, setCoverForNewDeck] = useState<File | undefined>()
  const [createDeck] = useCreateDeckMutation()
  const addDeckHanlder = (data: FormType) => {
    const formData = new FormData()

    data.image && formData.append('cover', data.image)

    data.isPrivate && formData.append('isPrivate', data.isPrivate.toString())
    formData.append('name', data.deck)
    createDeck(formData)
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
  } = useForm<FormType>({
    defaultValues: {
      deck: '',
      image: undefined,
      isPrivate: false,
    },
    resolver: zodResolver(schema),
  })
  const { onChange: onChangeFile, ref: refFile, ...restFile } = register('image')

  useEffect(() => {
    if (!modalOpenStatus) {
      setCoverForNewDeck(undefined)
    }
  }, [modalOpenStatus])

  return (
    <Modal
      onOpenChange={setModalOpenStatus}
      open={modalOpenStatus}
      title={'Add New Deck'}
      trigger={<Button>Add New Deck</Button>}
    >
      <form onSubmit={handleSubmit(addDeckHanlder)}>
        <ControlledTextField
          control={control}
          label={'Name Pack'}
          name={'deck'}
          placeholder={'Minimum X symbols'}
        />
        <Button fullWidth variant={'secondary'}>
          <ImageOutline />
          Upload Image
        </Button>
        {coverForNewDeck && (
          <img
            alt={'FIX LATER'}
            src={URL.createObjectURL(coverForNewDeck)}
            style={{ width: '211px' }}
          />
        )}
        <input
          /*className={classNames.fileLoader}*/
          id={'fileUploader'}
          type={'file'}
          {...restFile}
          onChange={e => {
            onChangeFile(e)
            if (e.target.files) {
              setCoverForNewDeck(e.target.files[0])
            }
          }}
          ref={e => {
            refFile(e)
            fileCustomRef.current = e
          }}
        />
        {errors.image?.message && <p>{errors.image.message}</p>}
        <ControlledCheckbox control={control} name={'isPrivate'} />
        <Button type={'submit'}>Add New Deck</Button>
        <Button variant={'secondary'}>Cancel</Button>
      </form>
    </Modal>
  )
}
