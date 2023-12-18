import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'
type Props = {} & ComponentPropsWithoutRef<typeof SliderRadix.Root>

export const Slider = forwardRef<ElementRef<typeof SliderRadix.Root>, Props>((props, ref) => {
  const { ...rest } = props

  return (
    <SliderRadix.Root {...rest} className={s.root} ref={ref}>
      <SliderRadix.Track className={s.track}>
        <SliderRadix.Range className={s.range} />
      </SliderRadix.Track>
      <SliderRadix.Thumb aria-label={'Volume min'} className={s.thumb} />
      <SliderRadix.Thumb aria-label={'Volume max'} className={s.thumb} />
    </SliderRadix.Root>
  )
})
