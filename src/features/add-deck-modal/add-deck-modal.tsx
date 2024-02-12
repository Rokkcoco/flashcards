import { useState } from 'react'

import { ImageOutline } from '@/assets'
import { Button, Checkbox, Modal, TextField } from '@/components/ui'
import { useCreateDeckMutation } from '@/services'

export const AddDeckModal = () => {
  const [modalOpenStatus, setModalOpenStatus] = useState(false)
  const [checkboxValueForNewDeck, setCheckboxValueForNewDeck] = useState(false)
  const [textFieldValueForNewDeck, setTextFieldValueForNewDeck] = useState('')
  const [coverForNewDeck, setCoverForNewDeck] = useState<File | undefined>()
  const [createDeck] = useCreateDeckMutation()
  const addDeckHanlder = () => {
    createDeck({ isPrivate: checkboxValueForNewDeck, name: textFieldValueForNewDeck })
    setModalOpenStatus(false)
  }

  return (
    <Modal
      controlButtons={
        <>
          <Button onClick={addDeckHanlder}>Add New Deck</Button>
          <Button variant={'secondary'}>Cancel</Button>
        </>
      }
      onOpenChange={setModalOpenStatus}
      open={modalOpenStatus}
      title={'Add New Deck'}
      trigger={<Button>Add New Deck</Button>}
    >
      <TextField
        label={'Name Pack'}
        onValueChange={setTextFieldValueForNewDeck}
        placeholder={'Minimum X symbols'}
        value={textFieldValueForNewDeck}
      />
      <Button fullWidth variant={'secondary'}>
        <ImageOutline />
        Upload Image
      </Button>
      <Checkbox
        checked={checkboxValueForNewDeck}
        label={'Private pack'}
        onCheckedChange={() => setCheckboxValueForNewDeck(!checkboxValueForNewDeck)}
      />
    </Modal>
  )
}
