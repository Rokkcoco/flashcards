import { ReactNode } from 'react'

import { Button } from '@/components/ui'
import * as Dialog from '@radix-ui/react-dialog'
// type ModalProps = {
//   value: string
// }
type ModalProps = {
  children: ReactNode
}

export const Modal = ({ children }: ModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant={'primary'}>Kekw</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Best boobs</Dialog.Title>
          <Dialog.Description>You cant find nothing better then this</Dialog.Description>

          <Dialog.Close>
            <Button variant={'primary'}>Sorry, im poor</Button>
          </Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
