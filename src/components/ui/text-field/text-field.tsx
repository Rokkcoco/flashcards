import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  KeyboardEvent,
  MouseEvent,
  forwardRef,
  useId,
  useState,
} from 'react'

import { CloseOutline, EyeOffOutline, EyeOutline, SearchOutline } from '@/assets'
import Typography from '@/components/ui/typography/typography'
import * as Label from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from './text-field.module.scss'

type TextFieldProps = {
  error: string
  label: string
  onChange?: (value: string) => void
  onKeyDown?: () => void
  onKeyUp?: () => void
  placeholder: string
  type?: 'password' | 'search' | 'text'
}
type Props = TextFieldProps & Omit<ComponentPropsWithoutRef<'input'>, keyof TextFieldProps>
export const TextField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    className,
    error,
    label,
    onChange,
    onKeyDown,
    onKeyUp,
    placeholder,
    type = 'text',
    ...rest
  } = props

  const [showPassword, setShowPassword] = useState(false)
  const inputId = useId()
  const passwordType = type === 'password'
  const searchType = type === 'search'
  const notATextType = type !== 'text'
  const showPasswordHandler = () => setShowPassword(prevState => !prevState)
  const clearField = () => onChange?.('')
  const secondButtonHandler =
    (passwordType && showPasswordHandler) || (searchType && clearField) || ((x: any) => x)

  const inputTypeDefine = (
    type: ComponentPropsWithoutRef<'input'>['type'],
    showPassword: boolean
  ) => {
    if (showPassword && passwordType) {
      return 'text'
    }

    return type
  }

  const inputType = inputTypeDefine(type, showPassword)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.currentTarget.value)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown && e.key === 'Enter') {
      onKeyDown?.()
    }
  }
  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onKeyUp && e.key === 'Enter') {
      onKeyUp?.()
    }
  }

  const onSearchHandler = (e: MouseEvent<HTMLButtonElement>) => {
    onKeyDown?.()
    onKeyUp?.()
  }

  const classNames = {
    error: clsx(s.error),
    input: clsx(
      s.input,
      error && s.error,
      searchType && s.search,
      passwordType && s.password,
      className
    ),
    label: clsx(s.label),
    root: clsx(s.root),
    search: clsx(s.searchButton),
    secondButton: clsx(s.cancelButton, passwordType && s.passwordButton),
    wrapper: clsx(s.wrapper),
  }

  return (
    <div className={classNames.root}>
      {label && (
        <Label.Root asChild htmlFor={inputId}>
          <Typography as={'label'} className={classNames.label} variant={'body_2'}>
            {label}
          </Typography>
        </Label.Root>
      )}
      <div className={classNames.wrapper}>
        {searchType && (
          <button className={classNames.search} onClick={onSearchHandler} type={'button'}>
            <SearchOutline />
          </button>
        )}
        <input
          className={classNames.input}
          id={inputId}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          onKeyUp={onKeyUpHandler}
          placeholder={placeholder}
          ref={ref}
          type={inputType}
          {...rest}
        />
        {notATextType && (
          <button className={classNames.secondButton} onClick={secondButtonHandler} type={'button'}>
            {(searchType && <CloseOutline />) ||
              (passwordType && showPassword ? <EyeOffOutline /> : <EyeOutline />)}
          </button>
        )}
      </div>
      {error && (
        <Label.Root asChild className={classNames.error} htmlFor={inputId}>
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
