import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/components/ui'

type Props<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'defaultValue' | 'disabled' | 'rules'
> &
  Omit<CheckboxProps, 'checked' | 'onCheckedChange'>

export const ControlledCheckbox = <T extends FieldValues>(props: Props<T>) => {
  const { control, shouldUnregister, ...rest } = props

  const {
    field: { onChange, value, ...field },
  } = useController({
    control,
    disabled: rest.disabled,
    name: rest.name,
    shouldUnregister,
  })

  return <Checkbox {...{ ...rest, ...field, checked: value, onCheckedChange: onChange }} />
}
