import classNames from 'classnames'

import type { FieldPath, FieldValues, UseFormRegister } from 'react-hook-form'

interface TextFieldProps<T extends FieldValues> {
  name: FieldPath<T>
  register: UseFormRegister<T>
  label: string
  error?: { message?: string }
  id?: string
  type?: 'text' | 'email' | 'password'
}

export function TextField<T extends FieldValues>(props: TextFieldProps<T>) {
  const { name, register, label, error, id, type = 'text' } = props

  const fieldId = id ?? name

  return (
    <div className="mb-3">
      <label htmlFor={fieldId} className="form-label">
        {label}
      </label>
      <input
        id={fieldId}
        type={type}
        className={classNames('form-control', error && 'is-invalid')}
        {...register(name)}
      />
      {error?.message && <div className="invalid-feedback d-block">{error.message}</div>}
    </div>
  )
}
