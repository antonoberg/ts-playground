export type Handler = ({
  resourceKey,
  methodKey,
  fnArgs,
  meta,
}: {
  resourceKey: string
  methodKey: string
  fnArgs: any
  meta: any
}) => Promise<any>

export function createInnerProxy(
  resource: any,
  resourceKey: any,
  handler: any
): any {
  const innerProxyHandler = {
    get: (obj: any, prop: any) => {
      return async function(fnArgs: any, meta: any): Promise<any> {
        return handler({
          resource: obj,
          resourceKey,
          methodKey: prop,
          fnArgs,
          meta,
        })
      }
    },
  }
  return new Proxy(resource || {}, innerProxyHandler)
}

export function createResourcesProxy<ApiDefinition extends object, MetaArgs>({
  handler,
}: {
  handler?: Handler
}): any {
  const outerProxyHandler = {
    get: (obj: any, prop: any) => {
      return createInnerProxy(obj[prop], prop, handler)
    },
  }

  return new Proxy({}, outerProxyHandler)
}
