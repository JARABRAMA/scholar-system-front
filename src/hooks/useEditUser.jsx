import { useLoginStore } from '../store/LoginStore.jsx'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useFetchUser } from './useFetchUser.jsx'
import { useFetchCities } from './UseFetchCities.jsx'
import { NavigationPaths } from '../navigation/NavigationPaths.jsx'

export function useEditUser () {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const accesToken = useLoginStore((state) => state.accessToken)
  const [updatingLoading, setUpdateLoading] = useState(false)
  const [updatingError, setUpdateError] = useState()
  const { user, loading: userLoading, error } = useFetchUser()
  const navigate = useNavigate()

  const {
    departments,
    municipalities,
    onChoseDepartment,
    loading: citiesLoading,
    chosenDepartment
  } = useFetchCities()

  const onSubmitForm = async (event) => {
    setUpdateLoading(true)
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.target).entries())

    const updatePayload = {
      fullName: formData.fullName || user.fullName,
      email: formData.email || user.email,
      birthDate: formData.birthDate || user.birthDate,
      department: formData.department || user.department,
      municipality: formData.municipality || user.municipality
    }

    const response = await fetch(`${BASE_URL}/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accesToken}`
      },
      body: JSON.stringify(updatePayload)
    })

    const dataResponse = await response.json()

    if (response.ok) {
      navigate(NavigationPaths.USERS)
    } else {
      setUpdateError(dataResponse.detail)
      setUpdateLoading(false)
    }
  }

  return {
    user,
    error,
    departments,
    municipalities,
    onChoseDepartment,
    loading: userLoading || citiesLoading,
    chosenDepartment,
    onSubmitForm,
    updatingError,
    updatingLoading,
    onDissmissError: () => setUpdateError(undefined)
  }
}
