import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { RadioGroup, RadioGroupProps } from '@/components/ui'

type Props<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'defaultValue' | 'disabled' | 'rules'
> &
  Omit<RadioGroupProps, 'onChange' | 'value'>

export const ControlledRadioGroup = <T extends FieldValues>(props: Props<T>) => {
  const { control, shouldUnregister, ...rest } = props

  const {
    field: { onChange, ...field },
  } = useController({
    control,
    disabled: rest.disabled,
    name: rest.name,
    shouldUnregister,
  })

  return <RadioGroup {...{ ...rest, ...field, onValueChange: onChange }} />
}
