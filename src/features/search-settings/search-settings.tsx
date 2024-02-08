import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { TrashOutline } from '@/assets'
import { Button, Slider, TabItem, Tabs, TextField } from '@/components/ui'
import { AddDeckModal } from '@/features'

import s from './search-settings.module.scss'

export const SearchSettings = () => {
  const [tabsValue, setTabsValue] = useState('')
  const [sliderValue, setSliderValue] = useState([0, 62])
  const minMaxSliderValues = [0, 62]
  const [searchValueTextField, setSearchValueTextField] = useState('')
  const [searchParams, setSearchParams] = useSearchParams({
    cardOwner: '',
    maxCards: '10',
    minCards: '1',
    search: '',
  })

  const onValueChangeTextFieldWithSearchParams = (value: string) => {
    searchParams.set('search', value)
    setSearchParams(searchParams)
    setSearchValueTextField(value)
  }

  const setTabsValueWithSearchParams = (value: string) => {
    searchParams.set('cardOwner', value)
    setSearchParams(searchParams)
    setTabsValue(value)
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
          <TabItem value={'myCards'}>My Cards</TabItem>
          <TabItem value={''}>All Cards</TabItem>
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
  )
}
