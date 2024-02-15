import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Edit2Outline, ImageOutline } from '@/assets'
import { imgSchema } from '@/common/schema'
import { Button, ControlledTextField, Typography } from '@/components/ui'
import { ModalForm } from '@/components/ui/modal-form'
import { useUpdateDeckMutation } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  cover: imgSchema('cover').shape['cover'],
  isPrivate: z.boolean(),
  name: z.string().min(3),
})

type FormType = z.infer<typeof schema>
type Props = {
  deck: {
    cover: FileList
    id: string
    isPrivate: boolean
    name: string
  }
}
export const EditDeckModal = ({ deck }: Props) => {
  const { cover, id, isPrivate, name } = deck
  const [modalOpen, setModalOpen] = useState(false)
  const [updateDeck] = useUpdateDeckMutation()

  console.log(deck)
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
      cover,
      isPrivate,
      name,
    },
    resolver: zodResolver(schema),
  })

  const updateDeckSubmit = (data: FormType) => {
    console.log({ ...data, id })

    //updateDeck(data)
  }

  return (
    <ModalForm
      control={control}
      formSubmit={handleSubmit(updateDeckSubmit)}
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
      {cover && <img alt={'cover image'} src={''} />}
      {true && (
        <>
          <Typography variant={'subtitle_2'}>New Cover:</Typography>{' '}
          <img alt={'new cover image'} src={''} />
        </>
      )}
      <Button variant={'secondary'}>
        <ImageOutline />
        Upload Image
      </Button>
    </ModalForm>
  )
}
