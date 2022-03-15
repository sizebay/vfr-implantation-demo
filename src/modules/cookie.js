export const getCookieSzb = (cname) => {
  let cookie = `; ${document.cookie}`.match(`;\\s*${cname}=([^;]+)`)
  return cookie ? cookie[1] : ''
}

export const setCookie = (cname, cvalue) => {
  document.cookie = cname + '=' + cvalue + '; path= / '
}
