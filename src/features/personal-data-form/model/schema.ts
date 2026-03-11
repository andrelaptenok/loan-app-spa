import { z } from 'zod'

const phoneRefine = (val: string): boolean => /^0\d{9}$/.test(val.replace(/\D/g, ''))

export const personalDataSchema = z.object({
  phone: z.string().min(1, 'Phone is required').refine(phoneRefine, 'Use format: 0XXX XXX XXX'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.string().min(1, 'Please select gender'),
})

export type PersonalDataFormValues = z.infer<typeof personalDataSchema>
