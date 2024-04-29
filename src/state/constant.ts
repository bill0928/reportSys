
export const cookieNames = {
  CREDENTIAL: 'Auth',
  BO:'BO'
}

export const ignoreCode = [
  20000,
  47020, // promotion condition not met
]
export const errCodes = ['AuthenticationFailed', 'TwoFANotVerified']
export const exitCodes = new Set([
  errCodes[0], /** 非合法用户 */
  errCodes[1] /** 未过twa */
])

export const route = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register'
}

export const LOGIN_STATUS = {
  NO_LOGIN: 0,
  NEED_VER:1,
  LOGIN:2
}
export const VIEWS_ACTIONS_TYPE = {
  ADD: 0,
  SEARCH:1,
}