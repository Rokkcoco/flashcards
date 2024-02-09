import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets'
import { useDebounce } from '@/common/hooks'
import { Button, Page } from '@/components/ui'
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
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDeckQuery,
  useGetDecksQuery,
} from '@/services/decks'

import s from './decks.module.scss'

export const DecksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams({ name: '', page: '1' })
  const page = Number(searchParams.get('page'))

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
  const nameWithDebounce = useDebounce(name, 1000)

  console.log(name)
  const minCardsValueWithDebounce = Number(useDebounce(minCards, 1000))
  const maxCardsValueWithDebounce = Number(useDebounce(maxCards, 1000))

  const { data, error, isLoading } = useGetDecksQuery({
    currentPage: page || 1,
    itemsPerPage: 5,
    maxCardsCount: maxCardsValueWithDebounce ?? undefined,
    minCardsCount: minCardsValueWithDebounce ?? undefined,
    name: nameWithDebounce ?? undefined,
  })

  console.log(data)
  const [deckId, setDeckId] = useState('')
  const [skip, setSkip] = useState(true)
  const [createDeck] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  // const { data: CardData } = useGetCardQuery({ id: cardId }, { skip })
  const { data: DeckData } = useGetDeckQuery({ id: deckId }, { skip })

  console.log(DeckData)

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
        <Button onClick={() => createDeck({ name: 'new deck' })}>Add new deck</Button>
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
                <TableCell>{deck.name}</TableCell>
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
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {/*<Pagination count={data?.pagination?.totalPages ?? 1} onPageChange={setPage} currentPage={page} />*/}
    </Page>
  )
}
