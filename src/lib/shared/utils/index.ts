import { validateOrReject, ValidatorOptions } from 'class-validator'

const validationOptions: ValidatorOptions = {
  forbidUnknownValues: true,
}

export async function validate(instance: any): Promise<void> {
  await validateOrReject(instance, validationOptions)
}

export async function ensureValid<T>(instance: T): Promise<T> {
  await validateOrReject(instance, validationOptions)
  return instance
}
