import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Typography } from '@/components/ui'
import * as LabelRadix from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from './label.module.scss'

type Props = ComponentPropsWithoutRef<typeof LabelRadix.Root> & ComponentPropsWithoutRef<'label'>

export const Label = forwardRef<ElementRef<typeof LabelRadix.Root>, Props>((props, ref) => {
  const { children, className, ...rest } = props

  const classNames = {
    label: clsx(s.label, className),
  }

  return (
    <LabelRadix.Root {...rest} asChild className={classNames.label} ref={ref}>
      <Typography as={'label'} variant={'body_2'}>
        {children}
      </Typography>
    </LabelRadix.Root>
  )
})
