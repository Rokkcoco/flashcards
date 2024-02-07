import { useState } from 'react'

import { TrashOutline } from '@/assets'
import { Button, Slider, TabItem, Tabs, TextField } from '@/components/ui'
import { AddDeckModal } from '@/features'

import s from './search-settings.module.scss'

export const SearchSettings = () => {
  const [tabsValue, setTabsValue] = useState('allCards')
  const [sliderValue, setSliderValue] = useState([0, 62])
  const minMaxSliderValues = [0, 62]
  const [searchValueTextField, setSearchValueTextField] = useState('')

  return (
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
  )
}
