import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { CloseOutline } from '@/assets'
import { TODO } from '@/common'
import { Card, Typography } from '@/components/ui'
import { DevTool } from '@hookform/devtools'
import * as Dialog from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

import s from './modal-form.module.scss'

type Props = {
  control?: TODO
  controlButtons?: ReactNode
  formSubmit?: () => void
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof Dialog.Root> &
  Omit<ComponentPropsWithoutRef<'div'>, 'onChange'>

export const ModalForm = forwardRef<ElementRef<typeof Dialog.Content>, Props>((props, ref) => {
  const { children, className, control, controlButtons, formSubmit, title, trigger, ...rest } =
    props

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
            <form onSubmit={formSubmit}>
              {control && <DevTool control={control} />}
              <div className={classNames.content}>{children}</div>
              {controlButtons && <div className={classNames.controlButtons}>{controlButtons}</div>}
            </form>
          </Card>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
})

ModalForm.displayName = 'ModalForm'
