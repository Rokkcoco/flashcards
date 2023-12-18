import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { CloseOutline } from '@/assets'
import Card from '@/components/ui/card/card'
import Typography from '@/components/ui/typography/typography'
import * as Dialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

type Props = {
  controlButtons?: ReactNode
  trigger?: ReactNode
} & ComponentPropsWithoutRef<'div'> &
  ComponentPropsWithoutRef<typeof Dialog.Root>
//что тут лучше ComponentPropsWithoutRef или ComponentProps

//тянем Content, а не Root, ведь в руте нет рефа?
export const Modal = forwardRef<ElementRef<typeof Dialog.Content>, Props>((props, ref) => {
  const { children, controlButtons, open, title, trigger, ...rest } = props

  return (
    <Dialog.Root open={open} style={{ border: 'none' }} {...rest}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      {open && (
        <Dialog.Portal forceMount>
          <Dialog.Overlay className={s.overlay} />
          <Dialog.Content className={s.contentBox} ref={ref}>
            <Card>
              {title && (
                <div className={s.header}>
                  <Dialog.Title asChild style={{ margin: '0px' }}>
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
      )}
    </Dialog.Root>
  )
})
//нужен ли нам radix title или хватит типографии h2 для доступности
