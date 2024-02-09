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
  const [searchParams, setSearchParams] = useSearchParams()

  const onValueChangeTextFieldWithSearchParams = (name: string) => {
    if (!name) {
      searchParams.delete('name')
    } else {
      searchParams.set('name', name)
    }
    setSearchParams(searchParams)
    setSearchValueTextField(name)
  }

  const setTabsValueWithSearchParams = (value: string) => {
    if (!value) {
      searchParams.delete('cardOwner')
    } else {
      searchParams.set('cardOwner', value)
    }

    setSearchParams(searchParams)
    setTabsValue(value)
  }

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
          <TabItem value={'myCards'}>My Cards</TabItem>
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
