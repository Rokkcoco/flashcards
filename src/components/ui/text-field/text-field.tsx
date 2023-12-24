import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useId, useState } from 'react'

import { CloseOutline, EyeOutline, SearchOutline } from '@/assets'
import Typography from '@/components/ui/typography/typography'
import * as Label from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from './text-field.module.scss'

type Props = {
  error: string
  label: string
  placeholder: string
  type?: 'password' | 'search' | 'text'
} & Omit<ComponentPropsWithoutRef<'input'>, 'type'>
export const TextField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { error, id, label, placeholder, type, ...rest } = props
  /*    const labelTest = label ? label : 'Error!'*/
  const [text, setText] = useState('')
  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }

  const passwordType = type === 'password'
  const searchType = type === 'search'

  const classNames = {
    error: clsx(s.error),
    input: clsx(s.input, error && s.error, searchType && s.search, passwordType && s.password),
    label: clsx(s.label),
    root: clsx(s.root),
    search: clsx(s.searchButton),
    secondButton: clsx(s.cancelButton, passwordType && s.passwordButton),
    wrapper: clsx(s.wrapper),
  }

  return (
    <div className={classNames.root}>
      {label && (
        <Label.Root asChild htmlFor={label}>
          <Typography as={'label'} className={classNames.label} variant={'body_2'}>
            {label}
          </Typography>
        </Label.Root>
      )}
      <div className={classNames.wrapper}>
        {searchType && (
          <button className={classNames.search} onClick={() => alert('yo')} type={'button'}>
            <SearchOutline />
          </button>
        )}
        <input
          className={classNames.input}
          id={id || useId()}
          onChange={changeInputValue}
          placeholder={placeholder}
          ref={ref}
          type={type}
          value={text}
          {...rest}
        />
        {
          <button className={classNames.secondButton} onClick={() => alert('yo')} type={'button'}>
            {(searchType && <CloseOutline />) || (type === 'password' && <EyeOutline />)}
          </button>
        }
      </div>
      {error && (
        <Label.Root asChild className={classNames.error} htmlFor={label}>
          <Typography as={'label'} variant={'caption'}>
            {error}
          </Typography>
        </Label.Root>
      )}
    </div>
  )
})

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
