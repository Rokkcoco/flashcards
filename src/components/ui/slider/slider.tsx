import { ChangeEvent, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'

type Props = {} & Omit<ComponentPropsWithoutRef<typeof SliderRadix.Root>, 'asChild'>

export const Slider = forwardRef<ElementRef<typeof SliderRadix.Root>, Props>((props, ref) => {
  const { max, min, onValueChange, value, ...rest } = props
  const minRange = min ? min : 0
  const maxRange = max ? max : 100
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (value) {
      if (
        (e.currentTarget.id === '1' && +e.currentTarget.value >= value[0]) ||
        (e.currentTarget.id === '0' && +e.currentTarget.value <= value[1])
      ) {
        onValueChange &&
          onValueChange(
            value.map((t, i) => (i === +e.currentTarget.id ? e.currentTarget.valueAsNumber : t))
          )
      }
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <input
        id={'0'}
        min={minRange}
        onChange={onChangeHandler}
        style={{ background: 'black' }}
        type={'number'}
        value={value?.[0]}
      />

      <SliderRadix.Root
        {...rest}
        className={s.root}
        max={max}
        min={min}
        onValueChange={onValueChange}
        ref={ref}
        value={value}
      >
        <SliderRadix.Track className={s.track}>
          <SliderRadix.Range className={s.range} />
        </SliderRadix.Track>
        <SliderRadix.Thumb aria-label={'Volume min'} className={s.thumb} />
        <SliderRadix.Thumb aria-label={'Volume max'} className={s.thumb} />
      </SliderRadix.Root>
      <input
        id={'1'}
        max={maxRange}
        onChange={onChangeHandler}
        style={{ background: 'black' }}
        type={'number'}
        value={value?.[1]}
      />
    </div>
  )
})
