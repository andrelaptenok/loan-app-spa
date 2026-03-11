import classNames from 'classnames'
import { Controller } from 'react-hook-form'

import type { Control, FieldPath, FieldValues } from 'react-hook-form'

export type SelectOption = {
  value: string
  label: string
}

type SelectFieldProps<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
  label: string
  options: SelectOption[]
  placeholder?: string
  id?: string
  error?: { message?: string }
}

export function SelectField<T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder = 'Select...',
  id,
  error,
}: SelectFieldProps<T>) {
  const fieldId = id ?? name

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="mb-3">
          <label htmlFor={fieldId} className="form-label">
            {label}
          </label>
          <select
            id={fieldId}
            className={classNames('form-select', error && 'is-invalid')}
            {...field}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {error?.message && <div className="invalid-feedback d-block">{error.message}</div>}
        </div>
      )}
    />
  )
}
