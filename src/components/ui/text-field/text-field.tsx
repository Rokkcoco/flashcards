import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  KeyboardEvent,
  RefObject,
  forwardRef,
  useId,
  useRef,
  useState,
} from 'react'

import { CloseOutline, EyeOffOutline, EyeOutline, SearchOutline } from '@/assets'
import Typography from '@/components/ui/typography/typography'
import * as Label from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from './text-field.module.scss'

type TextFieldProps = {
  error?: string
  label: string
  onChange?: (value: string) => void
  onKeyDown?: () => void
  onKeyUp?: () => void
  placeholder: string
  type?: 'password' | 'search' | 'text'
  value?: string
}
type Props = TextFieldProps & Omit<ComponentPropsWithoutRef<'input'>, keyof TextFieldProps>
export const TextField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    className,
    disabled,
    error,
    label,
    onChange,
    onKeyDown,
    onKeyUp,
    placeholder,
    type = 'text',
    value = '',
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
    (passwordType && showPasswordHandler) || (searchType && clearField) || (() => {})

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
  const internalInputRef = useRef<HTMLInputElement | null>(null)
  const inputRef = (ref || internalInputRef) as RefObject<HTMLInputElement>

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.currentTarget.value)
  }

  const focusOnEmptyInput = () => {
    if (inputRef && inputRef.current?.value === '') {
      inputRef.current.focus()

      return true
    }

    return false
  }
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (focusOnEmptyInput()) {
      return
    }
    if (onKeyDown && e.key === 'Enter') {
      onKeyDown?.()
    }
  }
  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (focusOnEmptyInput()) {
      return
    }
    if (onKeyUp && e.key === 'Enter') {
      onKeyUp?.()
    }
  }

  const onSearchHandler = () => {
    if (focusOnEmptyInput()) {
      return
    }
    onKeyDown?.()
    onKeyUp?.()
  }

  const classNames = {
    error: clsx(s.error),
    input: clsx(
      s.input,
      error && s.inputError,
      searchType && s.search,
      passwordType && s.password,
      disabled && s.disabled,
      className
    ),
    label: clsx(s.label, disabled && s.disabled),
    root: clsx(s.root),
    search: clsx(s.searchButton, disabled && s.disabled),
    secondButton: clsx(
      searchType && s.cancelButton,
      passwordType && s.passwordButton,
      value.length > 0 && s.showCancelButton,
      disabled && s.disabled
    ),
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
          <button
            className={classNames.search}
            disabled={disabled}
            onClick={onSearchHandler}
            tabIndex={-1}
            type={'button'}
          >
            <SearchOutline />
          </button>
        )}
        <input
          className={classNames.input}
          disabled={disabled}
          id={inputId}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          onKeyUp={onKeyUpHandler}
          placeholder={placeholder}
          ref={inputRef}
          type={inputType}
          value={value}
          {...rest}
        />
        {notATextType && (
          <button
            className={classNames.secondButton}
            disabled={disabled}
            onClick={secondButtonHandler}
            tabIndex={-1}
            type={'button'}
          >
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
//1 плывет лупа при таб
//2 добавить бэкграунд инпуту при ховере лупы
