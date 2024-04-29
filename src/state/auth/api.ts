import api from '@/state/api'
import { Auth, AuthInfo, UserInfo } from './types'
import credentialCookie from './cookie'
import { errCodes } from '@/state/constant'

const [, NeedVerified] = errCodes
export const loginHandel = async (data: Auth) => {
  // try {
  //   const response = await api.post("/login", data);
  //   if ("error" in response) return {error: true}
  //   const auth: UserInfo = response.data
  //   if(['none', 'verified'].includes(auth.twofa || '') ){
  //     /** 不需要twa直接登入 */
  //     credentialCookie.set(auth)
  //   }else if(auth.twofa === 'challenging'){
  //     /** twa 验证未完成 */
  //     credentialCookie.set(NeedVerified)
  //   }
  //   return auth
  // } catch (error) {
  //   console.error(error)
  //   return { error: true }
  // }
}
/** 登出后清空 cookie */
export const logoutHandel = async () => {
  try {
    // const response = await api.post("/logout");
    credentialCookie.cleanup()
    // if ("error" in response) return {error: true}
  } catch (error) {
    console.error(error)
    return { error: true }
  }
}
export const twofaHandel = async (code:string) => {
  try {
    const response = await api.post("/twofa/code", {code});
    if ("error" in response) return {error: true}
    const auth: UserInfo = response.data
    credentialCookie.set(auth);
    return response.data
  } catch (error) {
    console.error(error)
    return { error: true }
  }
}

