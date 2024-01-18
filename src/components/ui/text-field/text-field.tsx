import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  KeyboardEvent,
  RefObject,
  forwardRef,
  useRef,
  useState,
} from 'react'

import { CloseOutline, EyeOffOutline, EyeOutline, SearchOutline } from '@/assets'
import { Tooltip } from '@/components/ui/tooltip'
import Typography from '@/components/ui/typography/typography'
import * as Label from '@radix-ui/react-label'
import { clsx } from 'clsx'
import { v4 } from 'uuid'

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
    id,
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
  const [hoverForInput, setHoverForInput] = useState(false)
  const inputId = id || v4()
  const passwordType = type === 'password'
  const searchType = type === 'search'
  const notATextType = type !== 'text'
  const showPasswordHandler = () => setShowPassword(prevState => !prevState)

  const clearField = () => onChange?.('')

  const disabledTooltip = disabled && 'Text field disabled'

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

  const handleMouseEnter = () => {
    setHoverForInput(true)
  }
  const handleMouseLeave = () => {
    setHoverForInput(false)
  }

  const classNames = {
    error: s.error,
    input: clsx(
      s.input,
      error && s.inputError,
      searchType && s.search,
      passwordType && s.password,
      hoverForInput && s.hoverForInput,
      className
    ),
    label: clsx(s.label, disabled && s.disabled),
    root: s.root,
    search: clsx(s.button, s.searchButton),
    secondButton: clsx(
      s.button,
      searchType && s.cancelButton,
      passwordType && s.passwordButton,
      value.length > 0 && s.showCancelButton
    ),
    wrapper: s.wrapper,
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
          <Tooltip content={disabledTooltip || 'Search'}>
            <button
              className={classNames.search}
              disabled={disabled}
              onClick={onSearchHandler}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              tabIndex={-1}
              type={'button'}
            >
              <SearchOutline />
            </button>
          </Tooltip>
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
          <Tooltip
            content={
              disabledTooltip ||
              (searchType && 'Clear field') ||
              (passwordType && showPassword ? 'Hide password' : 'Show password')
            }
          >
            <button
              className={classNames.secondButton}
              disabled={disabled}
              onClick={secondButtonHandler}
              tabIndex={-1}
              type={'button'}
            >
              {(passwordType && (showPassword ? <EyeOffOutline /> : <EyeOutline />)) ||
                (value !== '' && searchType && <CloseOutline />)}
            </button>
          </Tooltip>
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

TextField.displayName = 'TextField'
