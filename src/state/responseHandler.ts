/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosResponse } from 'axios'
// import { getI18nByNewIntl } from 'localisation/utils'
import { isNil } from 'lodash'
import AuthCookie from '@/state/auth/cookie'
// import toast from 'state/toast/store'
// import autModalStorage from './authModal/autModalStorage'
import { errCodes, exitCodes } from './constant'
import { ErrorResponse, NormalResponse, ResponseData } from './types'

const [authfail, NeedVerified] = errCodes

const extractError = (data: any): CustomError => {
  const {error} = data || {}
  return {
    code: error.code,
    message: error.message || error.detail
  }
}

const extractData = (data: any) => {
  if (data?.error) {
    return { success: false, error: extractError(data) }
  }
  return data
}

const normalizeNormalResponse = (response: AxiosResponse): NormalResponse | any => {
  const data = response.data
  return extractData(data)
}

/** hppt stauts 2XX 會進入 normalResponseHandler*/
export const normalResponseHandler = (response: AxiosResponse) => {
  const resDataCode = response.data.code as number
  // console.log(`normalResponseHandler`)
  // IP受限，被後台block
  if (resDataCode === 40301) {
    // Todo 需導至forbidden頁面
    console.error(`2XX Error Message: ${extractError(response.data)}`)
  }
  // return normalizeNormalResponse(response)
  return response
}

/** hppt stauts 非2XX 會進入 Response Error Handler*/
const normalizeError = (error: any): ErrorResponse => {
  const errorResponse = error.response
  return errorResponse.data
}

export const errorResponseHandler = (error: any) => {
  const normalizedError = normalizeError(error)
  // const resData = normalizedError.data.data
  if ('error' in normalizedError) {
    const { error } = normalizedError
    // toast.actions.error(error.code, error.message)
    
    /** 身份不合法 */
    if (exitCodes.has(error.code)) {
      if(authfail === error.code){
        AuthCookie.cleanup()
      }else if(NeedVerified === error.code){
        /** twa 验证未完成 */
        AuthCookie.set(error.code)
      }
      return Promise.reject(error)
      // return Promise.reject(normalizedError)
      // return normalizedError
    }
  }

  return Promise.reject(normalizedError)
  // return Promise.reject(normalizedError)
  // return normalizedError
}
