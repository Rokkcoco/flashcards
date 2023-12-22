import { ChangeEvent, ComponentPropsWithoutRef, ElementRef, KeyboardEvent, forwardRef } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'

type Props = {
  onChange: (number: number[]) => void
  value: number[]
} & Omit<
  ComponentPropsWithoutRef<typeof SliderRadix.Root>,
  'asChild' | 'onChange' | 'onValueChange' | 'value'
>

export const Slider = forwardRef<ElementRef<typeof SliderRadix.Root>, Props>((props, ref) => {
  const { onChange, value, ...rest } = props
  //default Radix Slider Values
  const minRange = props.min ? props.min : 0
  const maxRange = props.max ? props.max : 100
  const stepChange = props.step ? props.step : 1

  const disableOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'Tab') {
      e.preventDefault()
    }
  }
  //todo 2 handlers
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (value && onChange) {
      if (e.currentTarget.name === 'maxInput' && e.currentTarget.valueAsNumber >= value[0]) {
        onChange([value[0], e.currentTarget.valueAsNumber])
      }
      if (e.currentTarget.name === 'minInput' && e.currentTarget.valueAsNumber <= value[1]) {
        onChange([e.currentTarget.valueAsNumber, value[1]])
      }
    }
  }

  return (
    <div className={s.container}>
      <div>
        <input
          className={s.input}
          min={minRange}
          name={'minInput'}
          onChange={onChangeHandler}
          onKeyDown={disableOnKeyPress}
          step={stepChange}
          type={'number'}
          value={value?.[0]}
        />
      </div>

      <SliderRadix.Root
        {...rest}
        className={s.root}
        onValueChange={onChange}
        ref={ref}
        value={value}
      >
        <SliderRadix.Track className={s.track}>
          <SliderRadix.Range className={s.range} />
        </SliderRadix.Track>
        <SliderRadix.Thumb aria-label={'Range min'} className={s.thumb} />
        <SliderRadix.Thumb aria-label={'Range max'} className={s.thumb} />
      </SliderRadix.Root>
      <div>
        <input
          className={s.input}
          max={maxRange}
          name={'maxInput'}
          onChange={onChangeHandler}
          onKeyDown={disableOnKeyPress}
          step={stepChange}
          type={'number'}
          value={value?.[1]}
        />
      </div>
    </div>
  )
})
