import { useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

import { useDebounce } from '@/common/hooks'
import { DecksTable } from '@/components/table/decks-table/decks-table'
import { Page, Pagination } from '@/components/ui'
import { Typography } from '@/components/ui/typography/typography'
import { SearchSettings } from '@/features'
import { useGetDecksQuery, useGetMinMaxDeckCardsQuery } from '@/services'

import s from './decks-page.module.scss'

export const DecksPage = () => {
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

  // const { data: CardData } = useGetCardQuery({ id: cardId }, { skip })
  // const { data: DeckData } = useGetDeckQuery({ id: deckId }, { skip })
  const pageSizeOptions = {
    5: '5',
    7: '7',
    10: '10',
  }
  //todo update currentPage after update
  const [searchParams] = useSearchParams({ name: '', page: '1' })
  const page = Number(searchParams.get('page'))
  const [currentPage, setCurrentPage] = useState(page)
  const [pageSize, setPageSize] = useState(pageSizeOptions['5'])
  const location = useLocation()

  console.log('location', location)
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
    currentPage: currentPage || 1,
    itemsPerPage: +pageSize,
    maxCardsCount: maxCardsValueWithDebounce === null ? undefined : +maxCardsValueWithDebounce,
    minCardsCount: minCardsValueWithDebounce === null ? undefined : +minCardsValueWithDebounce,
    name: nameWithDebounce ?? undefined,
  })
  const { isLoading: minMaxDeckCardsIsLoading } = useGetMinMaxDeckCardsQuery()

  if (isLoading || minMaxDeckCardsIsLoading) {
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
      <DecksTable decks={data?.items} />
      <div className={s.pagination}>
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSize={+pageSize}
          selectOptions={pageSizeOptions}
          totalCount={data?.pagination?.totalPages ?? 1}
        />
      </div>
    </Page>
  )
}
