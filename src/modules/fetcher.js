import { getCookie, createSID } from './cookie'
import { APP_URL } from './constants'

export default async function fetcher(URL, options) {
  const parsedOptions = {
    ...options,
    headers: {
      ...options?.headers,
      referer: options?.permalink,
      tenant_id: options?.tenant_id,
      device: 'desktop',
      'x-szb-country': null,
      'x-szb-tenant-id': options?.tenant_id,
      'x-szb-device': 'desktop',
    },
  }

  try {
    const res = await fetch(URL, {
      credentials: options?.credentials || 'include',
      referrerPolicy: 'origin-when-cross-origin',
      ...parsedOptions,
    })

    const hasResponse = res.status !== 500 && res.status !== 404
    const hasJsonResponse = !!res.headers.get('content-type')?.includes('application/json')

    const parsedResponse = hasJsonResponse ? await res.json() : await res.text()

    if (hasResponse) {
      return {
        ...parsedResponse,
        message: 'Success',
        status: res.status,
      }
    }

    return {
      error: true,
      message: typeof parsedResponse === 'string' ? parsedResponse : DEFAULT_ERROR_MESSAGE,
      status: res.status,
    }
  } catch (err) {
    logger(`An error ocurred while fetching data from ${URL}.`)

    return {
      error: true,
      message: DEFAULT_ERROR_MESSAGE,
      status: 500,
    }
  }
}

const SID = getCookie('SIZEBAY_SESSION_ID_V4') || (await createSID())

export const getProduct = async (permalink, tenantId) => {
  const URL = `${APP_URL}plugin/my-product-id?sid=${SID}&permalink=${permalink}`

  let product = null

  const data = await fetcher(URL)

  const foundProduct = !data.error && data.status !== 500 && data.message.status !== 404
  const productIsPending = data.status === 404 && !data.message.includes('Not product found')

  if (foundProduct) {
    product = {
      clothesType: data.clothesType || null,
      accessory: data.accessory,
      mixMatch: data.mixMatch,
      id: data.id,
      shoe: data.shoe,
    }
  } else if (productIsPending) {
    product = {
      isPending: true,
    }
  }

  return product
}

export const getRecommendation = async (productId, SID, tenantId) => {
  const getRec = await fetcher(`api/me/analysis/${productId}?sid=${SID}&tenant=${tenantId}`)

  return getRec
}
