import { ChangeEvent, ComponentPropsWithoutRef, ElementRef, KeyboardEvent, forwardRef } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'
import { clsx } from 'clsx'

import s from './slider.module.scss'

type Props = {
  onChange: (number: number[]) => void
  value: number[]
} & Omit<
  ComponentPropsWithoutRef<typeof SliderRadix.Root>,
  'asChild' | 'onChange' | 'onValueChange' | 'value'
>

export const Slider = forwardRef<ElementRef<typeof SliderRadix.Root>, Props>((props, ref) => {
  const { className, onChange, value, ...rest } = props
  //default Radix Slider Values
  const minRange = props.min ? props.min : 0
  const maxRange = props.max ? props.max : 100
  const stepChange = props.step ? props.step : 1

  const disableOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'Tab') {
      e.preventDefault()
    }
  }

  const inputMinChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (value && onChange) {
      if (e.currentTarget.valueAsNumber <= value[1]) {
        onChange([e.currentTarget.valueAsNumber, value[1]])
      }
    }
  }

  const inputMaxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (value && onChange) {
      if (e.currentTarget.valueAsNumber >= value[0]) {
        onChange([value[0], e.currentTarget.valueAsNumber])
      }
    }
  }

  return (
    <div className={s.container}>
      <div>
        <input
          className={s.input}
          min={minRange}
          onChange={inputMinChangeHandler}
          onKeyDown={disableOnKeyPress}
          step={stepChange}
          type={'number'}
          value={value?.[0]}
        />
      </div>

      <SliderRadix.Root
        {...rest}
        className={clsx(s.root, className)}
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
          onChange={inputMaxChangeHandler}
          onKeyDown={disableOnKeyPress}
          step={stepChange}
          type={'number'}
          value={value?.[1]}
        />
      </div>
    </div>
  )
})
