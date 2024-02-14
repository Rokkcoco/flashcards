import { Link, useLocation, useParams } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets'
import { Button, Page, TextField, Typography } from '@/components/ui'
import { AddCardModal } from '@/features/add-card-modal'
import { DeckTable } from '@/features/deck-table'
import { useGetDeckQuery, useMeQuery } from '@/services'

import s from './deck-page.module.scss'

export const DeckPage = () => {
  const { id = '' } = useParams<{ id: 'string' }>()
  const { data: meData } = useMeQuery()
  const { data: deckData } = useGetDeckQuery({ id })
  //todo try with location for link
  const location = useLocation()
  const userIsDeckAuthor = meData?.id === deckData?.userId

  //todo fix Link
  return (
    <Page mt={'24px'}>
      <div className={s.root}>
        <Typography as={Link} className={s.linkBack} to={'/'} variant={'body_2'}>
          <ArrowBackOutline fill={'white'} /> Back to Decks List
        </Typography>

        <Typography as={'h1'} className={s.deckName} variant={'h1'}>
          {deckData?.name}
        </Typography>
        {userIsDeckAuthor && <AddCardModal />}
        {!userIsDeckAuthor && (
          <Button as={Link} className={s.deckButton} to={`/learn/${id}`}>
            Learn to Deck
          </Button>
        )}
        <div className={s.textFieldWrapper}>
          <TextField type={'search'} />
        </div>
      </div>
      <DeckTable />
    </Page>
  )
}
