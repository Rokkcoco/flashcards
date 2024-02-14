import { Link } from 'react-router-dom'

import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '@/components/ui'
import { Deck, useMeQuery } from '@/services'

import s from './decks-table.module.scss'

type Props = {
  decks: Deck[] | undefined
}
export const DecksTable = ({ decks }: Props) => {
  const { data: meData } = useMeQuery()

  return (
    <Table width={'100%'}>
      <TableHead>
        <TableRow>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Cards</TableHeadCell>
          <TableHeadCell>Last updated</TableHeadCell>
          <TableHeadCell>Created by</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {decks?.map(deck => {
          return (
            <TableRow key={deck.id}>
              <TableCell>
                <Link className={s.tableLink} to={`/deck/${deck.id}`}>
                  {deck.cover && (
                    <img
                      alt={'FIX LATER'}
                      src={deck.cover}
                      style={{ height: '90px', width: '90px' }}
                    />
                  )}
                  {deck.name}
                </Link>
              </TableCell>
              <TableCell>{deck.cardsCount}</TableCell>
              <TableCell>{new Date(deck.updated).toLocaleDateString('ru')}</TableCell>
              <TableCell>{deck.author.name}</TableCell>
              <TableCell>
                <div className={s.cellIcons}>
                  <Link onClick={() => {}} to={''}>
                    <PlayCircleOutline />
                  </Link>
                  {meData?.id === deck.author.id && (
                    <>
                      <button>
                        <Edit2Outline />
                      </button>
                      <button onClick={() => {}}>
                        <TrashOutline />
                      </button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
