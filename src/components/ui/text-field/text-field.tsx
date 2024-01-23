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
import { Typography } from '@/components/ui'
import { Tooltip } from '@/components/ui/tooltip'
import * as Label from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from './text-field.module.scss'

type Props = {
  errorMessage?: string
  label?: string
  onInputClear?: () => void
  onKeyEnter?: () => void
  onValueChange?: (value: string) => void
  type?: 'email' | 'password' | 'search' | 'text'
}

export type TextFieldProps = Props & Omit<ComponentPropsWithoutRef<'input'>, keyof Props>
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const {
    className,
    disabled,
    errorMessage,
    id,
    label,
    onChange,
    onInputClear,
    onKeyDown,
    onKeyEnter,
    onValueChange,
    type = 'text',
    value,

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

  const clearField = () => onInputClear?.()

  const secondButtonHandler =
    (passwordType && showPasswordHandler) || (searchType && clearField) || (() => {})

  const inputTypeDefine = (type: Props['type'], showPassword: boolean) => {
    if (showPassword && passwordType) {
      return 'text'
    }

    return type
  }

  const inputType = inputTypeDefine(type, showPassword)
  const internalInputRef = useRef<HTMLInputElement>(null)
  const inputRef = (ref || internalInputRef) as RefObject<HTMLInputElement>

  const focusOnEmptyInput = () => {
    if (inputRef && inputRef.current?.value === '') {
      inputRef.current.focus()

      return true
    }

    return false
  }

  const onSearchHandler = () => {
    if (focusOnEmptyInput()) {
      return
    }
    onKeyEnter?.()
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onValueChange?.(e.currentTarget.value)
  }

  const onKeyPressHander = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onKeyEnter?.()
    }
    onKeyDown?.(e)
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
      errorMessage && s.inputError,
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
      value !== '' && s.showCancelButton
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
          onKeyDown={onKeyPressHander}
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
      {errorMessage && (
        <Label.Root asChild className={classNames.error} htmlFor={inputId}>
          <Typography as={'label'} variant={'caption'}>
            {errorMessage}
          </Typography>
        </Label.Root>
      )}
    </div>
  )
})

TextField.displayName = 'TextField'
