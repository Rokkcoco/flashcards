import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/components/ui'

type Props<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'defaultValue' | 'disabled' | 'rules'
> &
  Omit<TextFieldProps, 'onChange' | 'onValueChange' | 'value'>

export const ControlledTextField = <T extends FieldValues>(props: Props<T>) => {
  const { control, shouldUnregister, ...rest } = props

  const { field } = useController({
    control,
    disabled: rest.disabled,
    name: rest.name,
    shouldUnregister,
  })

  return <TextField {...{ ...rest, ...field }} />
}
