import { ReactNode } from 'react'

import { CloseOutline } from '@/assets'
import { Button } from '@/components/ui'
import { Typography } from '@/components/ui/typography'
import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'
// type ModalProps = {
//   value: string
// }
type ModalProps = {
  children: ReactNode
}

export const Modal = ({ children }: ModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant={'primary'}>Kekw</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
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
}
