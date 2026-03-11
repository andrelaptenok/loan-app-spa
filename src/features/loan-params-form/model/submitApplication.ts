import { apiClient } from '@shared/api'
import { apiPath } from '@shared/config'

export interface SubmitApplicationPayload {
  title: string
}

export async function submitApplication(payload: SubmitApplicationPayload): Promise<void> {
  await apiClient.post(apiPath.productsAdd, payload)
}
