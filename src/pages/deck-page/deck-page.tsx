import { MouseEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets'
import { AddCardModal } from '@/components/modal'
import { DeckTable } from '@/components/table'
import { Button, Page, TextField, Typography } from '@/components/ui'
import { useGetDeckQuery, useMeQuery } from '@/services'
import { clsx } from 'clsx'

import s from './deck-page.module.scss'

export const DeckPage = () => {
  const { id = '' } = useParams<{ id: 'string' }>()
  const { data: meData } = useMeQuery()
  const { data: deckData } = useGetDeckQuery({ id })

  const userIsDeckAuthor = meData?.id === deckData?.userId
  const navigate = useNavigate()

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
      <DeckTable />
    </Page>
  )
}
