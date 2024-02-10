import { Link, useParams } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextField,
  Typography,
} from '@/components/ui'
import { Rating } from '@/features'
import { useGetCardsInADeckQuery, useGetDeckQuery } from '@/services'

export const DeckPage = () => {
  const { id = '' } = useParams<{ id: 'string' }>()

  const { data: deckData } = useGetDeckQuery({ id })
  const { data: cardsData } = useGetCardsInADeckQuery({ id })

  return (
    <>
      <div>
        <Typography as={Link} to={'/'} variant={'body_2'}>
          <ArrowBackOutline fill={'white'} /> Back to Decks List
        </Typography>
      </div>
      <div>
        <Typography as={'h1'} variant={'h1'}>
          {deckData?.name}
        </Typography>
        <Button>Learn to Pack</Button>
      </div>
      <div>
        <TextField type={'search'} />
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Question</TableHeadCell>
            <TableHeadCell>Answer</TableHeadCell>
            <TableHeadCell>Last Updated</TableHeadCell>
            <TableHeadCell>Grade</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cardsData?.items.map(card => {
            return (
              <TableRow key={card.id}>
                <TableCell>
                  {card.questionImg && <img alt={''} src={card.questionImg} />}
                  {card.question}
                </TableCell>
                <TableCell>
                  {card.answerImg && <img alt={''} src={card.answerImg} />}
                  {card.answer}
                </TableCell>
                <TableCell>{new Date(card.updated).toLocaleDateString('ru')}</TableCell>
                <TableCell>
                  <Rating rating={card.grade} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}
