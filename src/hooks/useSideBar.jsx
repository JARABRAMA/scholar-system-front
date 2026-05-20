import { useLocation } from 'react-router'
import { useLoginStore } from '../store/LoginStore.jsx'
import { Roles } from '../utils/Roles.js'

export function useSideBar () {
  const location = useLocation()
  const role = useLoginStore(role => role)
  const isAdministrator = () => role === Roles.ADMINISTRADOR
  return {
    location, isAdministrator
  }
}
