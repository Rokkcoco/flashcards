import { useState } from 'react'

import { TrashOutline } from '@/assets'
import { Button, Modal, Typography } from '@/components/ui'
type Props = {
  deckName: string
  onDelete: () => void
}
export const DeleteDeckModal = ({ deckName, onDelete }: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const onDeleteHandler = () => onDelete()
  const closeModal = () => setOpenModal(false)

  return (
    <Modal
      controlButtons={
        <>
          <Button onClick={onDeleteHandler}>Delete Card</Button>
          <Button onClick={closeModal} variant={'secondary'}>
            Cancel
          </Button>
        </>
      }
      onOpenChange={setOpenModal}
      open={openModal}
      title={'Delete Card'}
      trigger={
        <button>
          <TrashOutline />
        </button>
      }
    >
      <Typography variant={'subtitle_2'}>
        Do you really want to remove&nbsp;<b>{deckName}</b>
      </Typography>
      <Typography variant={'subtitle_2'}>All cards will be deleted.</Typography>
    </Modal>
  )
}
