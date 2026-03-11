import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button, PhoneInputField, SelectField, TextField } from '@shared'

import { useLoanFormStore } from '@entities/loan'
import {
  type PersonalDataFormValues,
  personalDataSchema,
} from '@features/personal-data-form/model/schema.ts'

interface PersonalDataFormProps {
  onSuccess: () => void
}

interface FieldError {
  message?: string
}

export const PersonalDataForm = ({ onSuccess }: PersonalDataFormProps) => {
  const { personalData, setPersonalData } = useLoanFormStore()

  const {
    register,
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<PersonalDataFormValues>({
    resolver: zodResolver(personalDataSchema),
    shouldFocusError: false,
    defaultValues: personalData,
  })

  const onSubmit = (data: PersonalDataFormValues) => {
    setPersonalData(data)
    onSuccess()
  }

  const focusFirstError = (errors: Partial<Record<keyof PersonalDataFormValues, FieldError>>) => {
    const order: (keyof PersonalDataFormValues)[] = ['phone', 'firstName', 'lastName', 'gender']
    const first = order.find((name) => errors[name])
    if (first) requestAnimationFrame(() => setFocus(first))
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, focusFirstError)}
      className="needs-validation"
      noValidate
    >
      <PhoneInputField
        name="phone"
        control={control}
        label="Phone"
        id="phone"
        error={errors.phone}
      />

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6">
          <TextField
            name="firstName"
            register={register}
            label="First name"
            id="firstName"
            error={errors.firstName}
          />
        </div>
        <div className="col-12 col-md-6">
          <TextField
            name="lastName"
            register={register}
            label="Last name"
            id="lastName"
            error={errors.lastName}
          />
        </div>
      </div>

      <SelectField
        name="gender"
        control={control}
        label="Gender"
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ]}
        placeholder="Select..."
        id="gender"
        error={errors.gender}
      />

      <div className="d-flex justify-content-end">
        <Button type="submit">Next</Button>
      </div>
    </form>
  )
}
