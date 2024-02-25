import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { ImageOutline } from '@/assets'
import { imgSchema } from '@/common/schema'
import { Button, ControlledTextField, Typography } from '@/components/ui'
import { ModalForm } from '@/components/ui/modal-form'
import { useCreateCardMutation } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './add-cart-modal.module.scss'

const schema = z.object({
  answer: z.string().min(3),
  answerImg: imgSchema('answerImg').shape['answerImg'],
  question: z.string().min(3),
  questionImg: imgSchema('questionImg').shape['questionImg'],
})

type FormTypes = z.infer<typeof schema>
export const AddCardModal = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const { id = '' } = useParams()
  const [createCard] = useCreateCardMutation()
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    trigger,
    watch,
  } = useForm<FormTypes>({
    defaultValues: {
      answer: '',
      answerImg: undefined,
      question: '',
      questionImg: undefined,
    },
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (!modalOpen) {
      reset()
    }
  }, [modalOpen])

  const addCardSubmit = (data: FormTypes) => {
    createCard({ id, ...data })
    setModalOpen(false)
  }
  const closeModalHandler = () => setModalOpen(false)

  const answerImageRef = useRef<HTMLInputElement | null>(null)
  const questionImageRef = useRef<HTMLInputElement | null>(null)

  const answerImageWatcher = watch('answerImg')
  const questionImageWatcher = watch('questionImg')

  const {
    onChange: answerImageOnChange,
    ref: answerRegisterRef,
    ...restAnswerImage
  } = register('answerImg')
  const {
    onChange: questionImageOnChange,
    ref: questionRegisterRef,
    ...restQuestionImage
  } = register('questionImg')

  const addQuestionImageHandler = () => {
    questionImageRef.current?.click()
  }
  const addAnswerImageHandler = () => {
    answerImageRef.current?.click()
  }

  const classNames = {
    error: s.error,
    fileLoader: s.fileLoader,
    imagePreview: s.imagePreview,
  }

  const answerImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    void answerImageOnChange(e)
    void trigger('answerImg')
  }

  const answerImgRef = (e: HTMLInputElement | null) => {
    answerRegisterRef(e)
    answerImageRef.current = e
  }
  const questionImgRef = (e: HTMLInputElement | null) => {
    questionRegisterRef(e)
    questionImageRef.current = e
  }
  const questionImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    void questionImageOnChange(e)
    void trigger('questionImg')
  }

  return (
    <ModalForm
      control={control}
      controlButtons={
        <>
          <Button type={'submit'}>Add New Card</Button>
          <Button onClick={closeModalHandler} type={'button'} variant={'secondary'}>
            Cancel
          </Button>
        </>
      }
      onFormSubmit={handleSubmit(addCardSubmit)}
      onOpenChange={setModalOpen}
      open={modalOpen}
      title={'Add New Card'}
      trigger={<Button>Add New Card</Button>}
    >
      <Typography className={s.questionAnswerTitle} variant={'subtitle_2'}>
        Question:
      </Typography>
      <ControlledTextField
        control={control}
        errorMessage={errors?.question?.message}
        label={'Question?'}
        name={'question'}
        placeholder={'Minimum X symbols'}
      />
      {!errors.questionImg && questionImageWatcher?.length > 0 && (
        <img
          alt={'question picture'}
          className={classNames.imagePreview}
          src={URL.createObjectURL(questionImageWatcher?.[0])}
        />
      )}
      <Button fullWidth onClick={addQuestionImageHandler} type={'button'} variant={'secondary'}>
        <ImageOutline /> Change Image
      </Button>
      {errors.questionImg && (
        <Typography className={classNames.error} variant={'caption'}>
          {errors.questionImg?.message}
        </Typography>
      )}
      <input
        className={classNames.fileLoader}
        id={'questionImageUploader'}
        type={'file'}
        {...restQuestionImage}
        onChange={questionImgHandler}
        ref={questionImgRef}
      />
      <Typography variant={'subtitle_2'}>Answer:</Typography>
      <ControlledTextField
        control={control}
        errorMessage={errors?.answer?.message}
        label={'Answer?'}
        name={'answer'}
        placeholder={'Minimum X symbols'}
      />
      {!errors.answerImg && answerImageWatcher?.length > 0 && (
        <img
          alt={'answer picture'}
          className={classNames.imagePreview}
          src={URL.createObjectURL(answerImageWatcher?.[0])}
        />
      )}
      <Button fullWidth onClick={addAnswerImageHandler} type={'button'} variant={'secondary'}>
        <ImageOutline /> Change Image
      </Button>
      {errors.answerImg && (
        <Typography className={classNames.error} variant={'caption'}>
          {errors.answerImg?.message}
        </Typography>
      )}
      <input
        className={classNames.fileLoader}
        id={'answerImageUploader'}
        type={'file'}
        {...restAnswerImage}
        onChange={answerImgHandler}
        ref={answerImgRef}
      />
    </ModalForm>
  )
}
