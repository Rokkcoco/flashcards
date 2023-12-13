import { useState } from 'react'

import { Vector } from '@/assets'
import * as CheckboxRadix from '@radix-ui/react-checkbox'

import s from './checkbox.module.scss'

type CheckboxProps = {
  disabled: boolean
}

export const Checkbox = ({}: CheckboxProps) => {
  const [checked, setChecked] = useState(false)
  const changeStatus = () => setChecked(!checked)

  return (
    <div className={s.wrapper}>
      <CheckboxRadix.Checkbox className={s.root} onCheckedChange={changeStatus}>
        <CheckboxRadix.CheckboxIndicator>{checked && <Vector />}</CheckboxRadix.CheckboxIndicator>
      </CheckboxRadix.Checkbox>
    </div>
  )
}
