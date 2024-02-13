import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { ImageOutline } from '@/assets'
import logOut from '@/assets/icons/log-out'
import { Button, ControlledTextField, Modal, Typography } from '@/components/ui'
import { useCreateCardMutation, useGetDeckQuery } from '@/services'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './add-cart-modal.module.scss'

const schema = z.object({
  answer: z.string().min(3),
  question: z.string().min(3),
})

type FormTypes = z.infer<typeof schema>
export const AddCardModal = () => {
  const { id = '' } = useParams()
  const [questionPicture, setQuestionPicture] = useState()
  const [answerPicture, setAnswerPicture] = useState()
  const [createCard] = useCreateCardMutation()
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormTypes>({
    defaultValues: {
      answer: '',
      question: '',
    },
    resolver: zodResolver(schema),
  })

  const addCardSubmit = (data: FormTypes) => {
    createCard({ id, ...data })
  }

  return (
    <Modal title={'Add New Card'} trigger={<Button>Add New Card</Button>}>
      <form className={s.root} onSubmit={handleSubmit(addCardSubmit)}>
        <DevTool control={control} />
        <Typography className={s.questionAnswerTitle} variant={'subtitle_2'}>
          Question:
        </Typography>
        <div className={s.questionAnswerTextfield}>
          <ControlledTextField
            control={control}
            errorMessage={errors?.question?.message}
            label={'Question?'}
            name={'question'}
            placeholder={'Minimum X symbols'}
          />
        </div>
        {questionPicture && <img alt={'question picture'} className={s.questionPicture} src={''} />}
        <Button className={s.questionAnswerCoverButton} fullWidth variant={'secondary'}>
          <ImageOutline /> Change Image
        </Button>
        <Typography variant={'subtitle_2'}>Answer:</Typography>
        <div className={s.questionAnswerTitle}>
          <ControlledTextField
            control={control}
            errorMessage={errors?.answer?.message}
            label={'Answer?'}
            name={'answer'}
            placeholder={'Minimum X symbols'}
          />
        </div>
        {answerPicture && <img alt={'answer picture'} src={''} />}
        <Button className={s.questionAnswerCoverButton} fullWidth variant={'secondary'}>
          <ImageOutline /> Change Image
        </Button>
        <div className={s.controlButtonsWrapper}>
          <Button className={s.submitButton} type={'submit'}>
            Add New Card
          </Button>
          <Button type={'button'} variant={'secondary'}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  )
}
