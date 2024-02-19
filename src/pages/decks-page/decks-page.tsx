import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useDebounce } from '@/common/hooks'
import { DecksTable } from '@/components/table/decks-table/decks-table'
import { Page, Pagination } from '@/components/ui'
import { Typography } from '@/components/ui/typography/typography'
import { SearchSettings } from '@/features'
import { useGetDecksQuery, useGetMinMaxDeckCardsQuery } from '@/services'

import s from './decks-page.module.scss'

export const DecksPage = () => {
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

  const pageSizeOptions = {
    5: '5',
    7: '7',
    10: '10',
  }
  //todo update currentPage after update
  const [searchParams, setSearchParams] = useSearchParams()

  /*  const page = Number(searchParams.get('page'))*/
  const currentPageQuery = Number(searchParams.get('currentPage'))
  const itemsPerPageQuery = Number(searchParams.get('itemsPerPage'))
  const [currentPage, setCurrentPage] = useState(currentPageQuery === 0 ? 1 : currentPageQuery)
  const [pageSize, setPageSize] = useState(
    itemsPerPageQuery === 0 ? pageSizeOptions['5'] : itemsPerPageQuery
  )

  console.log('currentPage', currentPage)
  console.log('pageSize', pageSize)

  const setPageSizeWithSearchParams = (itemsPerPage: string) => {
    if (itemsPerPage === '5') {
      searchParams.delete('itemsPerPage')
    } else {
      searchParams.set('itemsPerPage', itemsPerPage)
    }
    setSearchParams(searchParams)
    setPageSize(itemsPerPage)
  }

  const name = searchParams.get('name')
  const minCards = searchParams.get('minCards')
  const maxCards = searchParams.get('maxCards')
  const authorId = searchParams.get('authorId')

  const nameWithDebounce = useDebounce(name ?? undefined, 1000)
  const minCardsValueWithDebounce = useDebounce(minCards ?? undefined, 1000)
  const maxCardsValueWithDebounce = useDebounce(maxCards ?? undefined, 1000)
  const authorIdWithDebounce = useDebounce(authorId ?? undefined, 1000)

  const { data, error, isLoading } = useGetDecksQuery({
    authorId: authorIdWithDebounce,
    currentPage: currentPage,
    itemsPerPage: +pageSize,
    maxCardsCount: maxCardsValueWithDebounce === undefined ? undefined : +maxCardsValueWithDebounce,
    minCardsCount: minCardsValueWithDebounce === undefined ? undefined : +minCardsValueWithDebounce,
    name: nameWithDebounce,
  })
  const { isLoading: minMaxDeckCardsIsLoading } = useGetMinMaxDeckCardsQuery()

  if (isLoading || minMaxDeckCardsIsLoading) {
    return <div>Loading...</div>
  }

  if (error) {
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
          onPageSizeChange={setPageSizeWithSearchParams}
          pageSize={Number(pageSize)}
          selectOptions={pageSizeOptions}
          totalCount={data?.pagination?.totalItems ?? 1}
        />
      </div>
    </Page>
  )
}
