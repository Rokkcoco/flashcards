import { ComponentPropsWithoutRef, ElementRef, KeyboardEvent, forwardRef, useId } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'
import { clsx } from 'clsx'

import s from './slider.module.scss'

type Props = Omit<ComponentPropsWithoutRef<typeof SliderRadix.Root>, 'asChild' | 'onChange'>

export const Slider = forwardRef<ElementRef<typeof SliderRadix.Root>, Props>((props, ref) => {
  const { className, max, min, onValueChange, value, ...rest } = props
  const stepChange = props.step ?? 1

  const inputMinID = useId()
  const inputMaxID = useId()
  const inputMinElement = document.getElementById(inputMinID) as HTMLInputElement | null
  const inputMaxElement = document.getElementById(inputMaxID) as HTMLInputElement | null

  //todo react type number
  //todo onValueCommit
  const inputElementKeyDown = (e: KeyboardEvent<HTMLInputElement>, input: 'left' | 'right') => {
    if (e.key === ',' || e.key === 'e' || e.key === '-' || e.key === '.') {
      e.preventDefault()
    }
    if (input === 'left' && e.key === 'Backspace' && inputMinElement?.value.length === 1) {
      inputMinElement.value = ''
    }
    if (input === 'right' && e.key === 'Backspace' && inputMaxElement?.value.length === 1) {
      inputMaxElement.value = ''
    }
    if (input === 'left' && !inputMinElement?.value.length && e.key === '0') {
      e.preventDefault()
    }
    if (input === 'right' && !inputMaxElement?.value.length && e.key === '0') {
      e.preventDefault()
    }
    if (input === 'left' && e.key === 'Enter') {
      e.currentTarget.blur()
    }
    if (input === 'right' && e.key === 'Enter') {
      e.currentTarget.blur()
    }
  }
  const onChangeInput = (newValue: number, side: 'left' | 'right') => {
    const temp = [...(value as number[])]
    const clampedValue = Math.min(newValue, max ?? 100)

    if (side === 'left') {
      temp[0] = clampedValue
    } else {
      temp[1] = clampedValue
    }
    onValueChange?.(temp)
  }

  const onBlurValidate = () => {
    const temp = [...(value as number[])]

    if (temp[0] > temp[1]) {
      onValueChange?.([temp[1], temp[0]])
    }
  }

  return (
    <div className={s.container}>
      <div>
        <input
          className={s.input}
          id={inputMinID}
          onBlur={onBlurValidate}
          onChange={e => onChangeInput(+e.currentTarget.value, 'left')}
          onKeyDown={e => inputElementKeyDown(e, 'left')}
          step={stepChange}
          type={'number'}
          value={value?.[0]}
        />
      </div>

      <SliderRadix.Root
        className={clsx(s.root, className)}
        max={max ?? 100}
        min={min ?? 0}
        onValueChange={onValueChange}
        ref={ref}
        value={[value?.[0] ?? 0, value?.[1] ?? 100]}
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
          id={inputMaxID}
          onBlur={onBlurValidate}
          onChange={e => onChangeInput(+e.currentTarget.value, 'right')}
          onKeyDown={e => inputElementKeyDown(e, 'right')}
          step={stepChange}
          type={'number'}
          value={value?.[1]}
        />
      </div>
    </div>
  )
})

Slider.displayName = 'Slider'
