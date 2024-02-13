import { useState } from 'react'
import { NavLink, useLocation, useSearchParams } from 'react-router-dom'

import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets'
import { useDebounce } from '@/common/hooks'
import { Page, Pagination } from '@/components/ui'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table'
import { Typography } from '@/components/ui/typography/typography'
import { SearchSettings } from '@/features'
import { useMeQuery } from '@/services'
import { useDeleteDeckMutation, useGetDecksQuery } from '@/services/decks'

import s from './decks.module.scss'

export const DecksPage = () => {
  const [searchParams] = useSearchParams({ name: '', page: '1' })
  const page = Number(searchParams.get('page'))
  const location = useLocation()

  console.log('location', location)
  // const setPage = (page: number) => {
  //   searchParams.set('page', page.toString())
  //   setSearchParams(searchParams)
  // }

  //test@test.com
  //test

  // const orderBy = JSON.parse(search.get('orderBy') ?? 'null')
  // const setOrderBy = (value: Sort) => {
  //   search.set('orderBy', JSON.stringify(value))
  //   setSearch(search)
  // }
  // const orderByString = useMemo(() => {
  //   if (!orderBy) return null
  //
  //   return `${orderBy.key}-${orderBy.direction}`
  // }, [orderBy])

  const name = searchParams.get('name')
  const minCards = searchParams.get('minCards')
  const maxCards = searchParams.get('maxCards')
  const authorId = searchParams.get('authorId')
  const nameWithDebounce = useDebounce(name, 1000)
  const minCardsValueWithDebounce = useDebounce(minCards, 1000)
  const maxCardsValueWithDebounce = useDebounce(maxCards, 1000)
  const authorIdWithDebounce = useDebounce(authorId, 1000)

  const { data, error, isLoading } = useGetDecksQuery({
    authorId: authorIdWithDebounce ?? undefined,
    currentPage: page || 1,
    itemsPerPage: 5,
    maxCardsCount: maxCardsValueWithDebounce === null ? undefined : +maxCardsValueWithDebounce,
    minCardsCount: minCardsValueWithDebounce === null ? undefined : +minCardsValueWithDebounce,
    name: nameWithDebounce ?? undefined,
  })
  const { data: meData } = useMeQuery()

  console.log(data)
  const [deckId, setDeckId] = useState('')
  const [skip, setSkip] = useState(true)
  const [deleteDeck] = useDeleteDeckMutation()
  // const { data: CardData } = useGetCardQuery({ id: cardId }, { skip })
  // const { data: DeckData } = useGetDeckQuery({ id: deckId }, { skip })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    console.error(error)

    return <div>Error</div>
  }

  return (
    <Page>
      <div className={s.header}>
        <Typography as={'h1'} variant={'large'}>
          Decks
        </Typography>
      </div>
      <SearchSettings />
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
          {data?.items.map(deck => {
            return (
              <TableRow key={deck.id}>
                <TableCell>
                  <NavLink to={`/deck/${deck.id}`}>{deck.name}</NavLink>
                </TableCell>
                <TableCell>{deck.cardsCount}</TableCell>
                <TableCell>{new Date(deck.updated).toLocaleDateString('ru')}</TableCell>
                <TableCell>{deck.author.name}</TableCell>
                <TableCell>
                  <button
                    onClick={() => {
                      setDeckId(deck.id)
                      setSkip(false)
                    }}
                  >
                    <PlayCircleOutline />
                  </button>
                  {meData?.id === deck.author.id && (
                    <>
                      <button>
                        <Edit2Outline />
                      </button>
                      <button
                        onClick={() => {
                          deleteDeck({ id: deck.id })
                        }}
                      >
                        <TrashOutline />
                      </button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Pagination
        currentPage={page}
        onPageChange={() => {}}
        pageSize={3}
        totalCount={data?.pagination?.totalPages ?? 1}
      />
    </Page>
  )
}
