'use client'

// import { useCookie } from 'state/cookie/hooks'
import { useUserProfile } from './hooks'
import { Provider, useAuthState } from './store'
import { useCallback, useEffect } from 'react'
import { SWRConfig } from 'swr'

const Updater: React.FC = () => {
  const { data, error } = useUserProfile()
  const [, setAuthState] = useAuthState()

  useEffect(
    () => {
      /** 先放开（覆盖auth login） */
      // if (data && state.credential === undefined) {
      if (data) {
        setAuthState({ credential: data, tokenLoading: false })
      }
    },
    [data, setAuthState]
  )
  
  useEffect(
    () => {
      if (error) {
       console.log(error) 
      }
    },
    [error]
  )

  return null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const caches: Record<string, Map<any, any>> = {
  'default': new Map()
}

const CacheProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state] = useAuthState()

  const username = state.credential?.username

  const provider = useCallback(
    () => {
      if (!username) {
        return caches['default']
      }

      if (!caches[username]) {
        caches[username] = new Map()
      }

      return caches[username]
    },
    [username]
  )

  return (
    <SWRConfig value={{ provider }}>
      {children}
    </SWRConfig>
  )
}

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Provider>
    <Updater />
    <CacheProvider>
      {children}
    </CacheProvider>
  </Provider>
)

export default AuthProvider