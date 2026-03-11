import { apiClient } from '@shared/api'
import { apiPath } from '@shared/config'

import type { SelectOption } from '@shared'

let cached: SelectOption[] | null = null
let pending: Promise<SelectOption[]> | null = null

function slugToLabel(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export async function fetchWorkplaceOptions(): Promise<SelectOption[]> {
  if (cached) return cached
  if (pending) return pending

  pending = (async () => {
    const slugs = await apiClient.get<string[]>(apiPath.productsCategoryList)
    cached = slugs.map((slug) => ({ value: slug, label: slugToLabel(slug) }))
    pending = null
    return cached!
  })()

  return pending
}
