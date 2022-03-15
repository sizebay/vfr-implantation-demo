import { APP_URL } from './constants'
import { renderRecommendation } from './recommendation'

const mountBackdrop = () => {
  let backdrop = document.querySelector('.vfr__container--backdrop') ?? document.createElement('div')
  backdrop.className = 'vfr__container--backdrop visible'

  document.body.appendChild(backdrop)

  return backdrop
}

const openIframe = (props) => {
  const { mode, productId, sid, tenantId } = props

  const backdrop = mountBackdrop()
  const modal = document.getElementById('szb-modal') ?? document.createElement('iframe')

  modal.src = `${APP_URL}V4/?mode=${mode}&id=${productId}&sid=${sid}&tenantId=${tenantId}&disableCloseApp=true`
  modal.id = 'szb-modal'

  modal.className = 'vfr-app modal-loading'

  modal.onload = () => {
    modal.classList.remove('modal-loading')
    modal.classList.add('modal-loaded')
  }

  backdrop.appendChild(modal)
}

const createCloseButton = (backdrop, params) => {
  const closeElem = document.createElement('div')

  closeElem.id = 'sizebay-close-button'
  closeElem.innerHTML = '+'

  closeElem.onclick = () => {
    backdrop.classList.remove('szb-modal-open')
    renderRecommendation(params.productId, params.sid, params.tenantId)
  }

  backdrop.append(closeElem)
}

export const handleOpenModal = (iframeParams) => {
  openIframe(iframeParams)

  const backdrop = document.querySelector('.vfr__container--backdrop.visible')
  const modal = document.querySelector('#szb-modal')

  backdrop.className += ' szb-modal-open'
  modal.className += ' szb-modal-desktop'

  document.querySelector('html').classList.add('vfr-modal-active')

  !document?.querySelector('#sizebay-close-button') && createCloseButton(backdrop, iframeParams)
}
