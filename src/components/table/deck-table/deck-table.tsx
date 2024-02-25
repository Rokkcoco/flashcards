import { Column, Rating, Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui'
import { CardResponse } from '@/services'

import s from './deck-table.module.scss'

type Props = {
  cards: CardResponse[] | undefined
}
export const DeckTable = ({ cards }: Props) => {
  const columns: Column[] = [
    {
      key: 'question',
      sortable: true,
      title: 'Question',
    },
    {
      key: 'answer',
      sortable: true,
      title: 'Answer',
    },
    {
      key: 'updated',
      sortable: true,
      title: 'Last Updated',
    },
    {
      key: 'grade',
      sortable: true,
      title: 'Grade',
    },
  ]

  return (
    <Table>
      <TableHeader columns={columns} />
      <TableBody>
        {cards?.map(card => {
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
