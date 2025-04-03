import { getCookie, createSID } from './modules/cookie'
import { renderButtons } from './modules/buttons'
import { getProduct } from './modules/fetcher'
import { renderRecommendation } from './modules/recommendation'

const productLink = 'https://store.sizebay.com/products/8522955751575'
const tenantId = 1039
const lang = 'en'

export const init = async () => {
  const SID = getCookie('SIZEBAY_SESSION_ID_V4') ? getCookie('SIZEBAY_SESSION_ID_V4') : await createSID()

  const { id, accessory } = await getProduct(productLink, {
    permalink: productLink,
    tenantId,
  })

  if (id) {
    renderButtons(id, accessory, SID, tenantId, lang)
    renderRecommendation(id, SID, tenantId)
  }
}

window.init = init
