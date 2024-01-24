import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Button, Page, Slider, TextField, Typography } from '@/components/ui'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks'

import s from './decks.module.scss'

export const Decks = () => {
  const [searchParams, setSearchParams] = useSearchParams({ name: '', page: '1' })
  const page = Number(searchParams.get('page'))
  const name = searchParams.get('name')
  // const setPage = (page: number) => {
  //     searchParams.set('page', page.toString())
  //     setSearchParams(searchParams)
  // }

  const minMaxSliderValues = [0, 62]
  const [sliderValue, setSliderValue] = useState([0, 62])
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
    itemsPerPage: 8,
    name: name ?? undefined,
  })

  const [createDeck] = useCreateDeckMutation()

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
        <Button onClick={() => createDeck({ name: '123123' })}>Add new deck</Button>
      </div>
      <div className={s.filter}>
        <TextField
          onValueChange={setName}
          placeholder={'Search decks'}
          type={'search'}
          value={name ?? ''}
        />
        <div className={s.tabs}>
          <Button>My decks</Button>
          <Button>All decks</Button>
        </div>
        <Slider
          max={minMaxSliderValues[1]}
          min={minMaxSliderValues[0]}
          onValueChange={setSliderValue}
          value={sliderValue}
        />
        <Button variant={'secondary'}>Clear</Button>
      </div>
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
                <TableCell>{new Date(deck.updated).toLocaleDateString()}</TableCell>
                <TableCell>{deck.author.name}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {/*<Pagination count={data?.pagination?.totalPages ?? 1} onPageChange={setPage} currentPage={page} />*/}
    </Page>
  )
}
