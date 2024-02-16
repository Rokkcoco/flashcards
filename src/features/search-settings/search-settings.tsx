import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { TrashOutline } from '@/assets'
import { Button, Slider, TabItem, Tabs, TextField } from '@/components/ui'
import { AddDeckModal } from '@/features'
import { useGetMinMaxDeckCardsQuery, useMeQuery } from '@/services'

import s from './search-settings.module.scss'

export const SearchSettings = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const name = searchParams.get('name')
  const minCards = searchParams.get('minCards')
  const maxCards = searchParams.get('maxCards')
  const deckOwner = searchParams.get('authorId')
  const { data: minMaxCardsData } = useGetMinMaxDeckCardsQuery()
  const [tabsValue, setTabsValue] = useState(deckOwner ?? '')

  console.log('minMaxCardsData', minMaxCardsData)
  console.log('minCards', minCards)
  // const [sliderValue, setSliderValue] = useState([
  //   minCards ? +minCards : 0,
  //   maxCards ? +maxCards : 0,
  // ])
  // const [minMaxSliderValues, setMinMaxSliderValues] = useState([0, 0])
  const [sliderValue, setSliderValue] = useState([
    minCards || minMaxCardsData?.min,
    maxCards || minMaxCardsData?.max,
  ])

  console.log(sliderValue)
  const [minMaxSliderValues, _] = useState([minMaxCardsData?.min, minMaxCardsData?.max])

  const [searchValueTextField, setSearchValueTextField] = useState(name ?? '')

  const { data: meData } = useMeQuery()

  //todo fix useeffect

  // useEffect(() => {
  //   if (minMaxCardsData) {
  //     setMinMaxSliderValues([minMaxCardsData.min, minMaxCardsData.max])
  //     if (sliderValue[0] === 0) {
  //       setSliderValue([minMaxCardsData.min, sliderValue[1]])
  //     }
  //     if (sliderValue[1] === 0) {
  //       setSliderValue([sliderValue[0], minMaxCardsData.max])
  //     }
  //   }
  // }, [minMaxCardsData])

  const onValueChangeTextFieldWithSearchParams = (name: string) => {
    if (!name) {
      searchParams.delete('name')
    } else {
      searchParams.set('name', name)
    }
    setSearchParams(searchParams)
    setSearchValueTextField(name)
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
    setSearchParams(searchParams)
    setTabsValue(value)
  }
  //todo fix slider Max value is zero then nothing set
  const setSliderValueWithSearchParams = (values: number[]) => {
    if (values[0] !== sliderValue[0]) {
      searchParams.set('minCards', values[0].toString())
    }
    if (values[1] !== sliderValue[1]) {
      searchParams.set('maxCards', values[1].toString())
    }
    if (values[0] === minMaxSliderValues[0]) {
      searchParams.delete('minCards')
    }
    if (values[1] === minMaxSliderValues[1]) {
      searchParams.delete('maxCards')
    }
    setSearchParams(searchParams)
    setSliderValue(values)
  }

  const clearSearchParams = () => {
    setTabsValue('')
    setSearchValueTextField('')
    setSliderValue(minMaxSliderValues)
    setSearchParams({})
  }

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
          <TabItem value={meData?.id ?? ''}>My Cards</TabItem>
          <TabItem value={''}>All Cards</TabItem>
        </Tabs>
      </div>
      <Slider
        max={minMaxSliderValues[1]}
        min={minMaxSliderValues[0]}
        onValueChange={setSliderValueWithSearchParams}
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
