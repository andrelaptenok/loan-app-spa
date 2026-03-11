import { z } from 'zod'

export const addressWorkSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  workplace: z.string().min(1, 'Workplace is required'),
})

export type AddressWorkFormValues = z.infer<typeof addressWorkSchema>
