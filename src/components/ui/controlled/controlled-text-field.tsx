import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/components/ui'

type Props<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'defaultValue' | 'disabled' | 'rules'
> &
  Omit<TextFieldProps, 'id' | 'onChange' | 'value'>

export const ControlledTextField = <T extends FieldValues>(props: Props<T>) => {
  const { control, name, shouldUnregister, ...rest } = props

  const { field } = useController({
    control,
    disabled: rest.disabled,
    name,
    shouldUnregister,
  })

  return <TextField {...rest} {...field} id={name} />
}
