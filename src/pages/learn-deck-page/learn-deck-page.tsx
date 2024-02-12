import { useParams } from 'react-router-dom'

import { Button, Card, Page, Typography } from '@/components/ui'
import { useGetDeckQuery, useGetRandomCardQuery } from '@/services'

import s from './learn-deck-page.module.scss'
export const LearnDeckPage = () => {
  const { id = '' } = useParams<{ id: 'string' }>()
  const { data: deckData } = useGetDeckQuery({ id })
  const { data: cardData } = useGetRandomCardQuery({ id })

  console.log(cardData)
  console.log(deckData)

  return (
    <Page>
      <Card className={s.root}>
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          Learn {deckData?.name}
        </Typography>

        <span className={s.question}>
          <Typography variant={'subtitle_1'}>Question:</Typography>
          <Typography variant={'body_1'}>{cardData?.question}</Typography>
        </span>
        {cardData?.questionImg && (
          <img alt={'question picture'} className={s.questionPicture} src={cardData.questionImg} />
        )}
        <span className={s.questionShots}>
          <Typography variant={'body_2'}>Количество попыток ответов на вопрос:</Typography>
          <Typography variant={'subtitle_2'}>{cardData?.shots}</Typography>
        </span>
        <Button fullWidth>Show Answer</Button>
      </Card>
    </Page>
  )
}
