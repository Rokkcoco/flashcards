import { Link } from 'react-router-dom'

import { PlayCircleOutline } from '@/assets'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '@/components/ui'
import { DeleteDeckModal } from '@/features'
import { EditDeckModal } from '@/features/edit-deck-modal'
import { Deck, useDeleteDeckMutation, useMeQuery } from '@/services'
import { clsx } from 'clsx'

import s from './decks-table.module.scss'

type Props = {
  decks: Deck[] | undefined
}
export const DecksTable = ({ decks }: Props) => {
  const { data: meData } = useMeQuery()
  const [deleteDeck] = useDeleteDeckMutation()
  const classNames = {
    cellIcons: s.cellIcons,
    deckLink: s.tableLink,
  }

  const playLinkStyles = (count: number) => clsx(s.tableLink, !count && s.disabledLink)

  const deleteDeckHandler = (id: string) => () => {
    deleteDeck({ id })
  }

  return (
    <Table>
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
                      alt={deck.name + ' deck image'}
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
                <div className={classNames.cellIcons}>
                  <Link className={playLinkStyles(deck.cardsCount)} to={`/learn/${deck.id}`}>
                    <PlayCircleOutline />
                  </Link>
                  {meData?.id === deck.author.id && (
                    <>
                      <EditDeckModal deck={deck} />
                      <DeleteDeckModal deckName={deck.name} onDelete={deleteDeckHandler(deck.id)} />
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
