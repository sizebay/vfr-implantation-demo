import { handleOpenModal } from './modal'

const createButton = (text, btnId, iframeParams) => {
  const btn = document.createElement('button')
  btn.id = btnId
  btn.className = 'szb-button'
  btn.type = 'button'

  btn.onclick = () => handleOpenModal(iframeParams)

  btn.innerHTML = text

  return btn
}

export const renderButtons = (productId, accessory, sid, tenantId) => {
  let buttons = []

  const iframeParams = {
    productId,
    sid,
    tenantId,
  }

  buttons.push(
    createButton('Measurements Chart', 'sizebay-chart', {
      mode: 'chart',
      ...iframeParams,
    })
  )

  if (!accessory) {
    buttons.push(
      createButton('Virtual Fitting Room', 'sizebay-fitting-room', {
        mode: 'vfr',
        ...iframeParams,
      })
    )
  }

  const wrapper = document.createElement('div')
  wrapper.setAttribute('id', 'sizebay-wrapper')

  for (const btn of buttons) {
    wrapper.append(btn)
  }

  document.querySelector('.content .product-info').append(wrapper)
}
