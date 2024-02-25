import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { PlayCircleOutline } from '@/assets'
import { DeleteDeckModal, EditDeckModal } from '@/components/modal'
import {
  Column,
  Sort,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Tooltip,
} from '@/components/ui'
import { Deck, useDeleteDeckMutation, useMeQuery } from '@/services'
import { clsx } from 'clsx'

import s from './decks-table.module.scss'

type Props = {
  decks: Deck[] | undefined
}
export const DecksTable = ({ decks }: Props) => {
  const columns: Column[] = [
    {
      key: 'name',
      sortable: true,
      title: 'Name',
    },
    {
      key: 'cardsCount',
      sortable: true,
      title: 'Cards',
    },
    {
      key: 'updated',
      sortable: true,
      title: 'Last Updated',
    },
    {
      key: 'author.name',
      sortable: true,
      title: 'Created by',
    },
  ]

  const [searchParams, setSearchParams] = useSearchParams()
  const sorted = searchParams.get('sort')

  const newSort = sorted?.split('-')
  const sortObject = { direction: newSort?.[1] as 'asc' | 'desc', key: newSort?.[0] ?? '' }
  const [sort, setSort] = useState<Sort>(sorted ? sortObject : null)

  const sortedString = useMemo(() => {
    if (!sort) {
      return null
    }

    return `${sort.key}-${sort.direction}`
  }, [sort])

  useEffect(() => {
    if (sort === null) {
      searchParams.delete('sort')
    } else {
      sortedString && searchParams.set('sort', sortedString)
    }

    setSearchParams(searchParams)
  }, [sort])

  useEffect(() => {
    if (!sorted) {
      setSort(null)
    }
  }, [sorted])

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
      <TableHeader columns={columns} onSort={setSort} sort={sort} />
      <TableBody>
        {decks?.map(deck => {
          return (
            <TableRow key={deck.id}>
              <TableCell>
                <Link className={s.tableLink} to={`/deck/${deck.id}`}>
                  {deck.cover && (
                    <Tooltip
                      content={
                        <img
                          alt={deck.name + ' deck image'}
                          className={s.imageTooltip}
                          src={deck.cover}
                        />
                      }
                    >
                      <img alt={deck.name + ' deck image'} className={s.image} src={deck.cover} />
                    </Tooltip>
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
