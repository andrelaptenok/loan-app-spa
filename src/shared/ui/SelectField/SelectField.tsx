import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { Controller } from 'react-hook-form'

import styles from './SelectField.module.css'

import type { Control, FieldPath, FieldValues } from 'react-hook-form'

export interface SelectOption {
  value: string
  label: string
}

interface SelectFieldProps<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
  label: string
  options: SelectOption[]
  placeholder?: string
  id?: string
  error?: { message?: string }
  disabled?: boolean
}

export function SelectField<T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder = 'Select...',
  id,
  error,
  disabled,
}: SelectFieldProps<T>) {
  const fieldId = id ?? name
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selectedOption = options.find((o) => o.value === field.value)
        const displayValue = selectedOption?.label ?? ''

        const handleSelect = (option: SelectOption) => {
          field.onChange(option.value)
          setIsOpen(false)
        }

        return (
          <div className={classNames('mb-3', styles.wrapper)} ref={wrapperRef}>
            <label id={`${fieldId}-label`} className="form-label">
              {label}
            </label>
            <div
              className={classNames(
                'form-select',
                error && 'is-invalid',
                isOpen && 'show',
                disabled && 'disabled',
              )}
              style={{ cursor: disabled ? 'not-allowed' : 'pointer', userSelect: 'none' }}
              id={fieldId}
              role="combobox"
              aria-labelledby={`${fieldId}-label`}
              aria-expanded={disabled ? false : isOpen}
              aria-haspopup="listbox"
              aria-invalid={error ? true : undefined}
              tabIndex={disabled ? -1 : 0}
              onKeyDown={(e) => {
                if (disabled) return
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setIsOpen((prev) => !prev)
                }
                if (e.key === 'Escape') setIsOpen(false)
              }}
              onClick={() => {
                if (disabled) return
                setIsOpen((prev) => !prev)
              }}
            >
              <span style={{ opacity: displayValue ? 1 : 0.5 }}>{displayValue || placeholder}</span>
            </div>
            {isOpen && (
              <ul className={styles.dropdown} role="listbox" aria-labelledby={`${fieldId}-label`}>
                <li
                  role="option"
                  className={styles.option}
                  aria-selected={!field.value}
                  onClick={() => handleSelect({ value: '', label: placeholder })}
                >
                  {placeholder}
                </li>
                {options.map((option) => (
                  <li
                    key={option.value}
                    role="option"
                    className={classNames(
                      styles.option,
                      option.value === field.value && styles.optionSelected,
                    )}
                    aria-selected={option.value === field.value}
                    onClick={() => handleSelect(option)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
            {error?.message && <div className="invalid-feedback d-block">{error.message}</div>}
          </div>
        )
      }}
    />
  )
}
