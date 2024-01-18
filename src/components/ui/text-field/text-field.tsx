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
import { Tooltip } from '@/components/ui/tooltip'
import Typography from '@/components/ui/typography/typography'
import * as Label from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from './text-field.module.scss'

type Props = {
  error?: string
  label: string
  onChange?: (value: string) => void
  onKeyDown?: () => void
  onKeyUp?: () => void
  placeholder: string
  type?: 'password' | 'search' | 'text'
  value?: string
}
export type TextFieldProps = Props & Omit<ComponentPropsWithoutRef<'input'>, keyof Props>
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
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
  const defaultId = useId()
  const inputId = id ?? defaultId
  const passwordType = type === 'password'
  const searchType = type === 'search'
  const notATextType = type !== 'text'

  const disabledTooltip = disabled && 'Text field disabled'
  const showPasswordHandler = () => setShowPassword(prevState => !prevState)

  const clearField = () => onChange?.('')

  const secondButtonHandler =
    (passwordType && showPasswordHandler) || (searchType && clearField) || (() => {})

  const inputTypeDefine = (type: Props['type'], showPassword: boolean) => {
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
