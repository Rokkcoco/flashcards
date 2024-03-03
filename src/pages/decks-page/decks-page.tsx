import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useDebounce } from '@/common/hooks'
import { AddDeckModal } from '@/components/modal'
import { DecksTable } from '@/components/table/decks-table/decks-table'
import { Loader, Page, Pagination } from '@/components/ui'
import { Typography } from '@/components/ui/typography/typography'
import { SearchSettings } from '@/features'
import { useGetDecksQuery, useGetMinMaxDeckCardsQuery } from '@/services'

import s from './decks-page.module.scss'

export const DecksPage = () => {
  //test@test.com
  //test
  const pageSizeOptionsDecks = {
    5: '5',
    7: '7',
    10: '10',
  }
  //todo update currentPage after update
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPageQuery = Number(searchParams.get('currentPage'))

  const itemsPerPageQuery = Number(searchParams.get('itemsPerPage'))
  const [currentPage, setCurrentPage] = useState(currentPageQuery === 0 ? 1 : currentPageQuery)
  const [pageSize, setPageSize] = useState(
    itemsPerPageQuery === 0 ? pageSizeOptionsDecks['5'] : itemsPerPageQuery
  )

  /*  for back button page in browser*/
  useEffect(() => {
    if (currentPageQuery !== currentPage && currentPageQuery !== 0) {
      setCurrentPage(currentPageQuery)
    }
    if (currentPageQuery === 0) {
      setCurrentPage(1)
    }
  }, [currentPageQuery])

  useEffect(() => {
    if (itemsPerPageQuery !== pageSize && itemsPerPageQuery !== 0) {
      setPageSize(itemsPerPageQuery)
    }
    if (itemsPerPageQuery === 0) {
      setPageSize('5')
    }
  }, [itemsPerPageQuery])

  const setCurrentPageWithSearchParams = (page: number) => {
    if (page === 1) {
      searchParams.delete('currentPage')
    } else {
      searchParams.set('currentPage', page.toString())
    }
    setSearchParams(searchParams)
    setCurrentPage(page)
  }
  const setPageSizeWithSearchParams = (itemsPerPage: string) => {
    if (itemsPerPage === '5') {
      searchParams.delete('itemsPerPage')
    } else {
      searchParams.set('itemsPerPage', itemsPerPage)
    }
    setSearchParams(searchParams)
    setPageSize(itemsPerPage)
  }

  const resetPaginationSettings = () => {
    setCurrentPageWithSearchParams(1)
    setPageSizeWithSearchParams('5')
  }

  const resetPaginationCurrentPage = () => {
    setCurrentPageWithSearchParams(1)
  }

  const name = searchParams.get('name')
  const minCards = searchParams.get('minCards')
  const maxCards = searchParams.get('maxCards')
  const authorId = searchParams.get('authorId')
  const sort = searchParams.get('sort')

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
    orderBy: sort,
  })

  /*if our last page is out of range*/
  useEffect(() => {
    if (data) {
      if (data.pagination.totalPages !== 0 && data.pagination.totalPages < currentPage) {
        setCurrentPage(data.pagination.totalPages)
      }
    }
  }, [data?.pagination])

  const { isLoading: minMaxDeckCardsIsLoading } = useGetMinMaxDeckCardsQuery()

  if (isLoading || minMaxDeckCardsIsLoading) {
    return <Loader />
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
      <AddDeckModal />
      <SearchSettings onClear={resetPaginationSettings} onSearch={resetPaginationCurrentPage} />
      <DecksTable decks={data?.items} />
      <div className={s.pagination}>
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPageWithSearchParams}
          onPageSizeChange={setPageSizeWithSearchParams}
          pageSize={Number(pageSize)}
          selectOptions={pageSizeOptionsDecks}
          totalCount={data?.pagination?.totalItems ?? 1}
        />
      </div>
    </Page>
  )
}
