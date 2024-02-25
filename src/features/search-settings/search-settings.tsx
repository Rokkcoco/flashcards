import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { TrashOutline } from '@/assets'
import { AddDeckModal } from '@/components/modal'
import { Button, Slider, TabItem, Tabs, TextField } from '@/components/ui'
import { useGetMinMaxDeckCardsQuery, useMeQuery } from '@/services'

import s from './search-settings.module.scss'
type Props = {
  onClear: () => void
  onSearch: () => void
}
export const SearchSettings = ({ onClear, onSearch }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [onSearchTrigger, setOnSearchTrigger] = useState(false)
  const name = searchParams.get('name')
  const minCards = searchParams.get('minCards')
  const maxCards = searchParams.get('maxCards')
  const deckOwner = searchParams.get('authorId')
  const { data: minMaxCardsData } = useGetMinMaxDeckCardsQuery()
  const [tabsValue, setTabsValue] = useState(deckOwner ?? '')

  const [sliderValue, setSliderValue] = useState([
    ((minCards && +minCards) || minMaxCardsData?.min) ?? 0,
    ((maxCards && +maxCards) || minMaxCardsData?.max) ?? 0,
  ])

  const [minMaxSliderValues, _] = useState([minMaxCardsData?.min ?? 0, minMaxCardsData?.max ?? 0])

  const [searchValueTextField, setSearchValueTextField] = useState(name ?? '')

  const { data: meData } = useMeQuery()

  const onValueChangeTextFieldWithSearchParams = (name: string) => {
    if (!name) {
      searchParams.delete('name')
    } else {
      searchParams.set('name', name)
    }
    setSearchParams(searchParams)
    setSearchValueTextField(name)
    setOnSearchTrigger(true)
  }
  //todo fix TabsOwner
  const setTabsValueWithSearchParams = (value: string) => {
    if (meData) {
      if (!value) {
        searchParams.delete('authorId')
      } else {
        searchParams.set('authorId', meData.id)
      }
    }
    setTabsValue(value)
    setSearchParams(searchParams)
    setOnSearchTrigger(true)
  }

  const setSliderValueWithSearchParamsOnCommit = (values: number[]) => {
    if (values[0] !== minMaxSliderValues[0]) {
      searchParams.set('minCards', values[0].toString())
    }
    if (values[1] !== minMaxSliderValues[1]) {
      searchParams.set('maxCards', values[1].toString())
    }
    if (values[0] === minMaxSliderValues[0]) {
      searchParams.delete('minCards')
    }
    if (values[1] === minMaxSliderValues[1]) {
      searchParams.delete('maxCards')
    }
    setSliderValue(values)
    setSearchParams(searchParams)
    setOnSearchTrigger(true)
  }
  const clearSearchParams = () => {
    setTabsValue('')
    setSearchValueTextField('')
    setSliderValue(minMaxSliderValues)
    onClear()
    setSearchParams({})
  }

  useEffect(() => {
    if (onSearchTrigger) {
      onSearch()
      setOnSearchTrigger(false)
    }
  }, [onSearchTrigger])

  useEffect(() => {
    if (name !== searchValueTextField && name !== null) {
      setSearchValueTextField(name)
    }
    if (name === null) {
      setSearchValueTextField('')
    }
  }, [name])

  useEffect(() => {
    if (sliderValue[0] !== Number(minCards) && minCards !== null) {
      setSliderValue([Number(minCards), sliderValue[1]])
    }
    if (minCards === null) {
      setSliderValue([minMaxCardsData?.min ?? 0, sliderValue[1]])
    }
  }, [minCards])

  useEffect(() => {
    if (sliderValue[1] !== Number(maxCards) && maxCards !== null) {
      setSliderValue([sliderValue[0], Number(minCards)])
    }
    if (maxCards === null) {
      setSliderValue([sliderValue[0], minMaxCardsData?.max ?? 0])
    }
  }, [maxCards])

  useEffect(() => {
    if (deckOwner !== tabsValue && deckOwner !== null) {
      setTabsValue(deckOwner)
    }
    if (deckOwner === null) {
      setTabsValue('')
    }
  }, [deckOwner])

  return (
    <div className={s.filter}>
      <TextField
        onInputClear={() => onValueChangeTextFieldWithSearchParams('')}
        onValueChange={onValueChangeTextFieldWithSearchParams}
        placeholder={'Search decks'}
        type={'search'}
        value={searchValueTextField}
      />
      <div className={s.tabs}>
        <Tabs onValueChange={setTabsValueWithSearchParams} value={tabsValue}>
          <TabItem value={meData?.id ?? 'me'}>My Cards</TabItem>
          <TabItem value={''}>All Cards</TabItem>
        </Tabs>
      </div>
      <Slider
        max={minMaxSliderValues[1]}
        min={minMaxSliderValues[0]}
        onValueChange={setSliderValue}
        onValueCommit={setSliderValueWithSearchParamsOnCommit}
        value={sliderValue}
      />
      <AddDeckModal />
      <Button onClick={clearSearchParams} variant={'secondary'}>
        <TrashOutline />
        Clear Field
      </Button>
    </div>
  )
}
