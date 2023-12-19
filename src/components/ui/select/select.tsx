import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { ArrowIosDownOutline } from '@/assets'
import * as Label from '@radix-ui/react-label'
import * as SelectRadix from '@radix-ui/react-select'

import s from './select.module.scss'

type SelectItemProps = {} & ComponentPropsWithoutRef<typeof SelectRadix.Item>

const SelectItem = forwardRef<ElementRef<typeof SelectRadix.Item>, SelectItemProps>(
  (props, ref) => {
    const { children, ...rest } = props

    return (
      <SelectRadix.Item className={s.SelectItem} {...rest} ref={ref}>
        <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
        <SelectRadix.ItemIndicator className={s.SelectItemIndicators}></SelectRadix.ItemIndicator>
      </SelectRadix.Item>
    )
  }
)

type Props = {
  options: string[]
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>

export const Select = forwardRef<ElementRef<typeof SelectRadix.Root>, Props>((props, ref) => {
  const { ...rest } = props

  return (
    <div className={s.container}>
      <Label.Root>
        <SelectRadix.Root {...rest}>
          <SelectRadix.Trigger aria-label={'Food'} className={s.SelectTrigger}>
            <SelectRadix.Value placeholder={'Select a fruit…'} />
            <SelectRadix.Icon asChild className={s.SelectIcon}>
              <ArrowIosDownOutline />
            </SelectRadix.Icon>
          </SelectRadix.Trigger>
          <SelectRadix.Portal>
            <SelectRadix.Content
              className={s.SelectContent}
              position={'popper'}
              ref={ref}
              sideOffset={5}
            >
              <SelectRadix.Viewport className={s.SelectViewport}>
                <SelectItem value={'apple'}>Apple</SelectItem>
                <SelectItem value={'banana'}>Banana</SelectItem>
                <SelectItem value={'blueberry'}>Blueberry</SelectItem>
                <SelectItem value={'grapes'}>Grapes</SelectItem>
                <SelectItem value={'pineapple'}>Pineapple</SelectItem>
              </SelectRadix.Viewport>
            </SelectRadix.Content>
          </SelectRadix.Portal>
        </SelectRadix.Root>
      </Label.Root>
    </div>
  )
})
