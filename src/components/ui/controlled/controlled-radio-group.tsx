import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { RadioGroup, RadioGroupProps } from '@/components/ui'

type Props<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'defaultValue' | 'disabled' | 'rules'
> &
  Omit<RadioGroupProps, 'id' | 'onChange' | 'value'>

export const ControlledRadioGroup = <T extends FieldValues>(props: Props<T>) => {
  const { control, name, shouldUnregister, ...rest } = props

  const { field } = useController({
    control,
    disabled: rest.disabled,
    name,
    shouldUnregister,
  })

  return <RadioGroup {...rest} {...field} id={name} />
}
