import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Edit2Outline, ImageOutline, PlayCircleOutline, TrashOutline } from '@/assets'
import { useDebounce } from '@/common/hooks'
import { Button, Checkbox, Modal, Page, TextField } from '@/components/ui'
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
import { skipToken } from '@reduxjs/toolkit/query'

import s from './decks.module.scss'

export const DecksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams({ name: '', page: '1' })
  const page = Number(searchParams.get('page'))
  const name = searchParams.get('name')
  const setPage = (page: number) => {
    searchParams.set('page', page.toString())
    setSearchParams(searchParams)
  }

  //test@test.com
  //test
  console.log(setPage)
  console.log(name)
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

  // const changeSearchHandler = (search: string) => {
  //   if (!search) {
  //     params.delete('search')
  //   } else {
  //     params.set('search', search)
  //   }
  //   params.set('page', '1')
  //   setParams(params)
  // }

  //const searchName = useDebounce(searchValueTextField, 1000)
  const searchName = 'FIX LATER'
  const setName = (name: string) => {
    if (name === '') {
      searchParams.delete('name')
    } else {
      searchParams.set('name', name)
    }
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }
  const { data, error, isLoading } = useGetDecksQuery({
    currentPage: page || 1,
    itemsPerPage: 5,
    minCardsCount: 3,
    name: searchName ?? skipToken,
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

  /* const GetCardModal = () => {
    return (
      <Modal>
        <Button as={'a'}></Button>
      </Modal>
    )
  }*/

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
