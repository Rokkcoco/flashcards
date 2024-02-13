import { Link, useLocation, useParams } from 'react-router-dom'

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
import { AddCardModal } from '@/features/add-card-modal'
import { useGetCardsInADeckQuery, useGetDeckQuery, useMeQuery } from '@/services'

import s from './deck-page.module.scss'

export const DeckPage = () => {
  const { id = '' } = useParams<{ id: 'string' }>()
  const { data: meData } = useMeQuery()
  const { data: deckData } = useGetDeckQuery({ id })
  const { data: cardsData } = useGetCardsInADeckQuery({ id })
  const location = useLocation()
  const userIsDeckAuthor = meData?.id === deckData?.userId

  console.log(userIsDeckAuthor, 'userIsDeckAuthor')
  console.log('location', location)

  console.log(id)
  console.log('meData', meData)
  console.log('deckData', deckData)

  //todo fix Link
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
        {userIsDeckAuthor && <AddCardModal />}
        {!userIsDeckAuthor && (
          <Button as={Link} to={`/learn/${id}`}>
            Learn to Deck
          </Button>
        )}
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
                  <div className={s.cellWithImage}>
                    {card.questionImg && (
                      <img alt={''} className={s.cardImage} src={card.questionImg} />
                    )}
                    {card.question}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={s.cellWithImage}>
                    {card.answerImg && (
                      <img alt={''} className={s.cardImage} src={card.answerImg} />
                    )}
                    {card.answer}
                  </div>
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
