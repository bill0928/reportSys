import Cookies from 'js-cookie'
import { AuthInfo, UserInfo } from './types'
import { cookieNames } from '@/state/constant'

const matchRegex = {
  key: new RegExp(`(^|;) ?${cookieNames.BO}=([^;]*)(;|$)`),
  acquiring: new RegExp(`(^|;) ?=([^;]*)(;|$)`)
}
const KEY = cookieNames.CREDENTIAL
const isClient = typeof window !== 'undefined'

export default {
  set: (credential: UserInfo | string) => {
    if (isClient && credential) {
      // 如果 max-age 设置为 expire_in ，会导致到期后 cookie 被清除，出现 connectionRefused error
      // 预期看到的是 unauthorized error，所以 max-age 设置为 10h
      document.cookie = `${cookieNames.BO}=${btoa(
        JSON.stringify(credential)
      )}; path=/; max-age=36000`
    }
  },
  get: () => {
    if (!isClient) return undefined
    const matched = matchRegex.key.exec(document.cookie)
    const b = matched && matched[2]
    try {
      if (b) return JSON.parse(atob(b))
    } catch {
      return undefined
    }
    return undefined
  },
  cleanup: () => {
    if (isClient) {
      console.log(`cleanup cookie`)
      Cookies.remove(cookieNames.BO)
    }
  },
 
}
