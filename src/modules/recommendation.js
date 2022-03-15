import { getRecommendation } from './fetcher'

export const renderRecommendation = async (productId, SID, tenantId) => {
  const { recommendedSize } = (await getRecommendation(productId, SID, tenantId)) || []

  if (recommendedSize) {
    if (!document.querySelector('#sizebay-recommendation')) {
      const recElem = document.createElement('span')
      recElem.id = 'sizebay-recommendation'

      recElem.innerHTML = `We recommend the size <b>${recommendedSize}</b>`

      document.querySelector('#sizebay-wrapper').before(recElem)
      return
    }
    document.querySelector('#sizebay-recommendation').innerHTML = `We recommend the size <b>${recommendedSize}</b>`
  }
}
