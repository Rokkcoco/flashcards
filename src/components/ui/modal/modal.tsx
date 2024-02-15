import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { CloseOutline } from '@/assets'
import { Card, Typography } from '@/components/ui'
import * as Dialog from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

import s from './modal.module.scss'

type Props = {
  controlButtons?: ReactNode
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof Dialog.Root> &
  Omit<ComponentPropsWithoutRef<'div'>, 'onChange'>

export const Modal = forwardRef<ElementRef<typeof Dialog.Content>, Props>((props, ref) => {
  const { children, className, controlButtons, title, trigger, ...rest } = props

  const classNames = {
    closeButton: s.closeButton,
    content: clsx(s.content, className),
    contentBox: s.contentBox,
    controlButtons: s.controlButtons,
    header: s.header,
    overlay: s.overlay,
  }

  return (
    <Dialog.Root {...rest}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={classNames.overlay} />
        <Dialog.Content asChild className={classNames.contentBox} ref={ref}>
          <Card>
            {title && (
              <div className={classNames.header}>
                <Dialog.Title asChild>
                  <Typography as={'h2'} variant={'h2'}>
                    {title}
                  </Typography>
                </Dialog.Title>
                <Dialog.Close className={classNames.closeButton}>
                  <CloseOutline />
                </Dialog.Close>
              </div>
            )}
            <div className={classNames.content}>{children}</div>
            {controlButtons && <div className={classNames.controlButtons}>{controlButtons}</div>}
          </Card>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
})

Modal.displayName = 'Modal'
