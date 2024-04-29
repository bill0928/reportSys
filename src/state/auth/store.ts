import { useState } from 'react'
import { createContainer } from 'react-tracked'
import { AuthState } from './types'
import credentialCookie from './cookie'

const initialState: AuthState = {
  credential: credentialCookie.get(),
  tokenLoading: false
}

const useValue = () => useState(initialState)

const {
  Provider,
  useTracked: useAuthState
} = createContainer(useValue)

export {
  Provider,
  useAuthState
}