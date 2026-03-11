interface FieldError {
  message?: string
}

export function createFocusFirstError<F extends string>(
  fieldOrder: F[],
  setFocus: (name: F) => void,
) {
  return (errors: Partial<Record<F, FieldError>>) => {
    const first = fieldOrder.find((name) => errors[name])
    if (first) requestAnimationFrame(() => setFocus(first))
  }
}
