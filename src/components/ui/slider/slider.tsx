import {
  ComponentPropsWithoutRef,
  ElementRef,
  KeyboardEvent,
  forwardRef,
  useId,
  useRef,
} from 'react'

import * as SliderRadix from '@radix-ui/react-slider'
import { clsx } from 'clsx'

import s from './slider.module.scss'

type Props = Omit<ComponentPropsWithoutRef<typeof SliderRadix.Root>, 'asChild' | 'onChange'>

export const Slider = forwardRef<ElementRef<typeof SliderRadix.Root>, Props>((props, ref) => {
  const {
    className,
    max = 100,
    min = 0,
    onValueChange,
    step = 1,
    value = [0, 100],
    ...rest
  } = props

  const inputMinID = useId()
  const inputMaxID = useId()

  const inputMinElement = useRef<HTMLInputElement>(null)
  const inputMaxElement = useRef<HTMLInputElement>(null)

  //todo onValueCommit

  const inputElementKeyDown = (e: KeyboardEvent<HTMLInputElement>, input: 'left' | 'right') => {
    if (e.key === ',' || e.key === 'e' || e.key === '-' || e.key === '.') {
      e.preventDefault()
    }
    if (input === 'left' && e.key === 'Backspace' && inputMinElement?.current?.value.length === 1) {
      inputMinElement.current.value = ''
    }
    if (
      input === 'right' &&
      e.key === 'Backspace' &&
      inputMaxElement?.current?.value.length === 1
    ) {
      inputMaxElement.current.value = ''
    }
    if (input === 'left' && !inputMinElement?.current?.value.length && e.key === '0') {
      e.preventDefault()
    }
    if (input === 'right' && !inputMaxElement?.current?.value.length && e.key === '0') {
      e.preventDefault()
    }
    if (input === 'left' && e.key === 'Enter' && inputMinElement?.current?.value !== '') {
      e.currentTarget.blur()
    }
    if (input === 'right' && e.key === 'Enter' && inputMinElement?.current?.value !== '') {
      e.currentTarget.blur()
    }
  }

  const onChangeInput = (newValue: number, side: 'left' | 'right') => {
    if (value === undefined) {
      return
    }
    const temp = [...value]
    const clampedValue = Math.min(newValue, max ?? 100)

    if (side === 'left') {
      temp[0] = clampedValue
    } else {
      temp[1] = clampedValue
    }
    onValueChange?.(temp)
  }

  const onBlurValidate = () => {
    if (value === undefined) {
      return
    }
    const temp = [...value]

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
          ref={inputMinElement}
          step={step}
          type={'number'}
          value={value[0]}
        />
      </div>

      <SliderRadix.Root
        className={clsx(s.root, className)}
        max={max}
        min={min}
        onValueChange={onValueChange}
        ref={ref}
        step={step}
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
          id={inputMaxID}
          onBlur={onBlurValidate}
          onChange={e => onChangeInput(+e.currentTarget.value, 'right')}
          onKeyDown={e => inputElementKeyDown(e, 'right')}
          ref={inputMaxElement}
          step={step}
          type={'number'}
          value={value[1]}
        />
      </div>
    </div>
  )
})

Slider.displayName = 'Slider'
