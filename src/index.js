import { getCookieSzb } from './modules/cookie'
import { renderRecommendation } from './modules/recommendation'
import { renderButtons } from './modules/buttons'
import { getProduct, createSID } from './modules/fetcher'

const productLink = 'https://store.sizebay.com/products/nylon-bomber-jacket-in-stone'
const tenantId = 1039

const init = async () => {
  const SID = getCookieSzb('SIZEBAY_SESSION_ID_V4') ? getCookieSzb('SIZEBAY_SESSION_ID_V4') : await createSID()

  const { id, accessory } = await getProduct(SID, productLink)

  if (id) {
    renderButtons(id, accessory, SID, tenantId)
    renderRecommendation(id, SID, tenantId)
  }
}

init()
