import { ChangeEvent, useState } from 'react'

import { EyeOutline } from '@/assets'
import { Typography } from '@/components/ui/typography'
import * as Label from '@radix-ui/react-label'

import s from './text-field.module.scss'
export const TextField = () => {
  const label = 'Error!'
  const [text, setText] = useState('')
  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }

  return (
    <div className={s.container}>
      <input id={'input'} onChange={changeInputValue} placeholder={'Input'} value={text} />
      <button onClick={x => x}>
        <EyeOutline />
      </button>

      <Label.Root className={s.label} htmlFor={'input'}>
        <Typography variant={'caption'}>{label}</Typography>
      </Label.Root>
    </div>
  )
}

// Для того, чтобы ваши поля не были стандартного цвета, при выборе из списка ранее вводимых значений, нужно добавить:
//     input:-webkit-autofill,
//         input:-webkit-autofill:hover,
//     input:-webkit-autofill:focus
// input:-webkit-autofill,
//     textarea:-webkit-autofill,
//     textarea:-webkit-autofill:hover
// textarea:-webkit-autofill:focus,
//     select:-webkit-autofill,
//     select:-webkit-autofill:hover,
//     select:-webkit-autofill:focus {
//     border: 0;
//     -webkit-text-fill-color: #1f1f20;
//     -webkit-box-shadow: 0 0 0 1000px transparent inset;
//     transition: background-color 5000s ease-in-out 0s;
//     background: -webkit-linear-gradient(top,  rgba(255,255,255,0) 0%,rgba(0,174,255,0.04) 50%,rgba(255,255,255,0) 51%,rgba(0,174,255,0.03) 100%);
// }
// где вместо transparent можно указать любой цвет.

// Ещё для input типа search чтоб не был дефолтный крестик:
//     input[type='search'] {
// &::-webkit-search-decoration,
// &::-webkit-search-cancel-button,
// &::-webkit-search-results-button,
// &::-webkit-search-results-decoration {
//         appearance: none;
//     }
// }
// и если нужно предотвратить предложение раннее введённых значений в конкретном инпуте, ему можно указать пропс autoComplete={'off'}
