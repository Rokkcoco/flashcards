import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { CloseOutline } from '@/assets'
import { Card, Typography } from '@/components/ui'
import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

type Props = {
  controlButtons?: ReactNode
  onChange: (status: boolean) => void
  open: boolean
  trigger?: ReactNode
} & Omit<ComponentPropsWithoutRef<typeof Dialog.Root>, 'onOpenChange' | 'open'> &
  ComponentPropsWithoutRef<'div'>

export const Modal = forwardRef<ElementRef<typeof Dialog.Content>, Props>((props, ref) => {
  const { children, controlButtons, onChange, title, trigger, ...rest } = props

  return (
    <Dialog.Root onOpenChange={onChange} {...rest}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content asChild className={s.contentBox} ref={ref}>
          <Card>
            {title && (
              <div className={s.header}>
                <Dialog.Title asChild>
                  <Typography as={'h2'} variant={'h2'}>
                    {title}
                  </Typography>
                </Dialog.Title>
                <Dialog.Close className={s.closeButton}>
                  <CloseOutline />
                </Dialog.Close>
              </div>
            )}
            <div className={s.content}>{children}</div>
            {controlButtons && <div className={s.controlButtons}>{controlButtons}</div>}
          </Card>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
})

Modal.displayName = 'Modal'
