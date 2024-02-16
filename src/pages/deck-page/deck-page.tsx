import { Link, useLocation, useParams } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets'
import { Button, Page, TextField, Typography } from '@/components/ui'
import { AddCardModal } from '@/features/add-card-modal'
import { DeckTable } from '@/features/deck-table'
import { useGetDeckQuery, useMeQuery } from '@/services'
import { clsx } from 'clsx'

import s from './deck-page.module.scss'

export const DeckPage = () => {
  const { id = '' } = useParams<{ id: 'string' }>()
  const { data: meData } = useMeQuery()
  const { data: deckData } = useGetDeckQuery({ id })
  //todo try with location for link
  const location = useLocation()
  const userIsDeckAuthor = meData?.id === deckData?.userId

  //todo fix Link
  //todo fix search card
  return (
    <Page mt={'24px'}>
      <div className={s.root}>
        <div className={s.column}>
          <Typography as={Link} className={s.linkBack} to={'/'} variant={'body_2'}>
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

      <DeckTable />
    </Page>
  )
}
