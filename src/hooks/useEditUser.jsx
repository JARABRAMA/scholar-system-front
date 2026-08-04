import { useLoginStore } from '../store/LoginStore.jsx'
import { useEffect, useState } from 'react'
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
  const [formData, setFormdData] = useState({
    fullName: '',
    email: '',
    birthDate: '',
    department: '',
    municipality: ''
  })

  const {
    departments,
    municipalities,
    onChoseDepartment,
    loading: citiesLoading,
    chosenDepartment
  } = useFetchCities()

  useEffect(() => {
    setFormdData(
      { ...user }
    )
    if (user && onChoseDepartment) onChoseDepartment(user.department)
  }, [user])

  const onUpdateForm = (event) => {
    if (event.target.name === 'department') {
      onChoseDepartment(event.target.value)
      setFormdData({
        ...user,
        department: event.target.value,
        municipality: ''
      })
      return
    }
    setFormdData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const onSubmitForm = async (event) => {
    setUpdateLoading(true)
    event.preventDefault()

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
    onDissmissError: () => setUpdateError(undefined),
    formData,
    onUpdateForm
  }
}
