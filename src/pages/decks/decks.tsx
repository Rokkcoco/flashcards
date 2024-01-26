import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Edit2Outline, ImageOutline, PlayCircleOutline, TrashOutline } from '@/assets'
import { useDebounce } from '@/common/hooks'
import { Button, Checkbox, Modal, Page, Slider, TabItem, Tabs, TextField } from '@/components/ui'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table'
import { Typography } from '@/components/ui/typography/typography'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDeckQuery,
  useGetDecksQuery,
} from '@/services/decks'
import { CheckedState } from '@radix-ui/react-checkbox'

import s from './decks.module.scss'

export const Decks = () => {
  const [searchParams, setSearchParams] = useSearchParams({ name: '', page: '1' })
  const page = Number(searchParams.get('page'))
  const name = searchParams.get('name')
  const setPage = (page: number) => {
    searchParams.set('page', page.toString())
    setSearchParams(searchParams)
  }

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

  const minMaxSliderValues = [0, 62]
  const [sliderValue, setSliderValue] = useState([0, 62])
  const [modalOpenStatus, setModalOpenStatus] = useState(false)
  const [tabsValue, setTabsValue] = useState('allCards')
  const [textFieldValueForNewDeck, setTextFieldValueForNewDeck] = useState('')
  const [searchValueTextField, setSearchValueTextField] = useState('')
  const [checkboxValueForNewDeck, setCheckboxValueForNewDeck] = useState<CheckedState>(false)
  const searchName = useDebounce(searchValueTextField, 1000)
  /*  const setName = (name: string) => {
    if (name === '') {
      searchParams.delete('name')
    } else {
      searchParams.set('name', name)
    }
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }*/
  const { data, error, isLoading } = useGetDecksQuery({
    currentPage: page || 1,
    itemsPerPage: 5,
    minCardsCount: 3,
    name: searchName ?? undefined,
  })
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

  const AddDeckModal = () => {
    return (
      <Modal
        controlButtons={
          <>
            <Button>Add New Pack</Button>
            <Button variant={'secondary'}>Cancel</Button>
          </>
        }
        onOpenChange={setModalOpenStatus}
        open={modalOpenStatus}
        title={'Add New Deck'}
        trigger={<Button>Add New Deck</Button>}
      >
        <TextField
          label={'Name Pack'}
          onValueChange={setTextFieldValueForNewDeck}
          placeholder={'Minimum X symbols'}
          value={textFieldValueForNewDeck}
        />
        <Button fullWidth variant={'secondary'}>
          <ImageOutline />
          Upload Image
        </Button>
        <Checkbox
          checked={checkboxValueForNewDeck}
          label={'Private pack'}
          onCheckedChange={setCheckboxValueForNewDeck}
        />
      </Modal>
    )
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
      <div className={s.filter}>
        <TextField
          onInputClear={() => setSearchValueTextField('')}
          onValueChange={setSearchValueTextField}
          placeholder={'Search decks'}
          type={'search'}
          value={searchValueTextField}
        />
        <div className={s.tabs}>
          <Tabs onValueChange={setTabsValue} value={tabsValue}>
            <TabItem value={'myCards'}>My Cards</TabItem>
            <TabItem value={'allCards'}>All Cards</TabItem>
          </Tabs>
        </div>
        <Slider
          max={minMaxSliderValues[1]}
          min={minMaxSliderValues[0]}
          onValueChange={setSliderValue}
          value={sliderValue}
        />
        <AddDeckModal />
        <Button variant={'secondary'}>
          <TrashOutline />
          Clear Field
        </Button>
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
                      console.log('click')
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
