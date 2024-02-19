import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { Button, Card, Page, RadioGroup, RadioItem, Typography } from '@/components/ui'
import { useGetDeckQuery, useGetRandomCardQuery, useUpdateCardGradeMutation } from '@/services'

import s from './learn-deck-page.module.scss'

export const LearnDeckPage = () => {
  const [showAnswer, setShowAnswer] = useState(false)
  const [gradeForAnswer, setGradeForAnswer] = useState('1')
  const { id = '' } = useParams<{ id: 'string' }>()
  const { data: deckData } = useGetDeckQuery({ id })
  const { data: cardData } = useGetRandomCardQuery({ id })
  const [saveGrade] = useUpdateCardGradeMutation()
  const location = useLocation()
  //todo save prevCard id for request
  //todo remove useeffect
  const answerButtonHanlder = () => setShowAnswer(true)
  const nextQuestionButtonHandler = () => {
    if (!cardData) {
      return
    }
    saveGrade({ cardId: cardData.id, grade: Number(gradeForAnswer) })

    setShowAnswer(false)
    setGradeForAnswer('1')
  }

  useEffect(() => {
    if (cardData) {
      if (cardData.grade !== 0) {
        setGradeForAnswer(cardData.grade.toString())
      }
    }
  }, [cardData])

  return (
    <Page>
      <Card className={s.root}>
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          Learn {deckData?.name}
        </Typography>

        <span className={s.question}>
          <Typography variant={'subtitle_1'}>Question:&nbsp;</Typography>
          <Typography variant={'body_1'}>{cardData?.question}</Typography>
        </span>
        {cardData?.questionImg && (
          <span className={s.imageContainer}>
            <img
              alt={'question picture'}
              className={s.questionPicture}
              src={cardData.questionImg}
            />
          </span>
        )}
        <span className={s.questionShots}>
          <Typography variant={'body_2'}>Количество попыток ответов на вопрос:&nbsp;</Typography>
          <Typography variant={'subtitle_2'}>{cardData?.shots}</Typography>
        </span>
        {!showAnswer && (
          <Button fullWidth onClick={answerButtonHanlder}>
            Show Answer
          </Button>
        )}
        {showAnswer && (
          <span className={s.question}>
            <Typography variant={'subtitle_1'}>Answer:&nbsp;</Typography>
            <Typography variant={'body_1'}>{cardData?.answer}</Typography>
          </span>
        )}
        {showAnswer && cardData?.answerImg && (
          <span className={s.imageContainer}>
            <img alt={'answer picture'} className={s.questionPicture} src={cardData.answerImg} />
          </span>
        )}
        {showAnswer && (
          <>
            <RadioGroup
              className={s.radio}
              onValueChange={setGradeForAnswer}
              value={gradeForAnswer}
            >
              <RadioItem value={'1'}>Did not know</RadioItem>
              <RadioItem value={'2'}>Forgot</RadioItem>
              <RadioItem value={'3'}>A lot of thought</RadioItem>
              <RadioItem value={'4'}>Confused</RadioItem>
              <RadioItem value={'5'}>Knew the answer</RadioItem>
            </RadioGroup>
            <Button fullWidth onClick={nextQuestionButtonHandler}>
              Next question
            </Button>
          </>
        )}
      </Card>
    </Page>
  )
}
