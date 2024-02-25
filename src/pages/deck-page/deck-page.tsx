import { MouseEvent, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets'
import { AddCardModal } from '@/components/modal'
import { DeckTable } from '@/components/table'
import { Button, Page, Pagination, TextField, Typography } from '@/components/ui'
import { useGetCardsInADeckQuery, useGetDeckQuery, useMeQuery } from '@/services'
import { clsx } from 'clsx'

import s from './deck-page.module.scss'

export const DeckPage = () => {
  const pageSizeOptionsCards = {
    5: '5',
    7: '7',
    10: '10',
  }
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPageQuery = Number(searchParams.get('currentPage'))

  const itemsPerPageQuery = Number(searchParams.get('itemsPerPage'))
  const [currentPage, setCurrentPage] = useState(currentPageQuery === 0 ? 1 : currentPageQuery)
  const [pageSize, setPageSize] = useState(
    itemsPerPageQuery === 0 ? pageSizeOptionsCards['5'] : itemsPerPageQuery
  )
  const setCurrentPageWithSearchParams = (page: number) => {
    if (page === 1) {
      searchParams.delete('currentPage')
    } else {
      searchParams.set('currentPage', page.toString())
    }
    setCurrentPage(page)
    setSearchParams(searchParams, { replace: true })
  }
  const setPageSizeWithSearchParams = (itemsPerPage: string) => {
    if (itemsPerPage === '5') {
      searchParams.delete('itemsPerPage')
    } else {
      searchParams.set('itemsPerPage', itemsPerPage)
    }
    setPageSize(itemsPerPage)
    setSearchParams(searchParams, { replace: true })
  }
  const { id = '' } = useParams<{ id: 'string' }>()
  const { data: meData } = useMeQuery()
  const { data: deckData } = useGetDeckQuery({ id })
  const { data: cardsData } = useGetCardsInADeckQuery({
    currentPage: currentPage,
    id,
    itemsPerPage: +pageSize,
  })
  const userIsDeckAuthor = meData?.id === deckData?.userId
  const navigate = useNavigate()

  console.log(cardsData)

  //todo fix Link
  //todo fix search card
  return (
    <Page mt={'24px'}>
      <div className={s.root}>
        <div className={s.column}>
          <Typography
            as={Link}
            className={s.linkBack}
            onClick={(e: MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault()
              navigate(-1)
            }}
            to={'..'}
            variant={'body_2'}
          >
            <ArrowBackOutline fill={'white'} /> Back to Decks List
          </Typography>

          <Typography as={'h1'} className={s.deckName} variant={'h1'}>
            {deckData?.name}
          </Typography>
          {deckData?.cover && (
            <img alt={'deck image'} className={s.deckImage} src={deckData.cover} />
          )}
        </div>
        <div className={clsx(s.column, s.rightColumn)}>
          {userIsDeckAuthor && <AddCardModal />}
          {!userIsDeckAuthor && (
            <Button as={Link} to={`/learn/${id}`}>
              Learn to Deck
            </Button>
          )}
        </div>
      </div>
      <span className={s.textFieldWrapper}>
        <TextField placeholder={'Search card'} style={{ marginBottom: '30px' }} type={'search'} />
      </span>
      <DeckTable cards={cardsData?.items} />
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPageWithSearchParams}
        onPageSizeChange={setPageSizeWithSearchParams}
        pageSize={Number(pageSize)}
        selectOptions={pageSizeOptionsCards}
        totalCount={cardsData?.pagination?.totalItems ?? 1}
      />
    </Page>
  )
}
