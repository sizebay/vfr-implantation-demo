export const getCookie = (cname) => {
  let name = cname + '=',
    c = null,
    ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
  }
  return ''
}

export const setCookie = (cname, cvalue) => {
  const domain = '; domain=' + window.location.hostname.replace('www.', '.')
  document.cookie = cname + '=' + cvalue + '; path=/' + domain
}

const getSID = async (url) => {
  const res = await fetch(`${APP_URL}${url}`, {
    method: 'GET',
  })

  if (res?.ok) return await res.json()

  console.error('Product not found')
  return
}

export const createSID = async () => {
  const szbSID = await getSID('api/me/session-id')
  setCookie('SIZEBAY_SESSION_ID_V4', szbSID)
  return szbSID
}
