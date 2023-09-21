import { setCookie } from './cookie'
import { APP_URL } from './constants'

const fetcher = async (url) => {
  const res = await fetch(`${APP_URL}${url}`, {
    method: 'GET',
  })

  if (res?.ok) return await res.json()

  console.error('Product not found')
  return
}

export const createSID = async () => {
  const szbSID = await fetcher('api/me/session-id')
  setCookie('SIZEBAY_SESSION_ID_V4', szbSID)
  return szbSID
}

export const getProduct = async (SID, permalink) => {
  const getProd = await fetcher(`plugin/my-product-id?sid=${SID}&permalink=${permalink}`)

  return getProd
}

export const getRecommendation = async (productId, SID, tenantId) => {
  const getRec = await fetcher(`api/me/analysis/${productId}?sid=${SID}&tenant=${tenantId}`)

  return getRec
}
