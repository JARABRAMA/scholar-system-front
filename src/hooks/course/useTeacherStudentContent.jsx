import { useState, useEffect } from 'react'
import { useLoginStore } from '../../store/LoginStore'

export function useTeacherStudentContent () {
  const [groups, setGroups] = useState()
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const serviceUrl = import.meta.env.VITE_COUSES_URL
  const userId = useLoginStore(state => state.id)
  const accessToken = useLoginStore(state => state.accessToken)

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${serviceUrl}/api/groups/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        const data = await res.json()
        if (res.ok) {
          setGroups(data.content)
        } else {
          setError(data.detail)
        }
      } catch (_) {
        setError('Error de conexion, porfavor intenta mas tarde')
      } finally {
        setLoading(false)
      }
    }
    fetchGroups()
  }, [])

  return {
    groups, loading, error
  }
}
