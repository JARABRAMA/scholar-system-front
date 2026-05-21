import { useLoginStore } from '../store/LoginStore.jsx'
import { Roles } from '../utils/Roles.js'

export function useCourseScreen () {
  const role = useLoginStore(state => state.role)
  const isAdministrator = role === Roles.ADMINISTRADOR

  return { isAdministrator }
}
