import qs from 'qs'

/** clear empty data field */
const filterNonNull=(obj: any)=> {
  return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v || v===false));
}

export const getParamsUrl = <U>(params: U | undefined) => {
  return params ? `?${qs.stringify(filterNonNull(params))}` : ''
}

const reURLInformation = new RegExp([
  '^((https?:)//)?', // protocol
  '([^:/?#]*)(?::([0-9]+))?', // host (hostname and port)
  '(/{0,1}[^?#]*)', // pathname
  '(\\?[^#]*|)', // search
  '(#.*|)$' // hash
].join(''));
export const parseUrl = (href: string) => {
  const match = href.match(reURLInformation)
  return match && {
    href,
    protocol: match[1],
    host: match[2],
    hostname: match[3],
    port: match[4],
    pathname: match[5],
    search: match[6],
    hash: match[7]
  }
}