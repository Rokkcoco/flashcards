import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { CloseOutline } from '@/assets'
import { Button } from '@/components/ui'
import { Typography } from '@/components/ui/typography'
import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

type Props = {
  defaultOpen: boolean
  modal: boolean
  onOpenChange: (open: boolean) => void
  open: boolean
} & ComponentPropsWithoutRef<'div'>

export const Modal = forwardRef<ElementRef<typeof Dialog.Root>, Props>((props, ref) => {
  const { children, ...rest } = props

  return (
    <Dialog.Root {...rest}>
      <Dialog.Trigger>
        <Button variant={'primary'}>Kekw</Button>
      </Dialog.Trigger>
      <Dialog.Portal forceMount>
        <Dialog.Overlay />
        <Dialog.Content ref={ref}>
          <div className={s.header}>
            <Dialog.Title asChild>
              <Typography as={'h2'} variant={'h2'}>
                Title
              </Typography>
            </Dialog.Title>
            <Dialog.Close className={s.closeButton}>
              <CloseOutline />
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
})
//todo: что тут лучше ComponentPropsWithoutRef или ComponentProps
