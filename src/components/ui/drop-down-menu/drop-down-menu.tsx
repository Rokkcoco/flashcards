import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { CloseOutline } from '@/assets'
import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'

type Props = {} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Root>
export const DropdownMenu = forwardRef<ElementRef<typeof DropdownMenuRadix.Root>, Props>(
  (props, ref) => {
    return (
      <DropdownMenuRadix.Root {...props}>
        <DropdownMenuRadix.Trigger>
          <CloseOutline />
        </DropdownMenuRadix.Trigger>
      </DropdownMenuRadix.Root>
    )
  }
)
