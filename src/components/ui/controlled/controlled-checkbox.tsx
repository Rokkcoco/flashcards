import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/components/ui'

type Props<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'defaultValue' | 'disabled' | 'rules'
> &
  Omit<CheckboxProps, 'checked' | 'id' | 'onChange'>

export const ControlledCheckbox = <T extends FieldValues>(props: Props<T>) => {
  const { control, name, shouldUnregister, ...rest } = props

  const {
    field: { value, ...field },
  } = useController({
    control,
    disabled: rest.disabled,
    name,
    shouldUnregister,
  })

  return <Checkbox {...rest} {...field} checked={value} id={name} />
}
