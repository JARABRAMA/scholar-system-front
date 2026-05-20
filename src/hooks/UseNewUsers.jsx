import { useState } from 'react'
import { useLoginStore } from '../store/LoginStore.jsx'
import { useNavigate } from 'react-router'
import { NavigationPaths } from '../navigation/NavigationPaths.jsx'
import { useFetchCities } from './UseFetchCities.jsx'

export function useNewUser () {
  const {
    departments,
    municipalities,
    onChoseDepartment,
    loading,
    onSetLoading,
    chosenDepartment
  } = useFetchCities()
  const [error, setError] = useState()
  const baseUrl = import.meta.env.VITE_BASE_URL
  const accessToken = useLoginStore((state) => state.accessToken)

  const navigate = useNavigate()

  const onSubmitForm = async (event) => {
    event.preventDefault()
    onSetLoading(true)
    const newUser = Object.fromEntries(new FormData(event.target).entries())
    const res = await fetch(`${baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(newUser)
    })
    const data = await res.json()
    if (res.ok) {
      navigate(NavigationPaths.USERS)
    } else {
      setError(data.detail)
    }
    onSetLoading(false)
  }

  return {
    onSubmitForm,
    error,
    departments,
    municipalities,
    onChoseDepartment,
    loading,
    chosenDepartment
  }
}
