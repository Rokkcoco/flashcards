import { useState } from 'react'

import { Vector } from '@/assets'
import * as CheckboxRadix from '@radix-ui/react-checkbox'

import s from './checkbox.module.css'

// type CheckboxProps = {}

export const Checkbox = () => {
  const [checked, setChecked] = useState(false)
  const changeStatus = () => setChecked(!checked)

  return (
    <CheckboxRadix.Checkbox className={s.root} onCheckedChange={changeStatus}>
      <CheckboxRadix.CheckboxIndicator>
        {checked && <Vector style={{ transform: 'translateY(2px)' }} />}
      </CheckboxRadix.CheckboxIndicator>
    </CheckboxRadix.Checkbox>
  )
}
