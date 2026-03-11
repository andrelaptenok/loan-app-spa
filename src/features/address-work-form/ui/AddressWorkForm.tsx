import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button, createFocusFirstError, SelectField, TextField } from '@shared'

import { useLoanFormStore } from '@entities/loan'
import { fetchWorkplaceOptions } from '@features/address-work-form/model/categoriesApi.ts'
import {
  type AddressWorkFormValues,
  addressWorkSchema,
} from '@features/address-work-form/model/schema.ts'

import type { SelectOption } from '@shared'

interface AddressWorkFormProps {
  onSuccess: () => void
  onBack?: () => void
}

export const AddressWorkForm = ({ onSuccess, onBack }: AddressWorkFormProps) => {
  const { addressWorkData, setAddressWorkData } = useLoanFormStore()
  const [workplaceOptions, setWorkplaceOptions] = useState<SelectOption[]>([])
  const [isLoadingWorkplaces, setIsLoadingWorkplaces] = useState(true)
  const [workplacesError, setWorkplacesError] = useState<string | null>(null)

  useEffect(() => {
    const loadOptions = async () => {
      setIsLoadingWorkplaces(true)
      setWorkplacesError(null)
      try {
        const options = await fetchWorkplaceOptions()
        setWorkplaceOptions(options)
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load workplace options'
        setWorkplacesError(message)
      } finally {
        setIsLoadingWorkplaces(false)
      }
    }

    void loadOptions()
  }, [])

  const {
    register,
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<AddressWorkFormValues>({
    resolver: zodResolver(addressWorkSchema),
    shouldFocusError: false,
    defaultValues: {
      address: addressWorkData.address ?? '',
      workplace: addressWorkData.workplace ?? '',
    },
  })

  const onSubmit = (data: AddressWorkFormValues) => {
    setAddressWorkData(data)
    onSuccess()
  }

  const focusFirstError = createFocusFirstError(['workplace', 'address'], setFocus)

  return (
    <form
      onSubmit={handleSubmit(onSubmit, focusFirstError)}
      className="needs-validation"
      noValidate
    >
      <SelectField
        name="workplace"
        control={control}
        label="Workplace"
        options={workplaceOptions}
        placeholder={
          isLoadingWorkplaces
            ? 'Loading workplaces...'
            : workplacesError
              ? 'Failed to load workplaces'
              : 'Select workplace...'
        }
        id="workplace"
        error={errors.workplace}
        disabled={isLoadingWorkplaces || !!workplacesError}
      />

      {workplacesError && (
        <div className="alert alert-warning mb-3" role="alert">
          {workplacesError}
        </div>
      )}

      <TextField
        name="address"
        register={register}
        label="Residential address"
        id="address"
        error={errors.address}
      />

      <div className="d-flex justify-content-between">
        {onBack ? (
          <Button variant="outline-secondary" type="button" onClick={onBack}>
            Back
          </Button>
        ) : (
          <span />
        )}
        <Button type="submit">Next</Button>
      </div>
    </form>
  )
}
