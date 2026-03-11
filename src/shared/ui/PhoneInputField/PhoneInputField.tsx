import classNames from 'classnames'
import { Controller } from 'react-hook-form'
import { IMaskInput } from 'react-imask'

import styles from './PhoneInputField.module.css'

import type { Control, FieldPath, FieldValues } from 'react-hook-form'

const PHONE_MASK = '0 000 000 000'

type PhoneInputFieldProps<T extends FieldValues> = {
  name: FieldPath<T>
  control: Control<T>
  label: string
  id?: string
  error?: { message?: string }
}

export function PhoneInputField<T extends FieldValues>({
  name,
  control,
  label,
  id,
  error,
}: PhoneInputFieldProps<T>) {
  const fieldId = id ?? name

  return (
    <div className="mb-3">
      <label htmlFor={fieldId} className="form-label">
        {label}
      </label>
      <div
        className={classNames(styles.phoneWrapper, error && styles.isInvalid)}
        data-invalid={error ? true : undefined}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <IMaskInput
              id={fieldId}
              type="tel"
              mask={PHONE_MASK}
              value={field.value}
              onAccept={field.onChange}
              onBlur={field.onBlur}
              inputRef={field.ref}
              className={styles.phoneInput}
              placeholder={PHONE_MASK}
            />
          )}
        />
      </div>
      {error?.message && <div className="invalid-feedback d-block">{error.message}</div>}
    </div>
  )
}
