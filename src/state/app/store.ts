import { proxy, ref } from 'valtio'
import { ApplicationState } from './types'

const state = proxy<ApplicationState>({
  isOpen: ['default'], // for active default menu
  defaultId: 'default',
  opened: true
})


const actions = {
  setMenu: (data: boolean) => {
    state.opened = data
  },
  setMenuOpen: (data: string) => {
    state.isOpen = [data]
  },
  
}

export default { state, actions }