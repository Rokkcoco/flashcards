import { ChangeEvent, ComponentPropsWithoutRef, ElementRef, KeyboardEvent, forwardRef } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'
import { clsx } from 'clsx'

import s from './slider.module.scss'

type Props = Omit<ComponentPropsWithoutRef<typeof SliderRadix.Root>, 'asChild' | 'onChange'>

export const Slider = forwardRef<ElementRef<typeof SliderRadix.Root>, Props>((props, ref) => {
  const { className, onValueChange, value, ...rest } = props
  //default Radix Slider Values
  const minRange = props.min ?? 0
  const maxRange = props.max ?? 100
  const stepChange = props.step ?? 1

  const disableOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'Tab') {
      e.preventDefault()
    }
  }

  const inputMinChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (value && onValueChange) {
      if (e.currentTarget.valueAsNumber <= value[1]) {
        onValueChange([e.currentTarget.valueAsNumber, value[1]])
      }
    }
  }

  const inputMaxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (value && onValueChange) {
      if (e.currentTarget.valueAsNumber >= value[0]) {
        onValueChange([value[0], e.currentTarget.valueAsNumber])
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
        className={clsx(s.root, className)}
        onValueChange={onValueChange}
        ref={ref}
        value={value}
        {...rest}
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

Slider.displayName = 'Slider'
