import {useLoginStore} from '../store/LoginStore.jsx'
import {Roles} from '../utils/Roles.js'

export const useAdministrator = () => {
  const role = useLoginStore(state => state.role)
  console.log('role ', role)

  const isAdmin = role === Roles.ADMINISTRADOR
  return { isAdmin }
}
