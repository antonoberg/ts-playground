import uuid from 'uuid'

export function ensureCorrelationId(id: string | undefined): string {
  if (id) {
    return id
  }
  return uuid.v4()
}
