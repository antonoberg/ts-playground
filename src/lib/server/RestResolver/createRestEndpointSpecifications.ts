import { BaseApiDefinition } from '../../shared'

export function getMethodNames(objectOrKlass: any): string[] {
  let keys: string[] = []

  if (typeof objectOrKlass === 'function') {
    return Object.getOwnPropertyNames(objectOrKlass.prototype).filter(
      (key: string) => {
        if (key === 'constructor') {
          return false
        }
        return true
      }
    )
  } else if (objectOrKlass.constructor.name === 'Object') {
    keys = Object.keys(objectOrKlass)
  } else {
    keys = Object.getOwnPropertyNames(objectOrKlass.constructor.prototype)
    Object.keys(objectOrKlass).forEach(key => {
      if (!keys.includes(key)) {
        keys.push(key)
      }
    })
  }

  return keys.filter((key: string) => {
    if (key === 'constructor') {
      return false
    }

    if (typeof objectOrKlass[key] !== 'function') {
      return false
    }
    return true
  })
}

export type ResourceKeyMethodKeyArray = Array<{
  resourceKey: string
  methodKey: string
}>

export function getResourceKeyMethodKeyArray<
  ApiDefinition extends BaseApiDefinition
>(resources: ApiDefinition): ResourceKeyMethodKeyArray {
  const specifictions: ResourceKeyMethodKeyArray = []
  Object.keys(resources).forEach((resourceKey: string) => {
    const resource = resources[resourceKey]
    getMethodNames(resource).forEach((methodKey: string) => {
      specifictions.push({
        resourceKey,
        methodKey,
      })
    })
  })
  return specifictions
}
