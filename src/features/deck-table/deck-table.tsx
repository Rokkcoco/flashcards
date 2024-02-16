import { useParams } from 'react-router-dom'

import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '@/components/ui'
import { Rating } from '@/features'
import { useGetCardsInADeckQuery } from '@/services'

import s from './deck-table.module.scss'

export const DeckTable = () => {
  const { id = '' } = useParams<{ id: 'string' }>()
  const { data: cardsData } = useGetCardsInADeckQuery({ id })

  return (
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
                    <img alt={'FIX LATER'} className={s.cardImage} src={card.questionImg} />
                  )}
                  {card.question}
                </div>
              </TableCell>
              <TableCell>
                <div className={s.cellWithImage}>
                  {card.answerImg && (
                    <img alt={'FIX LATER'} className={s.cardImage} src={card.answerImg} />
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
  )
}
